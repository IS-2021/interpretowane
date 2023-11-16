import { type Movie } from "@/types";

type MovieListProps = {
	movies: Movie[];
};

export function MovieList({ movies }: MovieListProps) {
	return (
		<ol>
			{movies.map((movie, idx) => (
				<li key={`${movie.title}-${idx}`}>{movie.title}</li>
			))}
		</ol>
	);
}
