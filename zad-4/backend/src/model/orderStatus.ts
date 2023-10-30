import { db } from "@/database/db";

export async function getAllOrderStatuses() {
	return db.selectFrom("orderstatuses").selectAll().execute();
}
