import React, { useEffect, useState } from "react";
import FilterSection from "../Components/Common/FilterSection";
import { makeApiRequest, METHODS } from "../api/apiFunctions";
import { ORDERS_ENDPOINT } from "../api/endpoints";
import TableWrapper from "../Wrappers/TableWrapper";
import NoDataFound from "../Components/Common/NoDataFound";
import SingleOrdersRow from "../Components/SingleOrdersRow";
import usePagination from "../hooks/usePagination";
import useLoader from "../hooks/useLoader";
import Pagination from "../Components/Common/Pagination";
import PageLoader from "../loaders/PageLoader";
import { useForm } from "react-hook-form";
import useModalToggle from "../hooks/useModalToggle";
import ViewOrderHistory from "../Components/ViewOrderHistory";
import {
  DUMMY_ORDERS_DATA,
  ITEMS_PER_PAGE,
  OPTIONS,
  ORDERS_TYPE_OPTIONS,
  SORT_BY_OPTIONS,
} from "../constant";
const filterFields = [
  {
    type: "select",
    filterName: "orders_history",
    defaultOption: "Order Status",
    options: ORDERS_TYPE_OPTIONS,
  },
  {
    type: "select",
    filterName: "orders_type",
    defaultOption: "Orders Type",
    options: OPTIONS,
  },
  {
    type: "select",
    filterName: "sort_by",
    defaultOption: "Sort by",
    options: SORT_BY_OPTIONS,
  },
  {
    type: "search",
    filterName: "name",
    placeholder: "Search Order History",
  },
];
const ORDER_COLUMNS = [
  "Id",
  "Customer Name",
  "Date",
  "Items",
  "Quantity",
  "Reason for Decline",
  "Actions",
];
const OrdersHistory = () => {
  const formConfig = useForm();
  const { page, onPageChange } = usePagination();
  const { showModal: showViewSection, toggleModal: toggleViewSection } =
    useModalToggle();
  const { toggleLoader, pageLoader } = useLoader();
  const [orderHistory, setOrderHistory] = useState([]);
  const [totalData, setTotalData] = useState(null);
  const [viewItem, setViewItem] = useState();
  const [filters, setFilters] = useState({
    orders_history: "",
    orders_type: "",
    sort_by: "",
    name: "",
  });

  useEffect(() => {
    toggleLoader("pageLoader");
    const apiParams = {
      ...filters,
      page: page,
    };
    setOrderHistory(DUMMY_ORDERS_DATA);
    makeApiRequest({
      // update required: Update with the actual endpoint
      endPoint: ORDERS_ENDPOINT,
      params: apiParams,
      method: METHODS.get,
    })
      .then((res) => {
        setOrderHistory(res?.data?.results);
        setTotalData(res?.data?.count);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        toggleLoader("pageLoader");
      });
  }, [page, filters]);

  const handleFilterChange = (filterName, value) => {
    const temp = { ...filters };
    temp[filterName] = value;
    setFilters(temp);
  };

  const handleActions = ({ action, id, viewItem }) => {
    if (action === "view") {
      setViewItem(viewItem);
      toggleViewSection();
    } else {
      // Update required: add logic for print here
    }
  };
  return (
    <>
      {pageLoader ? (
        <PageLoader />
      ) : (
        <>
          <FilterSection
            filterFields={filterFields}
            handleFilterChange={handleFilterChange}
          />
          <TableWrapper columns={ORDER_COLUMNS}>
            {orderHistory?.length ? (
              orderHistory?.map((it, idx) => (
                <SingleOrdersRow
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
          {showViewSection && (
            <ViewOrderHistory
              item={viewItem}
              onClose={() => {
                toggleViewSection();
              }}
              formConfig={formConfig}
            />
          )}
        </>
      )}
    </>
  );
};

export default OrdersHistory;