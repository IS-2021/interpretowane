import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/UI/Select";

type CategorySelectProps = {
	onValueChange: (value: string) => void;
	categories: string[];
};

export function CategorySelect({ onValueChange, categories }: CategorySelectProps) {
	return (
		<Select onValueChange={onValueChange}>
			<SelectTrigger>
				<SelectValue placeholder="Wybierz kategorię" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>Wybierz kategorię</SelectLabel>
					<SelectItem value="all">Wszystko</SelectItem>
					{categories.map((category) => (
						<SelectItem key={`category-${category}`} value={category} className="capitalize">
							{category}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}
