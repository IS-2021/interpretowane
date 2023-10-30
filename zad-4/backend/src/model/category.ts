import { db } from "@/database/db";

export async function getAllCategories() {
	return db.selectFrom("categories").selectAll().execute();
}
