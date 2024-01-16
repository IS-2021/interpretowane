import type { Fixture } from "./types";
import { type Product } from "@/database/types";
import { addProduct, deleteProduct } from "@/model/product";

export type ProductData = Omit<Product, "productid" | "unitweight" | "unitprice"> & {
	unitweight: number;
	unitprice: number;
};
type ProductFixture = Fixture<Product>;

export const productData: ProductData = {
	name: "Test product",
	description: "Test description",
	unitprice: 100,
	unitweight: 1000,
	categoryid: "609c46fa-1607-48e5-83c5-e5d6b6c11a8f",
};

export const product: ProductFixture = async ({}, use) => {
	const product = await addProduct(productData);

	if (!product) {
		throw Error("Product fixture not initialized properly: product is undefined");
	}

	await use(product);

	await deleteProduct(product.productid);
};
