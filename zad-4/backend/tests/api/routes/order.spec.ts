import { randomUUID } from "crypto";
import { afterAll, describe, expect, test } from "vitest";
import Fastify from "fastify";
import { validProduct } from "./product.spec";
import { orderRouter } from "@/api/routes/order";
import { addUser, deleteUser } from "@/model/user";
import { getAllOrderStatuses } from "@/model/orderStatus";
import { addProduct } from "@/model/product";

const app = Fastify();
await app.register(orderRouter);

const orderStatuses = await getAllOrderStatuses();
const unapprovedStatusId = orderStatuses.find(({ status }) => status == "NIEZATWIERDZONE")
	?.orderstatusid;
if (!unapprovedStatusId) {
	throw new Error("user is undefined");
}

const user = await addUser({
	userid: randomUUID(),
	username: "testUser",
	email: "testUser@test.com",
	telephone: "887-993-120",
});
if (!user) {
	throw new Error("user is undefined");
}

const product = await addProduct(validProduct);
if (!product) {
	throw Error("product is undefined");
}

const validOrderBase = {
	orderstatusid: unapprovedStatusId,
	items: [
		{
			productid: product.productid,
			quantity: 1,
			unitprice: product.unitprice,
		},
	],
};

describe("Order router tests", () => {
	afterAll(async () => {
		await deleteUser(user.userid);
	});

	test("Fail adding order without providing user", async () => {
		// Próba dodania zamówienia z pustymi polami dotyczącymi użytkownika
		const res = await app.inject({
			method: "POST",
			url: "/",
			body: {
				orderstatusid: unapprovedStatusId,
				items: validOrderBase.items,
				user: {
					username: "",
					email: "",
					telephone: "",
				},
			},
		});

		expect(res.statusCode).toBe(400);
		expect(res.body.includes("body/user")).toBeTruthy();
	});

	test("Fail adding order with invalid user details", async () => {
		// Próba dodania zamówienia z niewłaściwie wypełnionymi polami dotyczącymi użytkownika (np. numer telefonu zawiera litery)
		const res = await app.inject({
			method: "POST",
			url: "/",
			body: {
				...validOrderBase,
				user: {
					username: "testUser",
					email: "not_a_valid_email",
					telephone: user.telephone,
				},
			},
		});

		expect(res.statusCode).toBe(400);
		expect(res.body.includes("email")).toBeTruthy();
	});

	test.skip("Fail updating order status for cancelled order", async () => {
		// Zmiana statusu po anulowaniu zamówienia
	});

	test.skip("Fail creating an order with non-existing products", async () => {
		// Próba dodania zamówienia z towarami, których identyfikatorów nie ma w bazie danych

		const res = await app.inject({
			method: "POST",
			url: "/",
			body: {
				orderstatusid: unapprovedStatusId,
				userid: user.userid,
				items: [
					{
						...validOrderBase.items[0],
						productid: randomUUID(),
					},
				],
			},
		});

		expect(res.statusCode).toBe(404);
		expect(res.body).toBeTruthy();
	});

	test("Fail creating an order with negative or zero product quantities", async () => {
		// Próba dodania zamówienia z ujemnymi, zerowymi lub zawierającymi liczby ilościami towarów

		{
			const res = await app.inject({
				method: "POST",
				url: "/",
				body: {
					orderstatusid: unapprovedStatusId,
					userid: user.userid,
					items: [
						{
							...validOrderBase.items[0],
							quantity: -1,
						},
					],
				},
			});

			expect(res.statusCode).toBe(400);
			expect(res.body).toBeTruthy();
		}
		{
			const res = await app.inject({
				method: "POST",
				url: "/",
				body: {
					orderstatusid: unapprovedStatusId,
					userid: user.userid,
					items: [
						{
							...validOrderBase.items[0],
							quantity: 0,
						},
					],
				},
			});

			expect(res.statusCode).toBe(400);
			expect(res.body).toBeTruthy();
		}
	});

	test.skip("Fail order status regression", async () => {
		// Zmiana statusu "wstecz", np. ze "ZREALIZOWANE" na "NIEZATWIERDZONE"
	});

	test.skip("Fail updating status for non-existing order", async () => {
		// Próba aktualizacji stanu zamówienia o nieistniejącym identyfikatorze
	});
});
