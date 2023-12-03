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
	defaultValue?: string;
	onValueChange: (value: string) => void;
	categories: string[];
	showAll?: boolean;
};

export function CategorySelect({
	defaultValue,
	onValueChange,
	categories,
	showAll,
}: CategorySelectProps) {
	showAll = showAll ?? true;

	return (
		<Select defaultValue={defaultValue} onValueChange={onValueChange}>
			<SelectTrigger>
				<SelectValue placeholder="Wybierz kategorię" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>Wybierz kategorię</SelectLabel>
					{showAll && <SelectItem value="all">Wszystko</SelectItem>}
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
