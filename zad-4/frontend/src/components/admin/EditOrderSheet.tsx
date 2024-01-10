import { AlertTriangleIcon, PencilIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { type KeyedMutator } from "swr";
import jsonpatch from "fast-json-patch";
import { type Observer } from "fast-json-patch/index";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/UI/Sheet";
import { Button } from "@/components/UI/Button";
import { Alert, AlertDescription, AlertTitle } from "@/components/UI/Alert";
import { Label } from "@/components/UI/Label";
import { type Order, type OrderWithItems } from "@/api/types";
import { OrderStatus, orderStatusIdToString } from "@/lib/orderStatus";
import { updateOrder, useGetOrderById } from "@/api/orders";
import { formatPrice, formatWeight } from "@/lib/utils";

type EditProductSheetProps = {
	orderId: string;
	mutateOrders: KeyedMutator<Order[]>;
};

type OrderWithStatus = Omit<OrderWithItems, "orderstatusid"> & { orderstatusid: OrderStatus };

const defaultOrderState = {
	orderid: "",
	approvaldate: "",
	orderstatusid: OrderStatus.UNAPPROVED,
	userid: "",
	products: [],
};

export function EditOrderSheet({ orderId, mutateOrders }: EditProductSheetProps) {
	const [errorMessage, setErrorMessage] = useState("");
	const [order, setOrder] = useState<OrderWithStatus>(defaultOrderState);
	const { data: orderData, mutate: mutateOrder } = useGetOrderById(orderId);
	const observableOrder = useRef<Observer>(null);

	useEffect(() => {
		setOrder(orderData as OrderWithStatus);
	}, [orderData?.orderid]);

	useEffect(() => {
		if (!order) return;

		observableOrder.current = jsonpatch.observe(order);
	}, [order?.orderid]);

	const handleProductEdit = async () => {
		const generatedPatch = jsonpatch.generate(observableOrder.current);

		await mutateOrders();
		await mutateOrder({ ...order });

		await updateOrder(order.orderid, generatedPatch);
	};

	const updateOrderStatus = async (newStatus: OrderStatus) => {
		order.orderstatusid = newStatus;

		if (newStatus === OrderStatus.APPROVED) {
			order.approvaldate = new Date().toISOString();
		}

		setOrder({
			...order,
			orderstatusid: newStatus,
		});

		await handleProductEdit();
	};

	if (!order) return null;
	if (!order.items?.length) return null;

	const orderTotalPrice = order.items.reduce((acc, product) => {
		return acc + product.unitprice * product.quantity;
	}, 0);

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
					<div>
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
								<Alert variant="warning" className="mb-4">
									<AlertTriangleIcon className="h-4 w-4" />
									<AlertTitle>Uwaga!</AlertTitle>
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
								<Button
									onClick={() => updateOrderStatus(OrderStatus.COMPLETED)}
									variant="outline"
									className="w-full border-2 border-green-500/80 hover:border-green-500"
								>
									Oznacz jako zrealizowane
								</Button>
							)}
						</div>

						<div className="mb-4 w-full border-b-2 border-neutral-300"></div>

						<div className="mb-4">
							<p>Łączna wartość zamówienia: {formatPrice(orderTotalPrice)}</p>
						</div>

						<div className="mb-4">
							<h1 className="mb-4 text-lg font-semibold">Zamówione produkty</h1>
							{order.items.map((item) => {
								return (
									<div key={item.orderitemid} className="border-1 mb-2 border p-3">
										<h3 className="text-md mb-4 font-medium">{item.name}</h3>
										<div className="flex justify-between">
											<p>
												{formatPrice(item.unitprice)} x {item.quantity}
											</p>
											<p className="text-right font-bold">
												{formatPrice(item.unitprice * item.quantity)}
											</p>
										</div>
										<p>{formatWeight(item.unitweight)}</p>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</SheetContent>
		</Sheet>
	);
}
