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

export function HomePage() {
	const { data: products, isLoading } = useGetProducts();

	if (isLoading || !products) return null;

	return (
		<Table>
			<TableCaption />
			<TableHeader>
				<TableRow>
					<TableHead>Nazwa</TableHead>
					<TableHead>Opis</TableHead>
					<TableHead>Cena</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{products.map(({ productid, name, description, unitprice }) => (
					<TableRow key={productid}>
						<TableCell>{name}</TableCell>
						<TableCell>{description}</TableCell>
						<TableCell>{unitprice}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
