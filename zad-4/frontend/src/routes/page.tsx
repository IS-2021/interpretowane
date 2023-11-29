import { ShoppingCartIcon } from "lucide-react";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/UI/Table";
import { useGetProducts } from "@/api/products";
import { Button } from "@/components/UI/Button";
import { useAppDispatch } from "@/store/store";
import { addCartItem } from "@/store/slices/cartSlice";
import { formatPrice } from "@/lib/utils";

export function HomePage() {
	const { data: products, isLoading } = useGetProducts();
	const dispatch = useAppDispatch();

	if (isLoading || !products) return null;

	function addToCartHandle(productId: string) {
		dispatch(
			addCartItem({
				productid: productId,
				quantity: 1,
			}),
		);
	}

	return (
		<main className="mx-auto w-full max-w-screen-md">
			<Table>
				<TableCaption />
				<TableHeader>
					<TableRow>
						<TableHead>Nazwa</TableHead>
						<TableHead>Opis</TableHead>
						<TableHead>Cena</TableHead>
						<TableHead></TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{products.map(({ productid, name, description, unitprice }) => (
						<TableRow key={productid}>
							<TableCell>{name}</TableCell>
							<TableCell>{description}</TableCell>
							<TableCell>{formatPrice(parseInt(unitprice))}</TableCell>
							<TableCell>
								<Button onClick={() => addToCartHandle(productid)}>
									Add
									<ShoppingCartIcon className="ml-2" size={16} />
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</main>
	);
}
