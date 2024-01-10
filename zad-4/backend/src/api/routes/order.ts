import type { FastifyInstance } from "fastify";
import { type Static, Type } from "@sinclair/typebox";
import jsonpatch from "fast-json-patch";
import * as crud from "@/model/order";
import { getOrderById } from "@/model/order";
import type { UrlParamsWithId } from "@/api/types";
import { checkAllProductsExist } from "@/model/product";
import { addUser } from "@/model/user";
import { getPossibleStatusTransitions, OrderStatus } from "@/model/orderStatus";

const OrderCreateBase = Type.Object({
	approvaldate: Type.Optional(Type.String()),
	items: Type.Array(
		Type.Object({
			productid: Type.String({ format: "uuid" }),
			quantity: Type.Integer({ minimum: 1 }),
			unitprice: Type.Integer({ minimum: 0 }),
		}),
	),
});

const OrderCreateWithNewUser = Type.Composite([
	OrderCreateBase,
	Type.Object({
		user: Type.Object({
			username: Type.String({ minLength: 1 }),
			email: Type.String({ minLength: 1, format: "email" }),
			telephone: Type.String({ minLength: 9 }),
		}),
	}),
]);

const OrderCreateWithExistingUser = Type.Composite([
	OrderCreateBase,
	Type.Object({
		userid: Type.String(),
	}),
]);

const OrderCreate = Type.Union([OrderCreateWithNewUser, OrderCreateWithExistingUser]);

type OrderType = Awaited<ReturnType<typeof getOrderById>>;
type OrderCreateType = Static<typeof OrderCreate>;
type OrderCreateWithNewUserType = Static<typeof OrderCreateWithNewUser>;
type OrderCreateWithExistingUserType = Static<typeof OrderCreateWithExistingUser>;

export async function orderRouter(fastify: FastifyInstance) {
	fastify.get("/", async () => {
		return crud.getAllOrders();
	});

	fastify.get<{ Params: UrlParamsWithId }>("/:id", async (request, response) => {
		const { id } = request.params;
		try {
			const order = await getOrderById(id);
			const orderItems = await crud.getOrderItemsByOrderId(id);

			return { ...order, items: orderItems };
		} catch (err) {
			return response.code(404).type("application/json").send({ error: "Order not found." });
		}
	});

	fastify.get<{ Params: UrlParamsWithId }>("/status/:id", async (request) => {
		const { id } = request.params;

		return crud.getOrdersByStatusId(id);
	});

	fastify.post<{ Body: OrderCreateType }>(
		"/",
		{
			schema: {
				body: OrderCreate,
			},
		},
		async (request, response) => {
			const orderData = request.body;

			const productIds = orderData.items.map((item) => item.productid);
			const doesAllProductsExist = await checkAllProductsExist(productIds);
			if (!doesAllProductsExist) {
				return response
					.code(422)
					.type("application/json")
					.send({ error: "Not all order items exist" });
			}

			// Create or get user
			let userId: string;
			if ((orderData as OrderCreateWithNewUserType).user) {
				const _order = orderData as OrderCreateWithNewUserType;
				const user = await addUser(_order.user);
				userId = user.userid;
			} else if ((orderData as OrderCreateWithExistingUserType).userid) {
				const _order = orderData as OrderCreateWithExistingUserType;
				userId = _order.userid;
			} else {
				throw Error("userid not initialized properly");
			}

			// Create an order and order's items
			const order = await crud.addOrder({
				userid: userId,
				orderstatusid: OrderStatus.UNAPPROVED,
			});

			const inserts = orderData.items.map((item) => {
				return crud.addOrderItem({
					orderid: order.orderid,
					productid: item.productid,
					quantity: item.quantity,
					unitprice: item.unitprice,
				});
			});

			const items = await Promise.all(inserts);

			const res = { ...order, items };
			return response.code(200).type("application/json").send(res);
		},
	);

	fastify.patch<{ Params: UrlParamsWithId }>("/:id", async (request, response) => {
		const { id } = request.params;
		const patch = request.body;

		let order: OrderType;
		try {
			order = await getOrderById(id);
		} catch (err) {
			return response.code(404).type("application/json").send({ error: "Order not found." });
		}

		let updatedOrder: OrderType;
		try {
			// TODO: Fix typing
			updatedOrder = jsonpatch.applyPatch(order, patch, true, false).newDocument;
		} catch (err) {
			return response.code(422).type("application/json").send({ error: err });
		}

		const orderStatus = order.orderstatusid as OrderStatus;
		const updatedOrderStatus = updatedOrder.orderstatusid as OrderStatus;

		const isValidStatusTransition =
			getPossibleStatusTransitions(orderStatus).includes(updatedOrderStatus);
		if (!isValidStatusTransition) {
			return response.code(422).type("application/json").send({
				error: "Illegal order status transition - status can be advanced only linearly forward",
			});
		}

		const updatedOrderData = await crud.updateOrder(id, updatedOrder);
		return response.code(200).type("application/json").send(updatedOrderData);
	});
}
