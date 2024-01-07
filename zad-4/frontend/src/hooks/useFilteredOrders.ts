import { useState } from "react";
import { type Order } from "@/api/types";

export function useFilteredOrders(orders: Order[]) {
	const [filters, setFilters] = useState({
		orderStatus: "all",
	});

	const filteredOrders = orders.filter((order) => {
		let isOrderStatusMatch = true;
		if (filters.orderStatus !== "all") {
			isOrderStatusMatch = order.orderstatusid === filters.orderStatus;
		}

		return isOrderStatusMatch;
	});

	const handleOrderStatusFilter = (value: string) => {
		setFilters({
			...filters,
			orderStatus: value,
		});
	};

	return {
		filteredOrders,
		handleOrderStatusFilter,
	};
}
