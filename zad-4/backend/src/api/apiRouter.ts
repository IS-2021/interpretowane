import type { FastifyInstance } from "fastify";
import { categoryRouter } from "@/api/routes/category";
import { orderRouter } from "@/api/routes/order";
import { orderStatusRouter } from "@/api/routes/orderStatus";
import { productRouter } from "@/api/routes/product";

export async function apiRouter(fastify: FastifyInstance) {
	await fastify.register(categoryRouter, { prefix: "/categories" });
	await fastify.register(orderRouter, { prefix: "/orders" });
	await fastify.register(orderStatusRouter, { prefix: "/status" });
	await fastify.register(productRouter, { prefix: "/products" });
}
