import { type Movie } from "@/types";
import { MovieList } from "@/components/MovieList/MovieList";

type MovieListByCastProps = {
	movies: Movie[];
};

export function MovieListByCast({ movies }: MovieListByCastProps) {
	const moviesByCast = new Map<string, Movie[]>();

	movies.map((movie) => {
		movie.cast.forEach((actor) => {
			const actorMovies = moviesByCast.get(actor);

			if (actorMovies) {
				moviesByCast.set(actor, [movie, ...actorMovies]);
			} else {
				moviesByCast.set(actor, [movie]);
			}
		});
	});

	const actors = Array.from(moviesByCast.keys()).slice(0, 100);

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
