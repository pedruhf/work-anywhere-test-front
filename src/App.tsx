import { useEffect, useState } from "react";
import styles from "./App.module.scss";

import { Header, FilmCard, Pagination } from "@/presentation/components";
import { makeGetFilmsUseCase } from "@/main/factories/data/use-cases";
import { Film } from "@/domain/models";

const remoteGetFilmes = makeGetFilmsUseCase();

function App() {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(2);
  const [films, setFilms] = useState<Film[]>([]);

  const handleNextPage = async () => {
    setPage(prevState => prevState + 1);
    const films = await remoteGetFilmes.execute({ page, limit });
    setFilms(films);
  };
  const handlePrevPage = async () => {
    setPage(prevState => prevState - 1);
    const films = await remoteGetFilmes.execute({ page, limit });
    setFilms(films);
  };

  useEffect(() => {
    remoteGetFilmes
      .execute({ page, limit })
      .then((data) => {
        setFilms(data);
      })
      .catch((err) => alert(err));
  }, []);

  return (
    <div className={styles.App}>
      <Header />
      <div className={styles.filmsCardWrapper}>
        {films.length > 0 &&
          films.map((film) => (
            <FilmCard
              film={film}
            />
          ))}
      </div>
      <Pagination currentPage={page} totalPages={films.length / limit} handleNextPage={handleNextPage} handlePrevPage={handlePrevPage} />
    </div>
  );
}

export default App;
