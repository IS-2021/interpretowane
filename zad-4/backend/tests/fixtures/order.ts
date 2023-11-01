export type OrderData = {
	orderstatusid: string;
	items: {
		productid: string;
		quantity: number;
		unitprice: number;
	}[];
};
