import useSWR from "swr";
import { baseApiUrl } from "@/lib/constants";
import { customFetch, fetcher, type FetchError } from "@/lib/fetcher";
import { type CreateOrderData, type Order, type OrderWithItems } from "@/api/types";

export function useGetOrders() {
	return useSWR<Order[], FetchError>(`/orders`, fetcher);
}

export function useGetOrderById(orderId: string) {
	return useSWR<OrderWithItems, FetchError>(`/orders/${orderId}`, fetcher);
}

export function createOrder(orderData: CreateOrderData) {
	const url = new URL(`/orders`, baseApiUrl);
	return customFetch(url, {
		method: "POST",
		body: JSON.stringify(orderData),
	});
}
