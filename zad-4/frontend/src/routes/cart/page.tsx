import { MinusCircleIcon, PlusCircleIcon, TrashIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
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
	clearCart,
	decrementCartItemQuantity,
	incrementCartItemQuantity,
	removeCartItem,
} from "@/store/slices/cartSlice";
import {
	createOrderDefaultValues,
	type CreateOrderSchema,
	createOrderSchema,
} from "@/routes/cart/schema";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/UI/Form";
import { Input } from "@/components/UI/Input";
import { toast } from "@/components/UI/useToast";
import { createOrder } from "@/api/orders";
import { type CreateOrderData } from "@/api/types";
import { Heading } from "@/components/Heading";

export function CartPage() {
	const cart = useAppSelector((state) => state.cart);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const form = useForm<CreateOrderSchema>({
		resolver: zodResolver(createOrderSchema),
		defaultValues: createOrderDefaultValues,
	});

	const hasCartItems = Object.keys(cart).length > 0;
	const totalPrice = formatPrice(
		Object.values(cart).reduce(
			(acc, product) => acc + parseInt(product.unitprice) * product.quantity,
			0,
		),
	);

	function incrementProductQuantity(productId: string) {
		dispatch(incrementCartItemQuantity({ productid: productId }));
	}

	function decrementProductQuantity(productId: string) {
		dispatch(decrementCartItemQuantity({ productid: productId }));
	}

	function removeProduct(productId: string) {
		dispatch(removeCartItem({ productid: productId }));
	}

	const onSubmit = async ({ user }: CreateOrderSchema) => {
		const orderData: CreateOrderData = {
			user,
			items: Object.entries(cart).map(([productId, product]) => ({
				productid: productId,
				quantity: product.quantity,
				unitprice: parseInt(product.unitprice),
			})),
		};

		const res = await createOrder(orderData);
		if (res.ok) {
			toast({ description: "Zamówienie złożone pomyślnie", variant: "success" });
			dispatch(clearCart());
			navigate("/");
		}
	};

	if (!hasCartItems) {
		return <p className="text-center">Koszyk jest pusty</p>;
	}

	return (
		<div className="mx-auto w-full max-w-screen-md">
			<Heading className="mb-4">Twój koszyk</Heading>
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

			<Heading className="mb-4">Złóż zamówienie</Heading>
			<div>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<div className="mb-2">
							<FormField
								control={form.control}
								name="user.username"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Nazwa użytkownika</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="mb-2">
							<FormField
								control={form.control}
								name="user.email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>E-Mail</FormLabel>
										<FormControl>
											<Input {...field} type="email" />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="mb-2">
							<FormField
								control={form.control}
								name="user.telephone"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Numer telefonu</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<div className="flex justify-between text-sm">
							<p>Łączna wartość koszyka:</p>
							<p className="font-bold">{totalPrice}</p>
						</div>

						<Button className="mt-2 w-full">Zamów</Button>
					</form>
				</Form>
			</div>
		</div>
	);
}
