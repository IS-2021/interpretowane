import { useState } from "react";
import { type Product } from "@/api/types";

export function useFilteredProducts(products: Product[]) {
	const [filters, setFilters] = useState({
		category: "all",
		name: "",
	});

	const filteredProducts = products.filter((product) => {
		let isCategoryMatch = true;
		if (filters.category !== "all") {
			isCategoryMatch = product.categoryname.toLowerCase() === filters.category.toLowerCase();
		}

		let isNameMatch = true;
		if (filters.name !== "") {
			isNameMatch = product.name.toLowerCase().includes(filters.name.toLowerCase());
		}

		return isNameMatch && isCategoryMatch;
	});

	function handleSearchName(event: React.ChangeEvent<HTMLInputElement>) {
		event.preventDefault();

		const value = event.target.value;
		if (value.trim() !== "") {
			setFilters({
				...filters,
				name: value,
			});
		} else {
			setFilters({
				...filters,
				name: "",
			});
		}
	}

	const handleSearchCategory = (value: string) => {
		const inputCategory = value.toLowerCase();

		setFilters({
			...filters,
			category: inputCategory || "all",
		});
	};

	return {
		filteredProducts,
		handleSearchName,
		handleSearchCategory,
	};
}
