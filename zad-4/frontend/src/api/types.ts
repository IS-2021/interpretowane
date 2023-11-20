export type Product = {
	productid: string;
	name: string;
	description: string;
	unitprice: string;
	unitweight: string;
	categoryid: string;
};

export type ProductInsert = Omit<Product, "productid">;
export type ProductUpdate = Omit<Partial<Product>, "productid"> & Pick<Product, "productid">;
