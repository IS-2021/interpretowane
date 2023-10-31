import type { FastifyInstance } from "fastify";
import { type Static, Type } from "@sinclair/typebox";
import * as crud from "@/model/order";
import type { UrlParamsWithId } from "@/api/types";

const OrderCreate = Type.Object({
	approvaldate: Type.Date(),
	orderstatusid: Type.String(),
	userid: Type.String(),
	items: Type.Object({
		productid: Type.String(),
		quantity: Type.Integer(),
		unitprice: Type.Integer(),
	}),
});

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
			const order = request.body;

			throw Error("Not implemented");
		},
	);
}
