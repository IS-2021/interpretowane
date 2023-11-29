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
import { useAppDispatch, useAppSelector } from "@/store/store";
import { addCartItem } from "@/store/slices/cartSlice";
import { formatPrice } from "@/lib/utils";
import { type Product } from "@/api/types";

export function HomePage() {
	const { data: products, isLoading } = useGetProducts();
	const dispatch = useAppDispatch();

	if (isLoading || !products) return null;

	function addToCartHandle(product: Product) {
		dispatch(
			addCartItem({
				productid: product.productid,
				name: product.name,
				unitprice: product.unitprice,
				unitweight: product.unitweight,
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
					{products.map((product) => (
						<TableRow key={product.productid}>
							<TableCell>{product.name}</TableCell>
							<TableCell>{product.description}</TableCell>
							<TableCell>{formatPrice(parseInt(product.unitprice))}</TableCell>
							<TableCell>
								<Button onClick={() => addToCartHandle(product)}>
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
