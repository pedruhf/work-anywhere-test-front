import { useEffect, useState } from "react";
import styles from "./App.module.scss";

import { Header, FilmCard, Pagination } from "@/presentation/components";
import { makeGetFilmsUseCase } from "@/main/factories/data/use-cases";
import { Film } from "@/domain/models";

const remoteGetFilmes = makeGetFilmsUseCase();

function App() {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [films, setFilms] = useState<Film[]>([]);
  const [totalFilms, setTotalFilms] = useState<number>(0);

  const handleNextPage = async () => {
    const data = await remoteGetFilmes.execute({ page: page + 1, limit });
    setPage(prevState => prevState + 1);
    setFilms(data.films);
  };
  const handlePrevPage = async () => {
    const data = await remoteGetFilmes.execute({ page: page -1, limit });
    setPage(prevState => prevState - 1);
    setFilms(data.films);
  };

  useEffect(() => {
    remoteGetFilmes
      .execute({ page, limit })
      .then((data) => {
        setFilms(data.films);
        setTotalFilms(data.totalFilms);
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
      <Pagination currentPage={page} totalPages={Math.ceil(totalFilms / limit)} handleNextPage={handleNextPage} handlePrevPage={handlePrevPage} />
    </div>
  );
}

export default App;
