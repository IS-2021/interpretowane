import { AlertTriangleIcon, PencilIcon } from "lucide-react";
import { useRef, useState } from "react";
import { type KeyedMutator } from "swr";
import jsonpatch from "fast-json-patch";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/UI/Sheet";
import { Button } from "@/components/UI/Button";
import { Alert, AlertDescription, AlertTitle } from "@/components/UI/Alert";
import { Label } from "@/components/UI/Label";
import { type Order } from "@/api/types";
import { OrderStatus, orderStatusIdToString } from "@/lib/orderStatus";

type EditProductSheetProps = {
	orderData: Order;
	mutateOrders: KeyedMutator<Order[]>;
};

type OrderWithStatus = Omit<Order, "orderstatusid"> & { orderstatusid: OrderStatus };

export function EditOrderSheet({ orderData, mutateOrders }: EditProductSheetProps) {
	const [errorMessage, setErrorMessage] = useState("");
	const [order, setOrder] = useState<OrderWithStatus>(orderData as OrderWithStatus);
	const observableOrder = useRef(jsonpatch.observe(order));

	const handleProductEdit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		// type ProductUpdateData = Omit<Product, "categoryname"> & Partial<Pick<Product, "categoryname">>;
		// const productUpdateData: ProductUpdateData = { ...product };
		// delete productUpdateData["categoryname"];
		//
		// const formData = new FormData(event.target as HTMLFormElement);
		//
		// if (formData.get("unitprice")) {
		// 	productUpdateData.unitprice = formData.get("unitprice") as string;
		// }
		// if (formData.get("unitweight")) {
		// 	productUpdateData.unitweight = formData.get("unitweight") as string;
		// }
		// const categoryId = categories[productCategory];
		// if (categoryId) {
		// 	productUpdateData.categoryid = categoryId;
		// 	setProductCategory("");
		// }
		//
		// try {
		// 	const res = await updateProduct(productUpdateData);
		// 	if (res.ok) {
		// 		await mutateProducts();
		// 		setErrorMessage("");
		// 		toast({ description: "Zapisano zmiany", variant: "success" });
		// 	}
		// } catch (error) {
		// 	if (error instanceof ApiError) {
		// 		console.warn(error);
		// 		const data = (await error.response.json()) as { message: string };
		// 		setErrorMessage(data.message);
		// 	}
		// }
	};

	const updateOrderStatus = (newStatus: OrderStatus) => {
		order.orderstatusid = newStatus;

		if (newStatus === OrderStatus.APPROVED) {
			order.approvaldate = new Date().toISOString();
		}

		setOrder({
			...order,
			orderstatusid: newStatus,
		});
	};

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button>
					Edytuj
					<PencilIcon className="ml-2" size={16} />
				</Button>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Edytuj zamówienie</SheetTitle>
				</SheetHeader>
				<div>
					{errorMessage && (
						<Alert variant="destructive">
							<AlertTriangleIcon className="h-4 w-4" />
							<AlertTitle>Wystąpił błąd</AlertTitle>
							<AlertDescription>{errorMessage}</AlertDescription>
						</Alert>
					)}
					<form onSubmit={handleProductEdit}>
						<div className="mb-4">
							{order.approvaldate && (
								<>
									<Label className="mb-2">Data zatwierdzenia</Label>
									<p>{order.approvaldate ?? "—"}</p>
								</>
							)}
						</div>

						<div className="mb-4">
							{order.orderstatusid === OrderStatus.UNAPPROVED && (
								<Alert className="mb-4">
									<AlertTitle>Uwaga</AlertTitle>
									<AlertDescription>
										Zamówienie nie zostało jeszcze zatwierdzone zatwierdzone!
									</AlertDescription>
								</Alert>
							)}
							{order.orderstatusid !== OrderStatus.UNAPPROVED && (
								<p className="mb-4">
									Status zamówienia:
									<span> {orderStatusIdToString(order.orderstatusid)}</span>
								</p>
							)}

							{order.orderstatusid === OrderStatus.UNAPPROVED && (
								<div className="grid grid-cols-2 gap-2">
									<Button
										variant="outline"
										className="border-red-500"
										onClick={() => updateOrderStatus(OrderStatus.CANCELLED)}
									>
										Odrzuć
									</Button>
									<Button onClick={() => updateOrderStatus(OrderStatus.APPROVED)}>Zatwierdź</Button>
								</div>
							)}

							{order.orderstatusid === OrderStatus.APPROVED && (
								<Button onClick={() => updateOrderStatus(OrderStatus.COMPLETED)}>
									Oznacz jako zrealizowane
								</Button>
							)}
						</div>

						<div className="mb-4">
							<p>Łączna wartość zamówienia: {1}</p>
						</div>

						<Button className="w-full">Zapisz</Button>
					</form>
				</div>
			</SheetContent>
		</Sheet>
	);
}
