import type { FastifyInstance } from "fastify";
import * as crud from "@/model/orderStatus";

export async function orderStatusRouter(fastify: FastifyInstance) {
	fastify.get("/", async () => {
		return crud.getAllOrderStatuses();
	});
}
