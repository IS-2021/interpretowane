import { test } from "vitest";
import type { Users } from "kysely-codegen";
import { addUser, deleteUser } from "@/model/user";
import type { Product, User } from "@/database/types";
import { addProduct, deleteProduct } from "@/model/product";

type UserData = Omit<Users, "userid">;
type ProductData = Omit<Product, "productid" | "unitweight" | "unitprice"> & {
	unitweight: number;
	unitprice: number;
};

type ApiTestFixtures = {
	userData: UserData;
	user: User;
	productData: ProductData;
	product: Product;
};

const userData: ApiTestFixtures["userData"] = {
	username: "testUser",
	email: "testUser@test.com",
	telephone: "887-993-120",
};

const productData: ApiTestFixtures["productData"] = {
	name: "Test product",
	description: "Test description",
	unitprice: 100,
	unitweight: 1000,
	categoryid: "609c46fa-1607-48e5-83c5-e5d6b6c11a8f",
};

export const apiTest = test.extend<ApiTestFixtures>({
	userData,
	user: async ({}, use) => {
		const user = await addUser(userData);

		if (!user) {
			throw new Error("User fixture not initialized properly: user is undefined");
		}

		await use(user);

		await deleteUser(user.userid);
	},
	productData,
	product: async ({}, use) => {
		const product = await addProduct(productData);

		if (!product) {
			throw Error("Product fixture not initialized properly: product is undefined");
		}

		await use(product);

		await deleteProduct(product.productid);
	},
});
