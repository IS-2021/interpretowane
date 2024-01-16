import type { FastifyInstance } from "fastify";
import * as crud from "@/model/category";

export async function categoryRouter(fastify: FastifyInstance) {
	fastify.get("/", async () => {
		return crud.getAllCategories();
	});
}
