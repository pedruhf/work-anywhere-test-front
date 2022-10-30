import React from "react";

import { Film } from "@/domain/models";
import styles from "./styles.module.scss";

type FilmCardProps = {
  film: Film;
};

const FilmCard: React.FC<FilmCardProps> = ({ film }: FilmCardProps) => {
  return (
    <div className={styles.filmCardWrapper}>
      <div className={styles.filmBanner} style={{ backgroundImage: `url(${film.bannerUrl})` }}></div>
      <div className={styles.filmInfo}>
        <strong className={styles.filmTitle}>{film.title}</strong>
        <strong className={styles.filmSummary}>SINOPSE: <p>{film.description}</p></strong>
        <strong>{film.director}, {film.producer}</strong>
      </div>
    </div>
  );
};

export default FilmCard;
