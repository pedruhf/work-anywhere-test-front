import { Header, FilmCard } from "@/presentation/components";

import styles from "./App.module.scss";

function App() {
  return (
    <div className={styles.App}>
      <Header />
      <div className={styles.filmsCardWrapper}>
        <FilmCard film={{
          id: 1,
          title: "a volta dos q nao foram",
          description: "a work anywhere estava maluca e resolveu nao me ligar",
          director: "Elton Jhon",
          producer: "Ze Maia Miguel",
          bannerUrl: "https://image.tmdb.org/t/p/w533_and_h300_bestv2/3cyjYtLWCBE1uvWINHFsFnE8LUK.jpg"
        }} />
      </div>
    </div>
  );
}

export default App;
