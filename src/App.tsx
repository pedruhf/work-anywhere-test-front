import { useEffect, useState } from "react";
import styles from "./App.module.scss";

import { Header, FilmCard, Pagination } from "@/presentation/components";
import { makeGetFilmsUseCase, makeUpdateFilmsUseCase } from "@/main/factories/data/use-cases";
import { Film } from "@/domain/models";

const remoteGetFilmes = makeGetFilmsUseCase();
const updateFilmsUseCase = makeUpdateFilmsUseCase();

function App() {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [films, setFilms] = useState<Film[]>([]);
  const [totalFilms, setTotalFilms] = useState<number>(0);

  const handleNextPage = async () => {
    const data = await remoteGetFilmes.execute({ page: page + 1, limit });
    setPage((prevState) => prevState + 1);
    setFilms(data.films);
  };

  const handlePrevPage = async () => {
    const data = await remoteGetFilmes.execute({ page: page - 1, limit });
    setPage((prevState) => prevState - 1);
    setFilms(data.films);
  };

  const handleUpdateFilmsFromApi = async () => {
    try {
      await updateFilmsUseCase.execute();
      const data = await remoteGetFilmes.execute({ page: 1, limit });
      setFilms(data.films);
      setTotalFilms(data.totalFilms);
    } catch (err: any) {
      alert(err.message)
    }
  }

  useEffect(() => {
    remoteGetFilmes
      .execute({ page, limit })
      .then((data) => {
        setFilms(data.films);
        setTotalFilms(data.totalFilms);
      })
      .catch((err) => alert(err.message));
  }, []);

  return (
    <div className={styles.App}>
      <Header />
      <div className={styles.filmsCardWrapper}>{films.length > 0 && films.map((film) => <FilmCard film={film} />)}</div>
      {films.length > 0 && (
        <Pagination currentPage={page} totalPages={Math.ceil(totalFilms / limit)} handleNextPage={handleNextPage} handlePrevPage={handlePrevPage} />
      )}

      {films.length === 0 && <div className={styles.filmsCardNoContent}>
        <strong>Nenhum filme encontrado</strong>
        <button onClick={() => handleUpdateFilmsFromApi()}>Buscar filmes</button>
      </div>}
    </div>
  );
}

export default App;
