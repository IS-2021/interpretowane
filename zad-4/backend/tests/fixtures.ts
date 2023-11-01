import { test } from "vitest";
import { productData, type ProductData, product } from "./fixtures/product";
import { type UserData, userData, user } from "./fixtures/user";
import type { OrderData } from "./fixtures/order";
import type { Product, User } from "@/database/types";
import { OrderStatus } from "@/model/orderStatus";

type ApiTestFixtures = {
	userData: UserData;
	user: User;
	productData: ProductData;
	product: Product;
	orderData: OrderData;
};

export const apiTest = test.extend<ApiTestFixtures>({
	userData,
	user,
	productData,
	product,
	orderData: async ({ product: { productid, unitprice } }, use) => {
		const orderData: OrderData = {
			orderstatusid: OrderStatus.UNAPPROVED,
			items: [
				{
					productid: productid,
					quantity: 1,
					unitprice: Number(unitprice),
				},
			],
		};

		await use(orderData);
	},
});
