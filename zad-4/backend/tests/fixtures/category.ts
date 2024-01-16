import { type Categories } from "kysely-codegen";
import type { Fixture } from "./types";
import { addCategory, deleteCategory } from "@/model/category";
import type { Category } from "@/database/types";

export type CategoryData = Omit<Categories, "categoryid">;
type CategoryFixture = Fixture<Category>;

export const categoryData: CategoryData = {
	name: "testCategory",
};

export const category: CategoryFixture = async ({}, use) => {
	const category = await addCategory(categoryData);

	if (!category) {
		throw new Error("Category fixture not initialized properly: user is undefined");
	}

	await use(category);

	await deleteCategory(category.categoryid);
};
