export enum OrderStatus {
	CANCELLED = "4fc1ceec-6548-4257-8064-bcea84f8f218",
	UNAPPROVED = "f4e28cb9-2c6b-4f6b-b48c-beeeb8f5a216",
	APPROVED = "abada23e-2ffd-4a6c-893d-c8585b3cc78a",
	COMPLETED = "83e2ddaa-b6eb-410d-a7fe-b2418e78f367",
}

export function orderStatusIdToString(statusId: string) {
	switch (statusId) {
		case OrderStatus.UNAPPROVED:
			return "Niezatwierdzone";
		case OrderStatus.CANCELLED:
			return "Anulowane";
		case OrderStatus.APPROVED:
			return "Zatwierdzone";
		case OrderStatus.COMPLETED:
			return "Zrealizowane";
	}
}
