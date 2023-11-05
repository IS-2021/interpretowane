import { test } from "vitest";
import { productData, type ProductData } from "./fixtures/product";
import { type UserData, userData, user } from "./fixtures/user";
import type { OrderData } from "./fixtures/order";
import { category, type CategoryData, categoryData } from "./fixtures/category";
import type { Category, Product, User } from "@/database/types";
import { addProduct, deleteProduct } from "@/model/product";

type ApiTestFixtures = {
	userData: UserData;
	categoryData: CategoryData;
	productData: ProductData;
	orderData: OrderData;
	user: User;
	category: Category;
	product: Product;
};

export const apiTest = test.extend<ApiTestFixtures>({
	userData,
	productData,
	categoryData,
	orderData: async ({ product: { productid, unitprice } }, use) => {
		const orderData: OrderData = {
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
	user,
	category,
	product: async ({ category }, use) => {
		const product = await addProduct({
			...productData,
			categoryid: category.categoryid,
		});

		if (!product) {
			throw Error("Product fixture not initialized properly: product is undefined");
		}

		await use(product);

		await deleteProduct(product.productid);
	},
});
