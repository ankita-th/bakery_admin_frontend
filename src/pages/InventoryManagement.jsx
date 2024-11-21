import React, { useEffect, useState } from "react";
import usePagination from "../hooks/usePagination";
import { makeApiRequest, METHODS } from "../api/apiFunctions";
import useLoader from "../hooks/useLoader";
import { GET_INVENTORY_ENDPOINT } from "../api/endpoints";
import FilterSection from "../Components/Common/FilterSection";
import CommonButton from "../Components/Common/CommonButton";
import {
  DUMMY_INVENTORY_DATA,
  INVENTORY_PAGE_COLUMNS,
  ITEMS_PER_PAGE,
  SORT_BY_OPTIONS,
} from "../constant";
import NoDataFound from "../Components/Common/NoDataFound";
import TableWrapper from "../Wrappers/TableWrapper";
import Pagination from "../Components/Common/Pagination";
import SingleInventoryRow from "../Components/SingleInventoryRow";
import useModalToggle from "../hooks/useModalToggle";
import { useForm } from "react-hook-form";
import AddEditInventory from "../Components/Common/AddEditInventory";
// For now this is static so follow comments when API will be created for this
const filterFields = [
  {
    type: "select",
    defaultOption: "Sort by",
    options: SORT_BY_OPTIONS,
    filterName: "action",
  },
  {
    type: "search",
    filterName: "name",
    placeholder: "Search Inventory",
  },
];

const InventoryManagement = () => {
  const formConfig = useForm();
  const { reset } = formConfig;
  const { page, onPageChange, setPage } = usePagination();
  const { loader, toggleLoader } = useLoader();
  const { showModal: showInventorySection, toggleModal: toggleInventory } =
    useModalToggle();
  const [inventories, setInventories] = useState([]);
  const [totalData, setTotalData] = useState(null);
  const [editInfo, setEditInfo] = useState({
    isEdit: false,
    editItem: null,
  });
  const [filters, setFilters] = useState({
    sort_by: "",
    name: "",
  });
  useEffect(() => {
    toggleLoader("pageLoader");
    const apiParams = {
      ...filters,
      page: page,
    };
    setInventories(DUMMY_INVENTORY_DATA);
    // makeApiRequest({
    //   // update required: Update with the actual endpoint
    //   endPoint: GET_INVENTORY_ENDPOINT,
    //   params: apiParams,
    //   method: METHODS.get,
    // })
    //   .then((res) => {
    //     setInventories(res?.data?.results);
    //     setTotalData(res?.data?.count);
    //   })
    //   .catch((err) => console.log(err))
    //   .finally(() => {
    //     toggleLoader("pageLoader");
    //   });
  }, [page, filters]);

  const handleFilterChange = (filterName, value) => {
    const temp = { ...filters };
    temp[filterName] = value;
    setFilters(temp);
  };

  const handleActions = () => {};
  const handleInventorySection = ({ action }) => {
    if (action === "open") {
      toggleInventory();
    } else if (action === "close") {
      toggleInventory();
      setPage(1);
      reset();
    }
  };
  const onSubmit = (values) => {
    console.log(values, "these are values");
  };

  console.log(showInventorySection, "this is inventory section");
  return (
    <div>
      {" "}
      <FilterSection
        filterFields={filterFields}
        handleFilterChange={handleFilterChange}
      >
        <CommonButton
          text="Add Inventory"
          className="orange_btn"
          onClick={() => {
            handleInventorySection({ action: "open" });
          }}
        />
      </FilterSection>
      <TableWrapper columns={INVENTORY_PAGE_COLUMNS}>
        {inventories?.length ? (
          inventories?.map((it, idx) => (
            <SingleInventoryRow
              key={idx}
              item={it}
              currentPage={page}
              index={idx}
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
      />
      {showInventorySection && (
        <AddEditInventory
          formConfig={formConfig}
          onClose={() => {
            handleInventorySection({ action: "close" });
          }}
          editInfo={editInfo}
          onSubmit={onSubmit}
        />
      )}
    </div>
  );
};

export default InventoryManagement;
