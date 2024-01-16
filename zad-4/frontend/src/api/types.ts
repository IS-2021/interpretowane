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

export type Order = {
	orderid: string;
	approvaldate: string | null;
	orderstatusid: string;
	userid: string;
};

export type OrderWithItems = Order & {
	items: OrderItemData[];
};

export type ProductInsert = Omit<Product, "productid">;
export type ProductUpdate = Omit<Partial<Product>, "productid"> & Pick<Product, "productid">;

export type OrderItemData = {
	orderitemid: string;
	name: string;
	unitweight: number;

	productid: string;
	unitprice: number;
	quantity: number;
};

export type CreateOrderData = CreateOrderSchema & {
	items: Pick<OrderItemData, "productid" | "unitprice" | "quantity">[];
};
