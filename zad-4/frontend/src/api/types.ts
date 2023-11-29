export type Product = {
	productid: string;
	name: string;
	description: string;
	unitprice: string;
	unitweight: string;
	categoryid: string;
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
