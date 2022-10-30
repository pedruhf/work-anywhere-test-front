import { useEffect, useState } from "react";
import styles from "./App.module.scss";

import { Header, FilmCard } from "@/presentation/components";
import { makeGetFilmsUseCase } from "@/main/factories/data/use-cases";
import { Film } from "@/domain/models";

const remoteGetFilmes = makeGetFilmsUseCase();

function App() {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [films, setFilms] = useState<Film[]>([]);

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
    </div>
  );
}

export default App;
