import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatPrice(price: number) {
	return Intl.NumberFormat("pl-PL", { style: "currency", currency: "PLN" }).format(price / 100);
}

export function formatWeight(weight: number) {
	if (weight < 1000) {
		return Intl.NumberFormat("pl-PL", { style: "unit", unit: "gram", unitDisplay: "short" }).format(
			weight,
		);
	}

	return Intl.NumberFormat("pl-PL", {
		style: "unit",
		unit: "kilogram",
		unitDisplay: "short",
	}).format(weight / 100);
}
