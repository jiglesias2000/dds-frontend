const MAX_PAGE_BUTTONS = 7;

const calculatePages = (pagesCount, currentPage) => {
  let startPage = 1;
  let endPage = pagesCount;

  if (pagesCount > MAX_PAGE_BUTTONS) {
    if (currentPage <= 4) {
      endPage = 7;
    } else if (currentPage + 3 >= pagesCount) {
      startPage = pagesCount - 6;
    } else {
      startPage = currentPage - 3;
      endPage = currentPage + 3;
    }
  }

  return [...Array((endPage + 1) - startPage).keys()].map(i => startPage + i);
};

const Pagination = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
  const pagesCount = Math.ceil(itemsCount / pageSize);
  
  const pages = calculatePages(pagesCount, currentPage);

  const handlePrevPage = () => {
    if (currentPage !== 1) onPageChange(currentPage - 1);
  }

  const handleNextPage = () => {
    if (currentPage !== pagesCount) onPageChange(currentPage + 1);
  }

  return (
    <nav aria-label="Pagination">
      <ul className="pagination">
        <li className={currentPage === 1 ? "page-item disabled" : "page-item"}>
          <button className="page-link" onClick={handlePrevPage} aria-label="Previous Page">Anterior</button>
        </li>
        {pages.map((page) => (
          <li key={page} className={page === currentPage ? "page-item active" : "page-item"}>
            <button className="page-link" onClick={() => onPageChange(page)}>{page}</button>
          </li>
        ))}
        <li className={currentPage === pagesCount ? "page-item disabled" : "page-item"}>
          <button className="page-link" onClick={handleNextPage} aria-label="Next Page">Siguiente</button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
