import { useState } from "react";
import { filter, join } from "lodash-es";
import moviesData from "./data/movies-2010s.json";
import { MovieListByGenre } from "@/components/MovieList/MovieListByGenre";
import { MovieTable } from "@/components/MovieTable/MovieTable";
import { MovieListByCast } from "@/components/MovieList/MovieListByCast";
import { Search, type SearchFormData } from "@/components/Search/Search";
import { type Movie } from "@/types";

export function App() {
	const [filters, setFilters] = useState<SearchFormData>({});
	const movies = moviesData.slice(0, 100);

	function filterMovies(): Movie[] {
		let result: Movie[] = moviesData;

		if (filters.title) {
			result = filter(result, (movie) =>
				movie.title.toLowerCase().includes((filters.title ?? "").toLowerCase()),
			);
		}

		if (filters.cast) {
			result = filter(result, (movie) =>
				join(movie.cast, " ")
					.toLowerCase()
					.includes((filters.cast ?? "").toLowerCase()),
			);
		}

		if (filters.yearFrom && filters.yearTo) {
			const yearFrom = filters.yearFrom;
			const yearTo = filters.yearTo;
			result = filter(result, (movie) => yearFrom <= movie.year && movie.year <= yearTo);
		} else if (filters.yearFrom) {
			const yearFrom = filters.yearFrom;
			result = filter(result, (movie) => yearFrom <= movie.year);
		} else if (filters.yearTo) {
			const yearTo = filters.yearTo;
			result = filter(result, (movie) => movie.year <= yearTo);
		}

		return result.slice(0, 100);
	}

	const filteredMovies = filterMovies();

	function onSearch(data: SearchFormData) {
		setFilters(data);
	}

	return (
		<div className="container">
			<h1>Baza filmów</h1>
			<Search onSearch={onSearch} />

			<MovieTable movies={filteredMovies} />

			<h1>Filmy wg gatunku</h1>
			<MovieListByGenre movies={movies} />

			<h1>Filmy wg obsady</h1>
			<MovieListByCast movies={movies} />
		</div>
	);
}
