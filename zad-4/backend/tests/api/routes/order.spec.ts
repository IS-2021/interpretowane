import { randomUUID } from "crypto";
import { describe, expect, test } from "vitest";
import Fastify from "fastify";
import { apiTest } from "../../fixtures";
import { orderRouter } from "@/api/routes/order";
import { addOrder, deleteOrder } from "@/model/order";
import { OrderStatus } from "@/model/orderStatus";

const app = Fastify();
await app.register(orderRouter);

describe("Order router tests", () => {
	apiTest("Fail adding order without providing user", async ({ orderData }) => {
		// Próba dodania zamówienia z pustymi polami dotyczącymi użytkownika
		const res = await app.inject({
			method: "POST",
			url: "/",
			body: {
				...orderData,
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

	apiTest("Fail adding order with invalid user details", async ({ user, orderData }) => {
		// Próba dodania zamówienia z niewłaściwie wypełnionymi polami dotyczącymi użytkownika (np. numer telefonu zawiera litery)
		const res = await app.inject({
			method: "POST",
			url: "/",
			body: {
				...orderData,
				user: {
					username: user.username,
					email: "not_a_valid_email",
					telephone: user.telephone,
				},
			},
		});

		expect(res.statusCode).toBe(400);
		expect(res.body.includes("email")).toBeTruthy();
	});

	apiTest("Fail creating an order with non-existing products", async ({ orderData, user }) => {
		// Próba dodania zamówienia z towarami, których identyfikatorów nie ma w bazie danych

		const res = await app.inject({
			method: "POST",
			url: "/",
			body: {
				items: [
					{
						...orderData.items[0],
						productid: randomUUID(),
					},
				],
				userid: user.userid,
			},
		});

		expect(res.statusCode).toBe(422);
		expect(res.body).toBeTruthy();
	});

	apiTest(
		"Fail creating an order with negative or zero product quantities",
		async ({ orderData, user }) => {
			// Próba dodania zamówienia z ujemnymi, zerowymi lub zawierającymi liczby ilościami towarów

			{
				const res = await app.inject({
					method: "POST",
					url: "/",
					body: {
						...orderData,
						userid: user.userid,
						items: [
							{
								...orderData.items[0],
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
						...orderData,
						userid: user.userid,
						items: [
							{
								...orderData.items[0],
								quantity: 0,
							},
						],
					},
				});

				expect(res.statusCode).toBe(400);
				expect(res.body).toBeTruthy();
			}
		},
	);

	apiTest("Fail updating order status for cancelled order", async ({ user }) => {
		// Zmiana statusu po anulowaniu zamówienia

		const cancelledOrder = await addOrder({
			userid: user.userid,
			orderstatusid: OrderStatus.CANCELLED,
		});

		const res = await app.inject({
			method: "PATCH",
			url: `/${cancelledOrder.orderid}`,
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify([
				{
					op: "replace",
					path: `/orderStatusId`,
					value: OrderStatus.APPROVED,
				},
			]),
		});

		expect(res.statusCode).toBe(422);
		expect(res.body).toBeTruthy();
		expect(res.body.includes("error")).toBeTruthy();

		await deleteOrder(cancelledOrder.orderid);
	});

	test.skip("Fail order status regression", async () => {
		// Zmiana statusu "wstecz", np. ze "ZREALIZOWANE" na "NIEZATWIERDZONE"
	});

	test.skip("Fail updating status for non-existing order", async () => {
		// Próba aktualizacji stanu zamówienia o nieistniejącym identyfikatorze
	});
});
