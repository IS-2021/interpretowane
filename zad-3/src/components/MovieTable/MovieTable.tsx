import { useEffect, useState } from "react";
import { join } from "lodash-es";
import { type Movie } from "@/types";

type MovieTableProps = {
	movies: Movie[];
};

const moviesPerLoad = 10;

export function MovieTable({ movies }: MovieTableProps) {
	const firstMovieTitle = movies[0]?.title ?? "";
	const [page, setPage] = useState(1);
	const moviesToShow = movies.slice(0, page * moviesPerLoad);

	useEffect(() => {
		setPage(1);
	}, [firstMovieTitle]);

	return (
		<>
			<table className="table table-condensed table-hover">
				<thead>
					<tr>
						<th>Title</th>
						<th>Production Year</th>
						<th>Cast</th>
						<th>Genres</th>
					</tr>
				</thead>
				<tbody>
					{moviesToShow.map((movie) => (
						<tr key={movie.title}>
							<td>{movie.title}</td>
							<td>{movie.year}</td>
							<td>{join(movie.cast, ", ")}</td>
							<td>{join(movie.genres, ", ")}</td>
						</tr>
					))}
				</tbody>
			</table>
			<div className="row">
				<div className="col">
					<button type="button" className="btn btn-info w-100" onClick={() => setPage(page + 1)}>
						Pokaż więcej
					</button>
				</div>
			</div>
		</>
	);
}
