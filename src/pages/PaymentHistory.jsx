import React, { useEffect, useState } from "react";
import FilterSection from "../Components/Common/FilterSection";
import {
  PAYMENT_TYPE_OPTIONS,
  SORT_BY_OPTIONS,
  DUMMY_PAYMENT_DATA,
  ITEMS_PER_PAGE,
} from "../constant";
import { PAYMENT_ENDPOINT } from "../api/endpoints";
import usePagination from "../hooks/usePagination";
import useLoader from "../hooks/useLoader";
import { makeApiRequest, METHODS } from "../api/apiFunctions";
import TableWrapper from "../Wrappers/TableWrapper";
import NoDataFound from "../Components/Common/NoDataFound";
import SinglePaymentRow from "../Components/SinglePaymentRow";
import Pagination from "../Components/Common/Pagination";
import PageLoader from "../loaders/PageLoader";
import { T } from "../utils/languageTranslator";
const filterFields = [
  {
    type: "select",
    filterName: "paymentType",
    defaultOption: T["select_payment_type"],
    options: PAYMENT_TYPE_OPTIONS,
  },
  {
    type: "select",
    filterName: "date",
    defaultOption: T["date"],
    options: SORT_BY_OPTIONS,
  },
  {
    type: "search",
    filterName: "name",
    placeholder: T["search_payment"],
  },
];
const PAYMENT_COLUMNS = [
  T["id"],
  T["customer_name"],
  T["date"],
  T["order_id"],
  T["payment_method"],
  T["amount"],
  T["status"],
  T["transaction_id"],
  T["action"],
];
const PaymentHistory = () => {
  const { page, onPageChange } = usePagination();
  const { toggleLoader, pageLoader } = useLoader();
  const [filters, setFilters] = useState({
    paymentType: "",
    date: "",
    name: "",
  });
  const [totalData, setTotalData] = useState(null);
  const [paymentHistory, setPaymentHistory] = useState([]);

  useEffect(() => {
    toggleLoader("pageLoader");
    const apiParams = {
      ...filters,
      page: page,
    };
    setPaymentHistory(DUMMY_PAYMENT_DATA);
    makeApiRequest({
      // update required: Update with the actual endpoint
      endPoint: PAYMENT_ENDPOINT,
      params: apiParams,
      method: METHODS.get,
    })
      .then((res) => {
        setPaymentHistory(res?.data?.results);
        setTotalData(res?.data?.count);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        toggleLoader("pageLoader");
      });
  }, [page, filters]);
  const handleActions = ({ action, id }) => {
    if (action === "view") {
      // Update required : add logic for view here
    } else {
      // Update required: add logic for print here
    }
  };
  const handleFilterChange = (filterName, value) => {
    const temp = { ...filters };
    temp[filterName] = value;
    setFilters(temp);
  };
  return (
    <>
      {pageLoader && <PageLoader />}
      <>
        <FilterSection
          filterFields={filterFields}
          handleFilterChange={handleFilterChange}
          filters={filters}
        />
        <TableWrapper columns={PAYMENT_COLUMNS}>
          {paymentHistory?.length ? (
            paymentHistory?.map((it, idx) => (
              <SinglePaymentRow
                key={idx}
                item={it}
                index={idx}
                currentPage={page}
                handleActions={handleActions}
              />
            ))
          ) : (
            <NoDataFound />
          )}
        </TableWrapper>
        <Pagination
          onPageChange={onPageChange}
          itemsPerPage={ITEMS_PER_PAGE}
          totalData={totalData}
          currentPage={page}
        />
      </>
    </>
  );
};

export default PaymentHistory;
