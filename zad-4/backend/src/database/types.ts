import type { Insertable, Selectable, Updateable } from "kysely";
import type { Categories, Orderitems, Orders, Products, Users } from "kysely-codegen";

export type Product = Selectable<Products>;
export type NewProduct = Insertable<Products>;
export type ProductUpdate = Updateable<Products>;

export type User = Selectable<Users>;
export type NewUser = Insertable<Users>;

export type Order = Selectable<Orders>;
export type NewOrder = Insertable<Orders>;
export type OrderUpdate = Updateable<Orders>;

export type NewOrderItem = Insertable<Orderitems>;

export type Category = Selectable<Categories>;
export type NewCategory = Insertable<Categories>;
