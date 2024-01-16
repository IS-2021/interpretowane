import { type Users } from "kysely-codegen";
import type { Fixture } from "./types";
import { addUser, deleteUser } from "@/model/user";
import type { User } from "@/database/types";

export type UserData = Omit<Users, "userid">;
type UserFixture = Fixture<User>;

export const userData: UserData = {
	username: "testUser",
	email: "testUser@test.com",
	telephone: "887-993-120",
};

export const user: UserFixture = async ({}, use) => {
	const user = await addUser(userData);

	if (!user) {
		throw new Error("User fixture not initialized properly: user is undefined");
	}

	await use(user);

	await deleteUser(user.userid);
};
