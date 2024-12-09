import React, { useEffect, useState } from "react";
import FilterSection from "../Components/Common/FilterSection";
import {
  DEFAULT_ERROR_MESSAGE,
  DUMMY_CUSTOMER_DATA,
  ITEMS_PER_PAGE,
  SORT_BY_OPTIONS,
} from "../constant";
import CommonButton from "../Components/Common/CommonButton";
import { makeApiRequest, METHODS } from "../api/apiFunctions";
import { CUSTOMER_ENDPOINT } from "../api/endpoints";
import useLoader from "../hooks/useLoader";
import usePagination from "../hooks/usePagination";
import TableWrapper from "../Wrappers/TableWrapper";
import SingleCustomerRow from "../Components/SingleCustomerRow";
import NoDataFound from "../Components/Common/NoDataFound";
import useModalToggle from "../hooks/useModalToggle";
import DeleteConfirmationModal from "../Modals/DeleteConfirmationModal";
import PageLoader from "../loaders/PageLoader";
import Pagination from "../Components/Common/Pagination";
import { deleteItemBasedOnId } from "../utils/helpers";
import { successType, toastMessage } from "../utils/toastMessage";
import { T } from "../utils/languageTranslator";
const filterFields = [
  {
    type: "select",
    filterName: "sort_by",
    defaultOption: T["sort_by"],
    options: SORT_BY_OPTIONS,
  },
  {
    type: "search",
    filterName: "name",
    placeholder: T["search_customers"],
  },
];
const CUSTOMER_COLUMNS = [
  T["id"],
  T["customer_type"],
  T["name"],
  T["contact_person"],
  T["contact_details"],
  T["address"],
  T["order_history"],
  T["action"],
];
const Customers = () => {
  const { toggleLoader, pageLoader } = useLoader();
  const { page, onPageChange } = usePagination();
  const { showModal: showDeleteModal, toggleModal: toggleDeleteModal } =
    useModalToggle();
  const [customers, setCustomers] = useState([]);
  const [totalData, setTotalData] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [deleteLoader, setDeleteLoader] = useState(false);
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
    setCustomers(DUMMY_CUSTOMER_DATA);
    makeApiRequest({
      // update required: Update with the actual endpoint
      endPoint: CUSTOMER_ENDPOINT,
      params: apiParams,
      method: METHODS.get,
    })
      .then((res) => {
        setCustomers(res?.data?.results);
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
  const handleActions = ({ action, delete_id }) => {
    if (action === "delete") {
      toggleDeleteModal();
      setItemToDelete(delete_id);
    }
  };
  const deleteCustomer = () => {
    setDeleteLoader((prev) => true);
    //update required : remove this section and uncomment the api call
    toastMessage("Deleted Successfully", successType);
    setCustomers(deleteItemBasedOnId(customers, itemToDelete));
    setDeleteLoader((prev) => false);
    toggleDeleteModal();
    // makeApiRequest({
    //   endPoint: CUSTOMER_ENDPOINT,
    //   method: METHODS.delete,
    //   delete_id: itemToDelete,
    // })
    //   .then((res) => {
    //     // update required:Add a proper message here
    //     toastMessage("Deleted Successfully", successType);
    //     setCustomers(deleteItemBasedOnId(customers, itemToDelete));
    //   })
    //   .catch((err) => {
    //     // update required: chek in the api in which object error message is coming
    //     toastMessage(err?.response?.data?.error || DEFAULT_ERROR_MESSAGE);
    //   })
    //   .finally(() => {
    //     setDeleteLoader((prev) => false);
    //     toggleDeleteModal();
    //     setItemToDelete(null);
    //   });
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
          >
            <CommonButton
              text="Add New Customer"
              className="orange_btn"
              type="button"
              onClick={() => {
                handleEmployeeSection({ action: "open" });
              }}
            />
          </FilterSection>
          <TableWrapper columns={CUSTOMER_COLUMNS}>
            {customers?.length ? (
              customers?.map((it, idx) => (
                <SingleCustomerRow
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
          {showDeleteModal && (
            <DeleteConfirmationModal
              title={T["remove_this_customer"]}
              description={T["this_action_cannot_be_redo"]}
              onCancel={() => {
                setItemToDelete(null);
                toggleDeleteModal();
                toggleLoader();
              }}
              onDelete={deleteCustomer}
              loader={deleteLoader}
            />
          )}
        </>
      )}
    </>
  );
};

export default Customers;
