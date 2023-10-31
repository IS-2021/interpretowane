import type { FastifyInstance } from "fastify";
import { Type, type Static } from "@sinclair/typebox";
import * as crud from "@/model/product";
import type { UrlParamsWithId } from "@/api/types";

const ProductMutation = Type.Object({
	name: Type.String(),
	description: Type.String(),
	unitprice: Type.Number(),
	unitweight: Type.Number(),
	categoryid: Type.String(),
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
		async (request) => {
			const { id } = request.params;
			const product = request.body;

			return crud.updateProduct({ productid: id, ...product });
		},
	);
}
