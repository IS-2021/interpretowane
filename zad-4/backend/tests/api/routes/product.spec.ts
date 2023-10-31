import { randomUUID } from "crypto";
import { describe, expect, test } from "vitest";
import Fastify from "fastify";
import { productRouter } from "@/api/routes/product";
import { addProduct, deleteProduct } from "@/model/product";

const app = Fastify();
await app.register(productRouter);

const validProduct = {
	name: "Test product",
	description: "Test description",
	unitprice: 100,
	unitweight: 1000,
	categoryid: "609c46fa-1607-48e5-83c5-e5d6b6c11a8f",
};

describe("Product router tests", () => {
	test("Fail adding product with invalid data", async () => {
		{
			const res = await app.inject({
				method: "POST",
				url: "/",
				body: {
					...validProduct,
					unitprice: -validProduct.unitprice,
				},
			});

			expect(res.statusCode).toBe(400);
			expect(res.body.includes("body/unitprice")).toBeTruthy();
		}
		{
			const res = await app.inject({
				method: "POST",
				url: "/",
				body: {
					...validProduct,
					unitweight: -validProduct.unitweight,
				},
			});

			expect(res.statusCode).toBe(400);
			expect(res.body.includes("body/unitweight")).toBeTruthy();
		}

		{
			const res = await app.inject({
				method: "POST",
				url: "/",
				body: {
					...validProduct,
					unitprice: 0,
				},
			});

			expect(res.statusCode).toBe(400);
			expect(res.body.includes("body/unitprice")).toBeTruthy();
		}
		{
			const res = await app.inject({
				method: "POST",
				url: "/",
				body: {
					...validProduct,
					unitweight: 0,
				},
			});

			expect(res.statusCode).toBe(400);
			expect(res.body.includes("body/unitweight")).toBeTruthy();
		}

		{
			const res = await app.inject({
				method: "POST",
				url: "/",
				body: {
					...validProduct,
					name: "",
				},
			});

			expect(res.statusCode).toBe(400);
			expect(res.body.includes("body/name")).toBeTruthy();
		}
		{
			const res = await app.inject({
				method: "POST",
				url: "/",
				body: {
					...validProduct,
					description: "",
				},
			});

			expect(res.statusCode).toBe(400);
			expect(res.body.includes("body/description")).toBeTruthy();
		}
	});

	test("Fail updating product with invalid data", async () => {
		const product = await addProduct(validProduct);

		if (!product) {
			throw Error("crud: addProduct didn't return added product");
		}

		const res = await app.inject({
			method: "PUT",
			url: `/${product.productid}`,
			body: {
				...validProduct,
				name: "",
			},
		});

		expect(res.statusCode).toBe(400);
		expect(res.body.includes("body/name")).toBeTruthy();

		await deleteProduct(product.productid);
	});

	test("Fail updating non-existent product", async () => {
		const res = await app.inject({
			method: "PUT",
			url: `/${randomUUID()}`,
			body: {
				...validProduct,
			},
		});

		expect(res.statusCode).toBe(404);
	});
});
