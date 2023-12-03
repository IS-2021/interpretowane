import { type CreateOrderSchema } from "@/routes/cart/schema";

export type Product = {
	productid: string;
	name: string;
	description: string;
	unitprice: string;
	unitweight: string;
	categoryid: string;
	categoryname: string;
};

export type CartItem = {
	productid: string;
	name: string;
	unitprice: string;
	unitweight: string;
	quantity: number;
};

export type Category = {
	categoryid: string;
	name: string;
};

export type ProductInsert = Omit<Product, "productid">;
export type ProductUpdate = Omit<Partial<Product>, "productid"> & Pick<Product, "productid">;

export type OrderItemData = {
	productid: string;
	unitprice: number;
	quantity: number;
};

export type CreateOrderData = CreateOrderSchema & {
	items: OrderItemData[];
};
