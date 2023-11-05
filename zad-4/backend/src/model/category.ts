import { db } from "@/database/db";
import type { NewCategory } from "@/database/types";

export async function getAllCategories() {
	return db.selectFrom("categories").selectAll().execute();
}

export async function addCategory(category: NewCategory) {
	return db.insertInto("categories").values(category).returningAll().executeTakeFirstOrThrow();
}

export async function deleteCategory(categoryId: string) {
	return db.deleteFrom("categories").where("categoryid", "=", categoryId).execute();
}
