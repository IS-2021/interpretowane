import { MinusCircleIcon, PlusCircleIcon, TrashIcon } from "lucide-react";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/UI/Table";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/UI/Button";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
	decrementCartItemQuantity,
	incrementCartItemQuantity,
	removeCartItem,
} from "@/store/slices/cartSlice";

export function CartPage() {
	const cart = useAppSelector((state) => state.cart);
	const dispatch = useAppDispatch();

	const hasCartItems = Object.keys(cart).length > 0;

	function incrementProductQuantity(productId: string) {
		dispatch(incrementCartItemQuantity({ productid: productId }));
	}

	function decrementProductQuantity(productId: string) {
		dispatch(decrementCartItemQuantity({ productid: productId }));
	}

	function removeProduct(productId: string) {
		dispatch(removeCartItem({ productid: productId }));
	}

	if (!hasCartItems) {
		return <p className="text-center">Cart is empty</p>;
	}

	return (
		<div className="mx-auto w-full max-w-screen-md">
			<main className="w-full">
				{hasCartItems && (
					<Table>
						<TableCaption />
						<TableHeader>
							<TableRow>
								<TableHead className="w-3/5">Nazwa</TableHead>
								<TableHead className="w-24 text-center">Ilość</TableHead>
								<TableHead className="w-24 text-right">Cena</TableHead>
								<TableHead className="w-12" />
							</TableRow>
						</TableHeader>
						<TableBody>
							{Object.entries(cart).map(([productId, product]) => (
								<TableRow key={productId}>
									<TableCell>{product.name}</TableCell>
									<TableCell className="w-24">
										<div className="mx-auto flex w-max items-center gap-2">
											<Button
												onClick={() => decrementProductQuantity(productId)}
												size="icon"
												variant="ghost"
											>
												<MinusCircleIcon size={16} />
											</Button>
											<span className="w-5 text-center tabular-nums">{product.quantity}</span>
											<Button
												onClick={() => incrementProductQuantity(productId)}
												size="icon"
												variant="ghost"
											>
												<PlusCircleIcon size={16} />
											</Button>
										</div>
									</TableCell>
									<TableCell className="text-right">
										{formatPrice(parseInt(product.unitprice) * product.quantity)}
									</TableCell>
									<TableCell className="w-12">
										<Button
											onClick={() => removeProduct(productId)}
											size="icon"
											variant="ghost"
											className="hover:bg-red-500/90 hover:text-neutral-50 hover:shadow-sm"
										>
											<TrashIcon size={16} />
										</Button>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				)}
			</main>
		</div>
	);
}
