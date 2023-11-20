import useSWR from "swr";
import { customFetch, fetcher, type FetchError } from "@/lib/fetcher";
import { baseApiUrl } from "@/lib/constants";
import { type Product, type ProductInsert, type ProductUpdate } from "@/api/types";

export function useGetProductById(productId: string) {
	return useSWR<Product, FetchError>(`/products/${productId}`, fetcher);
}

export function useGetProducts() {
	return useSWR<Product[], FetchError>(`/products`, fetcher);
}

export function addProduct(product: ProductInsert) {
	const url = new URL(`/products`, baseApiUrl);
	return customFetch(url, {
		method: "POST",
		body: JSON.stringify(product),
	});
}

export function updateProduct(product: ProductUpdate) {
	const url = new URL(`/products`, baseApiUrl);
	return customFetch(url, {
		method: "PUT",
		body: JSON.stringify(product),
	});
}
