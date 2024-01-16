import { db } from "@/database/db";
import type { NewUser } from "@/database/types";

export async function addUser(user: NewUser) {
	return db.insertInto("users").values(user).returningAll().executeTakeFirstOrThrow();
}

export async function deleteUser(userId: string) {
	return db.deleteFrom("users").where("userid", "=", userId).execute();
}
