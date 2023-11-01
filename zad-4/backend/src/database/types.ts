import type { Insertable, Updateable } from "kysely";
import type { Orders, Products, Users } from "kysely-codegen";

export type NewProduct = Insertable<Products>;
export type ProductUpdate = Updateable<Products>;

export type NewUser = Insertable<Users>;

export type NewOrder = Insertable<Orders>;
