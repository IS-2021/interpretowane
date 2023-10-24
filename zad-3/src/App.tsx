import moviesData from "./data/movies-2010s.json";
import { MovieTable } from "@/components/MovieTable/MovieTable";

function App() {
  return (
    <div className="container">
      <h1>Baza filmów</h1>
      <form>
        <div className="form-group">
          <label htmlFor="inputTitle">Tytuł</label>
          <input
            type="text"
            id="inputTitle"
            className="form-control"
            placeholder="Podaj tytuł lub fragment tytułu filmu"
          />
        </div>
        <div className="form-group row">
          <label
            className="col-sm-4 col-form-label"
            htmlFor="inputProductionFrom"
          >
            Rok produkcji od:
          </label>
          <div className="col-sm-8">
            <input
              type="text"
              id="inputProductionFrom"
              className="form-control"
              placeholder="Liczba naturalna z przedziału 1900-2019"
            />
          </div>
        </div>
        <div className="form-group row">
          <label
            className="col-sm-4 col-form-label"
            htmlFor="inputProductionTo"
          >
            Rok produkcji do:
          </label>
          <div className="col-sm-8">
            <input
              type="text"
              id="inputProductionTo"
              className="form-control"
              placeholder="Liczba naturalna z przedziału 1900-2019"
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="inputCast">Obsada</label>
          <input
            type="text"
            id="inputCast"
            className="form-control"
            placeholder="Imię i nazwisko"
          />
        </div>
        <div className="form-group row">
          <input
            type="button"
            className="btn btn-info col-sm-12"
            value="Szukaj"
          />
        </div>
      </form>

      {/*<MovieTable movies={} />*/}

      <h1>Filmy wg gatunku</h1>

      <h1>Filmy wg obsady</h1>
    </div>
  );
}

export default App;
