import type { FastifyInstance } from "fastify";
import { type Static, Type } from "@sinclair/typebox";

import * as crud from "@/model/product";
import type { UrlParamsWithId } from "@/api/types";

const ProductMutation = Type.Object({
	name: Type.String({ minLength: 1 }),
	description: Type.String({ minLength: 1 }),
	unitprice: Type.Number({ minimum: 1 }),
	unitweight: Type.Number({ minimum: 1 }),
	categoryid: Type.String({ format: "uuid" }),
});

const ProductAddResult = Type.Object({
	productid: Type.String(),
});

type ProductMutationType = Static<typeof ProductMutation>;

export async function productRouter(fastify: FastifyInstance) {
	fastify.get("/", async () => {
		return crud.getAllProducts();
	});

	fastify.get<{
		Params: UrlParamsWithId;
	}>("/:id", async (request) => {
		const { id } = request.params;

		return crud.getProductById(id);
	});

	fastify.post<{ Body: ProductMutationType }>(
		"/",
		{
			schema: {
				body: ProductMutation,
				response: {
					200: ProductAddResult,
				},
			},
		},
		async (request) => {
			const product = request.body;

			return crud.addProduct(product);
		},
	);

	fastify.put<{ Params: UrlParamsWithId; Body: ProductMutationType }>(
		"/:id",
		{
			schema: {
				body: ProductMutation,
				response: {
					200: ProductMutation,
				},
			},
		},
		async (request, reply) => {
			const { id } = request.params;
			const product = request.body;

			try {
				return await crud.updateProduct({ productid: id, ...product });
			} catch (err) {
				console.error(err);
				return reply.code(404).type("text/json").send("Product not found");
			}
		},
	);
}
