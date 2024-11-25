import React, { useState } from "react";
import FilterSection from "../Components/Common/FilterSection";
import CommonButton from "../Components/Common/CommonButton";
import { OPTIONS, ORDERS_TYPE_OPTIONS, SORT_BY_OPTIONS } from "../constant";
import { useNavigate } from "react-router-dom";
import useLoader from "../hooks/useLoader";
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
function OrderManagement() {
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
  return (
    <>
      <FilterSection
        filterFields={filterFields}
        handleFilterChange={handleFilterChange}
      >
        <CommonButton
          text="Order History"
          className="orange_btn"
          onClick={()=>
            navigate("/orders-history")
          }
        />  
      </FilterSection>
    </>
  );
}

export default OrderManagement;
