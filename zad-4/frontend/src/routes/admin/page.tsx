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
import { formatPrice } from "@/lib/utils";
import { Label } from "@/components/UI/Label";
import { Input } from "@/components/UI/Input";
import { useGetCategories } from "@/api/categories";
import { CategorySelect } from "@/components/CategorySelect";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/UI/Tabs";
import { useFilteredProducts } from "@/hooks/useFilteredProducts";
import { EditProductSheet } from "@/components/admin/EditProductSheet";

export function AdminPage() {
	const {
		data: products,
		isLoading: areProductsLoading,
		mutate: mutateProducts,
	} = useGetProducts();
	const { data: categories, isLoading: areCategoriesLoading } = useGetCategories();
	const { filteredProducts, handleSearchName, handleSearchCategory } = useFilteredProducts(
		products ?? [],
	);

	if (areProductsLoading || !products || areCategoriesLoading || !categories) return null;

	return (
		<div className="mx-auto w-full max-w-screen-md">
			<main className="w-full">
				<Tabs defaultValue="products">
					<TabsList className="mb-8 grid w-full grid-cols-2">
						<TabsTrigger value="orders">Zamówienia</TabsTrigger>
						<TabsTrigger value="products">Produkty</TabsTrigger>
					</TabsList>
					<TabsContent value="products">
						<form className="mb-4 flex gap-2">
							<div className="grid w-full items-center gap-1.5">
								<Label htmlFor="productName">Nazwa produktu</Label>
								<Input
									type="text"
									id="productName"
									name="productName"
									onChange={handleSearchName}
								/>
							</div>
							<div className="grid w-72 items-center gap-1.5">
								<Label>Kategoria</Label>
								<CategorySelect
									onValueChange={handleSearchCategory}
									categories={Object.keys(categories)}
								/>
							</div>
						</form>
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
											<EditProductSheet product={product} mutateProducts={mutateProducts} />
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TabsContent>
				</Tabs>
			</main>
		</div>
	);
}
