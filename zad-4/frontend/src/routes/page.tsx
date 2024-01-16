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
import { type Product } from "@/api/types";
import { Label } from "@/components/UI/Label";
import { Input } from "@/components/UI/Input";
import { useGetCategories } from "@/api/categories";
import { CategorySelect } from "@/components/CategorySelect";
import { useFilteredProducts } from "@/hooks/useFilteredProducts";

export function HomePage() {
	const { data: products, isLoading: areProductsLoading } = useGetProducts();
	const { data: categories, isLoading: areCategoriesLoading } = useGetCategories();
	const { filteredProducts, handleSearchName, handleSearchCategory } = useFilteredProducts(
		products ?? [],
	);

	const dispatch = useAppDispatch();

	if (areProductsLoading || !products || areCategoriesLoading || !categories) return null;

	function handleAddToCart(product: Product) {
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
		<div className="mx-auto w-full max-w-screen-md">
			<form className="mb-4 flex gap-2">
				<div className="grid w-full items-center gap-1.5">
					<Label htmlFor="productName">Nazwa produktu</Label>
					<Input type="text" id="productName" name="productName" onChange={handleSearchName} />
				</div>
				<div className="grid w-72 items-center gap-1.5">
					<Label>Kategoria</Label>
					<CategorySelect
						onValueChange={handleSearchCategory}
						categories={Object.keys(categories)}
					/>
				</div>
			</form>
			<main className="w-full">
				<Table>
					<TableCaption />
					<TableHeader>
						<TableRow>
							<TableHead className="w-32">Nazwa</TableHead>
							<TableHead>Opis</TableHead>
							<TableHead className="w-24">Cena</TableHead>
							<TableHead className="w-24"></TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{filteredProducts.map((product) => (
							<TableRow key={product.productid}>
								<TableCell>{product.name}</TableCell>
								<TableCell>{product.description}</TableCell>
								<TableCell>{formatPrice(parseInt(product.unitprice))}</TableCell>
								<TableCell>
									<Button onClick={() => handleAddToCart(product)}>
										Add
										<ShoppingCartIcon className="ml-2" size={16} />
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</main>
		</div>
	);
}
