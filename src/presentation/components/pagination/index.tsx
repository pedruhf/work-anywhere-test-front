import React from "react";
import styles from "./styles.module.scss";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  handleNextPage: (page: number) => void;
  handlePrevPage: (page: number) => void;
}
const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  handlePrevPage,
  handleNextPage
}) => {
  return (
    <div className={styles.paginationButtonWrapper}>
      <button
        className={styles.paginationButton}
        onClick={() => handlePrevPage(currentPage)}
        disabled={currentPage === 1}
      >
        &#8592;
      </button>

      <span className={styles.paginationPageInfo}>
        Página {currentPage} de {totalPages}
      </span>

      <button
        className={styles.paginationButton}
        onClick={() => handleNextPage(currentPage)}
        disabled={currentPage === totalPages}
      >
        &#8594;
      </button>
    </div>
  );
};

export default Pagination;
