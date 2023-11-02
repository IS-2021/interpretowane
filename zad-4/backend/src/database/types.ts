import type { Insertable, Selectable, Updateable } from "kysely";
import type { Orderitems, Orders, Products, Users } from "kysely-codegen";

export type Product = Selectable<Products>;
export type NewProduct = Insertable<Products>;
export type ProductUpdate = Updateable<Products>;

export type User = Selectable<Users>;
export type NewUser = Insertable<Users>;

export type Order = Selectable<Orders>;
export type NewOrder = Insertable<Orders>;

export type NewOrderItem = Insertable<Orderitems>;
