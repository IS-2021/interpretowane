import { AlertTriangleIcon, PencilIcon } from "lucide-react";
import { useState } from "react";
import { type KeyedMutator } from "swr";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/UI/Sheet";
import { Button } from "@/components/UI/Button";
import { Alert, AlertDescription, AlertTitle } from "@/components/UI/Alert";
import { Label } from "@/components/UI/Label";
import { Input } from "@/components/UI/Input";
import { CategorySelect } from "@/components/CategorySelect";
import { type Product } from "@/api/types";
import { updateProduct } from "@/api/products";
import { toast } from "@/components/UI/useToast";
import { ApiError } from "@/lib/fetcher";
import { useGetCategories } from "@/api/categories";

type EditProductSheetProps = {
	product: Product;
	mutateProducts: KeyedMutator<Product[]>;
};

export function EditProductSheet({ product, mutateProducts }: EditProductSheetProps) {
	const { data: categories, isLoading: areCategoriesLoading } = useGetCategories();

	const [productCategory, setProductCategory] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	if (areCategoriesLoading || !categories) return null;

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
				await mutateProducts();
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
							<Input type="number" name="unitprice" defaultValue={product.unitprice}></Input>
						</div>
						<div className="mb-4">
							<Label className="mb-2">Waga [gram]</Label>
							<Input type="number" name="unitweight" defaultValue={product.unitweight}></Input>
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
	);
}
