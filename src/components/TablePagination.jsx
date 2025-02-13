import React from "react";

const TablePagination = ({ previousPage, nextPage, canPreviousPage, canNextPage }) => {
  return (
    <div>
      <button onClick={previousPage} disabled={!canPreviousPage}>
        Previous
      </button>
      <button onClick={nextPage} disabled={!canNextPage}>
        Next
      </button>
    </div>
  );
};

export default TablePagination;
