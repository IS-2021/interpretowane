import type { FastifyInstance } from "fastify";
import { type Static, Type } from "@sinclair/typebox";
import * as crud from "@/model/order";
import type { UrlParamsWithId } from "@/api/types";

const OrderCreateBase = Type.Object({
	approvaldate: Type.Optional(Type.String()),
	orderstatusid: Type.String(),
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

type OrderCreateType = Static<typeof OrderCreate>;

export async function orderRouter(fastify: FastifyInstance) {
	fastify.get("/", async () => {
		return crud.getAllOrders();
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
		async (request) => {
			const _order = request.body;

			throw Error("Not implemented");
		},
	);
}
