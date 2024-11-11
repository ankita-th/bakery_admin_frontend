import React, { useEffect, useState } from "react";
import usePagination from "../hooks/usePagination";
import { makeApiRequest, METHODS } from "../api/apiFunctions";
import useLoader from "../hooks/useLoader";
import { INVENTORY_ENDPOINT } from "../api/endpoints";
import FilterSection from "../Components/Common/FilterSection";
import CommonButton from "../Components/Common/CommonButton";
// For now this is static so follow comments when API will be created for this

const InventoryManagement = () => {
  const { page, onPageChange, setPage } = usePagination();
  const { loader, toggleLoader } = useLoader();
  const [inventories, setInventories] = useState([]);
  const [totalData, setTotalData] = useState(null);
  useEffect(() => {
    toggleLoader("pageLoader");
    const apiParams = {
      page: page,
    };
    makeApiRequest({
      // update required: Update with the actual endpoint
      endPoint: INVENTORY_ENDPOINT,
      params: apiParams,
      method: METHODS.get,
    })
      .then((res) => {
        setInventories(res?.data?.results);
        setTotalData(res?.data?.count);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        toggleLoader("pageLoader");
      });
  }, [page]);
  return (
    <div>
      {" "}
      {/* <FilterSection
        filterFields={filterFields}
        handleFilterChange={handleFilterChange}
      >
        <CommonButton
          text="Add Raw Product"
          className="buttonTwo"
          onClick={toggleRawMaterialSection}
        />
      </FilterSection> */}
    </div>
  );
};

export default InventoryManagement;
