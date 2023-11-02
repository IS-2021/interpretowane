import { db } from "@/database/db";
import type { NewProduct, ProductUpdate } from "@/database/types";

export async function getAllProducts() {
	return db.selectFrom("products").selectAll().execute();
}

export async function getProductById(productId: string) {
	return db.selectFrom("products").where("productid", "=", productId).selectAll().execute();
}

export async function getProductsByIds(productIds: string[]) {
	return db.selectFrom("products").where("productid", "in", productIds).selectAll().execute();
}

export async function checkAllProductsExist(productIds: string[]) {
	const products = await db
		.selectFrom("products")
		.where("productid", "in", productIds)
		.select(({ fn }) => [fn.count("productid").as("count")])
		.executeTakeFirstOrThrow();

	return Number(products.count) === productIds.length;
}

export async function addProduct(product: NewProduct) {
	return db
		.insertInto("products")
		.values({
			name: product.name,
			description: product.description,
			unitprice: product.unitprice,
			categoryid: product.categoryid,
			unitweight: product.unitweight,
		})
		.returningAll()
		.executeTakeFirst();
}

type ProductUpdateWithId = ProductUpdate & {
	productid: NonNullable<ProductUpdate["productid"]>;
};

export async function updateProduct(product: ProductUpdateWithId) {
	return db
		.updateTable("products")
		.set(product)
		.where("productid", "=", product.productid)
		.returningAll()
		.executeTakeFirstOrThrow();
}

export async function deleteProduct(productId: string) {
	return db.deleteFrom("products").where("productid", "=", productId).execute();
}
