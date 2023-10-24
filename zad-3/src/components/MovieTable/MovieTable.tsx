import { type Movie } from "@/types";

type MovieTableProps = {
  movies: Movie[];
};

export function MovieTable({ movies }: MovieTableProps) {
  return (
    <table className="table-condensed table-hover">
      <thead>
        <tr>
          <th>Title</th>
          <th>Production Year</th>
          <th>Cast</th>
          <th>Genres</th>
        </tr>
      </thead>
      <tbody>
        {movies.map((movie) => (
          <tr key={movie.title}>
            <td>{movie.title}</td>
            <td>{movie.year}</td>
            <td>{JSON.stringify(movie.cast)}</td>
            <td>{JSON.stringify(movie.genres)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
