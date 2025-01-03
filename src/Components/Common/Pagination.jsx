import React from "react";
import ReactPaginate from "react-paginate";
import { login } from "../../api/apiFunctions";
const Pagination = ({ onPageChange, totalData, itemsPerPage, currentPage }) => {
  // if API returns total data then calculate page count by the following way otherwise page count (total Pages will be provided in the APi itself)
  const totalPages = Math.ceil(totalData / itemsPerPage);
  const shouldShowPagination = totalData > itemsPerPage;
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, totalData);

  return (
    <>
      {shouldShowPagination && (
        <div className="count-text">
          Showing data {startIndex} to {endIndex} of{" "}
          {totalData > 999 ? `${(totalData / 1000).toFixed(1)}K` : totalData}{" "}
          entries
        </div>
      )}
      {shouldShowPagination && (
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          pageCount={totalPages}
          onPageChange={onPageChange}
          containerClassName={"flex gap-4 items-center"}
          previousLinkClassName={"border px-2 bg-[#F5F5F5] rounded-md py-1"}
          nextLinkClassName={"border px-2 bg-[#F5F5F5] rounded-md py-1"}
          disabledClassName={"pagination__link--disabled"}
          activeClassName={"bg-[#FF6363] text-white"}
          pageClassName={"border px-2 bg-[#F5F5F5] rounded-md"}
          forcePage={currentPage - 1}
        />
      )}
    </>
  );
};

export default Pagination;
