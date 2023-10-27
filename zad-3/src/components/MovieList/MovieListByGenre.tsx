import { type Movie } from "@/types";
import { MovieList } from "@/components/MovieList/MovieList";

type MovieListByGenreProps = {
	movies: Movie[];
};

export function MovieListByGenre({ movies }: MovieListByGenreProps) {
	const moviesByGenre = new Map<string, Movie[]>();

	movies.map((movie) => {
		movie.genres.forEach((genre) => {
			const genreMovies = moviesByGenre.get(genre);

			if (genreMovies) {
				moviesByGenre.set(genre, [movie, ...genreMovies]);
			} else {
				moviesByGenre.set(genre, [movie]);
			}
		});
	});

	const genres = Array.from(moviesByGenre.keys());

	return (
		<>
			{genres.map((genre) => {
				const movies = moviesByGenre.get(genre);
				if (!movies) return <></>;

				return (
					<div key={genre}>
						<h2>{genre}</h2>
						<MovieList movies={movies} />
					</div>
				);
			})}
		</>
	);
}
