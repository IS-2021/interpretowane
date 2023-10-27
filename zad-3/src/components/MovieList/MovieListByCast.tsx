import { type Movie } from "@/types";
import { MovieList } from "@/components/MovieList/MovieList";

type MovieListByCastProps = {
	movies: Movie[];
};

export function MovieListByCast({ movies }: MovieListByCastProps) {
	const moviesByCast = new Map<string, Movie[]>();

	movies.map((movie) => {
		movie.cast.forEach((actor) => {
			if (!moviesByCast.has(actor)) {
				moviesByCast.set(actor, [movie]);
			} else {
				const genreMovies = moviesByCast.get(actor);

				if (genreMovies) {
					moviesByCast.set(actor, [movie, ...genreMovies]);
				}
			}
		});
	});

	const actors = Array.from(moviesByCast.keys());

	return (
		<>
			{actors.map((actor) => {
				const movies = moviesByCast.get(actor);
				if (!movies) return <></>;

				return (
					<div key={actor}>
						<h2>{actor}</h2>
						<MovieList movies={movies} />
					</div>
				);
			})}
		</>
	);
}
