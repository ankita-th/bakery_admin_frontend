import React from "react";
import ReactPaginate from "react-paginate";
import { login } from "../../api/apiFunctions";

const Pagination = ({ onPageChange, totalData, itemsPerPage }) => {
  // if API returns total data then calculate page count by the following way otherwise page count (total Pages will be provided in the APi itself)
  const totalPages = Math.ceil(totalData / itemsPerPage);
  //   if total pages are there dont't use total Pages and total dta aand items perpage logic

  const shouldShowPagination = totalData > itemsPerPage;
  console.log(totalData,"log totalData inside pagination");
  console.log(shouldShowPagination,"log shouldShowPagination inside pagination");

  return (
    <>
      {shouldShowPagination && (
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          pageCount={totalPages}
          onPageChange={onPageChange}
          containerClassName={"pagination flex-wrap"}
          previousLinkClassName={"page-link"}
          nextLinkClassName={"page-link"}
          disabledClassName={"pagination__link--disabled"}
          activeClassName={"active"}
          pageClassName={"page-item"}
        />
      )}
    </>
  );
};

export default Pagination;
