import React from "react";

import styles from "./styles.module.scss";

const Header: React.FC = () => {
  return (
    <div className={styles.headerWrapper}>
      <h1>WORK ANYWHERE FILMS</h1>
      <strong>Pedro Freitas</strong>
    </div>
  );
};

export default Header;
