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
import { useGetOrders } from "@/api/orders";
import { orderStatusIdToString } from "@/lib/orderStatus";
import { EditOrderSheet } from "@/components/admin/EditOrderSheet";
import { RadioGroup, RadioGroupItem } from "@/components/UI/RadioGroup";
import { useFilteredOrders } from "@/hooks/useFilteredOrders";

export function AdminPage() {
	const {
		data: products,
		isLoading: areProductsLoading,
		mutate: mutateProducts,
	} = useGetProducts();
	const { data: categories, isLoading: areCategoriesLoading } = useGetCategories();
	const { data: orders, isLoading: areOrdersLoading, mutate: mutateOrders } = useGetOrders();
	const { filteredProducts, handleSearchName, handleSearchCategory } = useFilteredProducts(
		products ?? [],
	);
	const { filteredOrders, handleOrderStatusFilter } = useFilteredOrders(orders ?? []);

	if (
		areProductsLoading ||
		!products ||
		areCategoriesLoading ||
		!categories ||
		areOrdersLoading ||
		!orders
	)
		return null;

	return (
		<div className="mx-auto w-full max-w-screen-md">
			<main className="w-full">
				<Tabs defaultValue="orders">
					<TabsList className="mb-8 grid w-full grid-cols-2">
						<TabsTrigger value="orders">Zamówienia</TabsTrigger>
						<TabsTrigger value="products">Produkty</TabsTrigger>
					</TabsList>

					<TabsContent value="orders">
						<form className="mb-4 flex gap-2"></form>
						<RadioGroup
							defaultValue="all"
							className="mb-8 grid grid-cols-5"
							onValueChange={handleOrderStatusFilter}
						>
							<div className="flex items-center space-x-2">
								<RadioGroupItem value="all" id="r0" />
								<Label htmlFor="r0">Wszystkie</Label>
							</div>
							<div className="flex items-center space-x-2">
								<RadioGroupItem value="cancelled" id="r1" />
								<Label htmlFor="r1">Anulowane</Label>
							</div>
							<div className="flex items-center space-x-2">
								<RadioGroupItem value="unapproved" id="r2" />
								<Label htmlFor="r2">Niezatwierdzone</Label>
							</div>
							<div className="flex items-center space-x-2">
								<RadioGroupItem value="approved" id="r3" />
								<Label htmlFor="r3">Zatwierdzone</Label>
							</div>
							<div className="flex items-center space-x-2">
								<RadioGroupItem value="completed" id="r4" />
								<Label htmlFor="r4">Zrealizowane</Label>
							</div>
						</RadioGroup>
						<Table>
							<TableCaption />
							<TableHeader>
								<TableRow>
									<TableHead className="w-32">ID</TableHead>
									<TableHead>Data zatwierdzenia</TableHead>
									<TableHead className="w-24">Status</TableHead>
									<TableHead className="w-24"></TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{filteredOrders.map((order) => (
									<TableRow key={order.orderid}>
										<TableCell className="text-xs">{order.orderid}</TableCell>
										<TableCell>{order.approvaldate ?? "—"}</TableCell>
										<TableCell>{orderStatusIdToString(order.orderstatusid)}</TableCell>
										<TableCell>
											<EditOrderSheet orderId={order.orderid} mutateOrders={mutateOrders} />
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TabsContent>

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
