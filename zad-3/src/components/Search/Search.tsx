import { type ComponentProps, useRef } from "react";

type SearchProps = {
	onSearch: (data: SearchFormData) => void;
} & ComponentProps<"form">;

export type SearchFormData = {
	title?: string;
	yearFrom?: number;
	yearTo?: number;
	cast?: string;
};

export function Search({ onSearch }: SearchProps) {
	const searchFormRef = useRef<HTMLFormElement>(null);

	function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		if (!searchFormRef.current) {
			return;
		}

		const formData = new FormData(searchFormRef.current);

		const yearFrom = Number(formData.get("inputProductionFrom") as string);
		const yearTo = Number(formData.get("inputProductionTo") as string);

		onSearch({
			title: formData.get("inputTitle") as string,
			yearFrom: yearFrom ? yearFrom : undefined,
			yearTo: yearTo ? yearTo : undefined,
			cast: formData.get("inputCast") as string,
		});
	}

	return (
		<form onSubmit={handleFormSubmit} ref={searchFormRef}>
			<div className="form-group mb-2">
				<label htmlFor="inputTitle" className="form-label">
					Tytuł
				</label>
				<input
					type="text"
					id="inputTitle"
					name="inputTitle"
					className="form-control"
					placeholder="Podaj tytuł lub fragment tytułu filmu"
				/>
			</div>

			<div className="form-group row mb-2">
				<label className="col-sm-4 col-form-label" htmlFor="inputProductionFrom">
					Rok produkcji od:
				</label>
				<div className="col-sm-8">
					<input
						type="text"
						id="inputProductionFrom"
						name="inputProductionFrom"
						className="form-control"
						placeholder="Liczba naturalna z przedziału 1900-2019"
					/>
				</div>
			</div>

			<div className="form-group row">
				<label className="col-sm-4 col-form-label" htmlFor="inputProductionTo">
					Rok produkcji do:
				</label>
				<div className="col-sm-8">
					<input
						type="text"
						id="inputProductionTo"
						name="inputProductionTo"
						className="form-control"
						placeholder="Liczba naturalna z przedziału 1900-2019"
					/>
				</div>
			</div>

			<div className="form-group mb-2">
				<label htmlFor="inputCast" className="form-label">
					Obsada
				</label>
				<input
					type="text"
					id="inputCast"
					name="inputCast"
					className="form-control"
					placeholder="Imię i nazwisko"
				/>
			</div>

			<div className="form-group">
				<input type="submit" className="btn btn-info col-sm-12" value="Szukaj" />
			</div>
		</form>
	);
}
