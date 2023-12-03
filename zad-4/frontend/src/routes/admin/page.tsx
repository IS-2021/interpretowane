import { AlertTriangleIcon, PencilIcon } from "lucide-react";
import { useState } from "react";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/UI/Table";
import { updateProduct, useGetProducts } from "@/api/products";
import { Button } from "@/components/UI/Button";
import { formatPrice } from "@/lib/utils";
import { type Product } from "@/api/types";
import { Label } from "@/components/UI/Label";
import { Input } from "@/components/UI/Input";
import { useGetCategories } from "@/api/categories";
import { CategorySelect } from "@/components/CategorySelect";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/UI/Tabs";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/UI/Sheet";
import { Alert, AlertDescription, AlertTitle } from "@/components/UI/Alert";
import { ApiError } from "@/lib/fetcher";
import { toast } from "@/components/UI/useToast";

export function AdminPage() {
	const { data: products, isLoading: areProductsLoading, mutate } = useGetProducts();
	const { data: categories, isLoading: areCategoriesLoading } = useGetCategories();

	const [filters, setFilters] = useState({
		category: "all",
		name: "",
	});
	const [productCategory, setProductCategory] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	if (areProductsLoading || !products || areCategoriesLoading || !categories) return null;

	const filteredProducts = products.filter((product) => {
		let isCategoryMatch = true;
		if (filters.category !== "all") {
			isCategoryMatch = product.categoryid === filters.category;
		}

		let isNameMatch = true;
		if (filters.name !== "") {
			isNameMatch = product.name.toLowerCase().includes(filters.name.toLowerCase());
		}

		return isNameMatch && isCategoryMatch;
	});

	function handleSearchName(event: React.ChangeEvent<HTMLInputElement>) {
		event.preventDefault();

		const value = event.target.value;
		if (value.trim() !== "") {
			setFilters({
				...filters,
				name: value,
			});
		} else {
			setFilters({
				...filters,
				name: "",
			});
		}
	}

	const handleSearchCategory = (value: string) => {
		const inputCategory = value.toLowerCase();

		const categoryId = categories[inputCategory];
		if (!categoryId) {
			setFilters({
				...filters,
				category: "all",
			});

			return;
		}

		setFilters({
			...filters,
			category: categoryId,
		});
	};

	const handleProductEdit = async (event: React.FormEvent<HTMLFormElement>, product: Product) => {
		event.preventDefault();

		type ProductUpdateData = Omit<Product, "categoryname"> & Partial<Pick<Product, "categoryname">>;
		const productUpdateData: ProductUpdateData = { ...product };
		delete productUpdateData["categoryname"];

		const formData = new FormData(event.target as HTMLFormElement);

		if (formData.get("unitprice")) {
			productUpdateData.unitprice = formData.get("unitprice") as string;
		}
		if (formData.get("unitweight")) {
			productUpdateData.unitweight = formData.get("unitweight") as string;
		}
		const categoryId = categories[productCategory];
		if (categoryId) {
			productUpdateData.categoryid = categoryId;
			setProductCategory("");
		}

		try {
			const res = await updateProduct(productUpdateData);
			if (res.ok) {
				await mutate();
				setErrorMessage("");
				toast({ description: "Zapisano zmiany", variant: "success" });
			}
		} catch (error) {
			if (error instanceof ApiError) {
				console.warn(error);
				const data = (await error.response.json()) as { message: string };
				setErrorMessage(data.message);
			}
		}
	};

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
											<Sheet>
												<SheetTrigger asChild>
													<Button>
														Edytuj
														<PencilIcon className="ml-2" size={16} />
													</Button>
												</SheetTrigger>
												<SheetContent>
													<SheetHeader>
														<SheetTitle>Edytuj {product.name}</SheetTitle>
													</SheetHeader>
													<div>
														{errorMessage && (
															<Alert variant="destructive">
																<AlertTriangleIcon className="h-4 w-4" />
																<AlertTitle>Wystąpił błąd</AlertTitle>
																<AlertDescription>{errorMessage}</AlertDescription>
															</Alert>
														)}
														<form onSubmit={(event) => handleProductEdit(event, product)}>
															<div className="mb-4">
																<Label className="mb-4">Cena jednostkowa [grosz]</Label>
																<Input
																	type="number"
																	name="unitprice"
																	defaultValue={product.unitprice}
																></Input>
															</div>
															<div className="mb-4">
																<Label className="mb-2">Waga [gram]</Label>
																<Input
																	type="number"
																	name="unitweight"
																	defaultValue={product.unitweight}
																></Input>
															</div>
															<div className="mb-4">
																<Label className="mb-4">Kategoria</Label>
																<CategorySelect
																	defaultValue={product.categoryname.toLowerCase()}
																	onValueChange={(val) => setProductCategory(val)}
																	categories={Object.keys(categories)}
																	showAll={false}
																/>
															</div>
															<Button className="w-full">Zapisz</Button>
														</form>
													</div>
												</SheetContent>
											</Sheet>
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
