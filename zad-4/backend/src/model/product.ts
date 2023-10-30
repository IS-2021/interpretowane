import { db } from "@/database/db";
import type { NewProduct, ProductUpdate } from "@/database/types";

export async function getAllProducts() {
	return db.selectFrom("products").selectAll().execute();
}

export async function getProductById(productId: string) {
	return db.selectFrom("products").where("productid", "=", productId).selectAll().execute();
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
		.returning("productid")
		.executeTakeFirst();
}

export async function updateProduct(product: ProductUpdate) {
	if (!product.productid) {
		throw new Error("Can't update product with missing productid");
	}

	return db
		.updateTable("products")
		.set(product)
		.where("productid", "=", product.productid)
		.returningAll()
		.executeTakeFirst();
}
