import type { Insertable, Updateable } from "kysely";
import type { Products } from "kysely-codegen";

export type NewProduct = Insertable<Products>;
export type ProductUpdate = Updateable<Products>;
