import { baseApiUrl } from "@/lib/constants";
import { customFetch } from "@/lib/fetcher";
import { type CreateOrderData } from "@/api/types";

export function createOrder(orderData: CreateOrderData) {
	const url = new URL(`/orders`, baseApiUrl);
	return customFetch(url, {
		method: "POST",
		body: JSON.stringify(orderData),
	});
}
