import React, { useState } from "react";
import FilterSection from "../Components/Common/FilterSection";
import CommonButton from "../Components/Common/CommonButton";
import { OPTIONS, ORDERS_TYPE_OPTIONS, SORT_BY_OPTIONS } from "../constant";
import { useNavigate } from "react-router-dom";
import useLoader from "../hooks/useLoader";
import TableWrapper from "../Wrappers/TableWrapper";
import NoDataFound from "./Common/NoDataFound";
import usePagination from "../hooks/usePagination";
import SingleOrderManagementRow from "./SingleOrderManagementRow";
import { T } from "../utils/languageTranslator";
const filterFields = [
  {
    type: "select",
    filterName: "orders_history",
    defaultOption: T["order_status"],
    options: ORDERS_TYPE_OPTIONS,
  },
  {
    type: "select",
    filterName: "orders_type",
    defaultOption: T["orders_type"],
    options: OPTIONS,
  },
  {
    type: "select",
    filterName: "sort_by",
    defaultOption: T["sort_by"],
    options: SORT_BY_OPTIONS,
  },
  {
    type: "search",
    filterName: "name",
    placeholder: T["search_order_history"],
  },
];

const DUMMY_ORDERS = [
  {
    id: "45678",
    name: "John Doe",
    quantity: 10,
    payment: "123 SEK",
    paymentStatus: "Paid Online",
    dateTime: "10 Oct, 01:00 PM",
    status: "Pending",
  },
  {
    id: "45679",
    name: "Jane Smith",
    quantity: 5,
    payment: "250 SEK",
    paymentStatus: "Paid Online",
    dateTime: "11 Oct, 03:00 PM",
    status: "Pending",
  },
  {
    id: "45680",
    name: "Mike Johnson",
    quantity: 8,
    payment: "400 SEK",
    paymentStatus: "Paid Online",
    dateTime: "12 Oct, 10:00 AM",
    status: "Pending",
  },
];

const ORDER_MANAGEMENT_COLUMNS = [
  T["order_no"],
  T["customer_name"],
  T["items"],
  T["order_status"],
  T["action"],
];
function OrderManagement() {
  const [orders, setOrders] = useState(DUMMY_ORDERS);
  const { page, onPageChange } = usePagination();
  const navigate = useNavigate();
  const { toggleLoader, pageLoader } = useLoader();
  const [filters, setFilters] = useState({
    orders_history: "",
    orders_type: "",
    sort_by: "",
    name: "",
  });
  const handleFilterChange = (filterName, value) => {
    const temp = { ...filters };
    temp[filterName] = value;
    setFilters(temp);
  };
  const handleActions = () => {};
  return (
    <>
      <FilterSection
        filterFields={filterFields}
        handleFilterChange={handleFilterChange}
      >
        <CommonButton
          text="Order History"
          className="orange_btn"
          onClick={() => navigate("/orders-history")}
        />
      </FilterSection>
      <TableWrapper columns={ORDER_MANAGEMENT_COLUMNS}>
        {orders?.length ? (
          orders?.map((it, idx) => (
            <SingleOrderManagementRow
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
    </>
  );
}

export default OrderManagement;
