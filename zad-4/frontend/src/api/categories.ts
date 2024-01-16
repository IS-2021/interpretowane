import useSWR from "swr";
import { type Category } from "@/api/types";
import { fetcher, type FetchError } from "@/lib/fetcher";

export function useGetCategories() {
	const swr = useSWR<Category[], FetchError>(`/categories`, fetcher);

	function transformedData() {
		const resultObj: Record<string, string> = {};

		if (!swr.data) return resultObj;

		swr.data.forEach((category) => {
			resultObj[category.name.toLowerCase()] = category.categoryid;
		});

		return resultObj;
	}

	return {
		...swr,
		data: swr.data ? transformedData() : undefined,
	};
}
