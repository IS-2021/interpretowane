import { db } from "@/database/db";

export async function getAllOrderStatuses() {
	return db.selectFrom("orderstatuses").selectAll().execute();
}

export enum OrderStatus {
	UNAPPROVED = "f4e28cb9-2c6b-4f6b-b48c-beeeb8f5a216",
	APPROVED = "abada23e-2ffd-4a6c-893d-c8585b3cc78a",
	CANCELLED = "4fc1ceec-6548-4257-8064-bcea84f8f218",
	COMPLETED = "83e2ddaa-b6eb-410d-a7fe-b2418e78f367",
}
