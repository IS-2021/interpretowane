import { randomUUID } from "crypto";
import { describe, expect } from "vitest";
import Fastify from "fastify";
import { apiTest } from "../../fixtures";
import { productRouter } from "@/api/routes/product";

const app = Fastify();
await app.register(productRouter);

describe("Product router tests", () => {
	apiTest("Fail adding product with invalid data", async ({ productData }) => {
		{
			const res = await app.inject({
				method: "POST",
				url: "/",
				body: {
					...productData,
					unitprice: -productData.unitprice,
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
					...productData,
					unitweight: -productData.unitweight,
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
					...productData,
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
					...productData,
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
					...productData,
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
					...productData,
					description: "",
				},
			});

			expect(res.statusCode).toBe(400);
			expect(res.body.includes("body/description")).toBeTruthy();
		}
	});

	apiTest("Fail updating product with invalid data", async ({ product }) => {
		const res = await app.inject({
			method: "PUT",
			url: `/${product.productid}`,
			body: {
				...product,
				name: "",
			},
		});

		expect(res.statusCode).toBe(400);
		expect(res.body.includes("body/name")).toBeTruthy();
	});

	apiTest("Fail updating non-existent product", async ({ productData }) => {
		const res = await app.inject({
			method: "PUT",
			url: `/${randomUUID()}`,
			body: {
				...productData,
			},
		});

		expect(res.statusCode).toBe(404);
	});
});
