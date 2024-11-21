import React, { useEffect, useState } from "react";
import {
  DEFAULT_ERROR_MESSAGE,
  ITEMS_PER_PAGE,
  SORT_BY_OPTIONS,
} from "../constant";
import FilterSection from "../Components/Common/FilterSection";
import usePagination from "../hooks/usePagination";
import { makeApiRequest, METHODS } from "../api/apiFunctions";
import useLoader from "../hooks/useLoader";
import PageLoader from "../loaders/PageLoader";
import NoDataFound from "../Components/Common/NoDataFound";
import SingleDiscountRow from "../Components/SingleDiscountRow";
import { DISCOUNT_ENDPOINT } from "../api/endpoints";
import Pagination from "../Components/Common/Pagination";
import TableWrapper from "../Wrappers/TableWrapper";
import useModalToggle from "../hooks/useModalToggle";
import DeleteConfirmationModal from "../Modals/DeleteConfirmationModal";
import { deleteItemBasedOnId } from "../utils/helpers";
import { successType, toastMessage } from "../utils/toastMessage";
import CommonButton from "../Components/Common/CommonButton";
import DiscountTypeSection from "../Components/DiscountTypeSection";
const filterFields = [
  {
    type: "select",
    defaultOption: "Sort by",
    options: SORT_BY_OPTIONS,
    filterName: "sort_by",
  },

  {
    type: "search",
    filterName: "name",
    placeholder: "Search Coupon",
  },
];
const DISCOUNTS_COLUMNS = [
  "checkbox",
  "Title",
  "Method",
  "Type",
  "Combinations",
  "Status",
];

const Discounts = () => {
  const { page, onPageChange } = usePagination();
  const { toggleLoader, pageLoader } = useLoader();
  const [filters, setFilters] = useState({
    sort_by: "",
    name: "",
  });
  const [discounts, setDiscounts] = useState([]);
  const [totalData, setTotalData] = useState([]);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [deleteLoader, setDeleteLoader] = useState(false);
  const { showModal: showDeleteModal, toggleModal: toggleDeleteModal } =
    useModalToggle();

  const {
    showModal: showDiscountTypeSection,
    toggleModal: toggleDiscountTypeSection,
  } = useModalToggle();

  useEffect(() => {
    toggleLoader("pageLoader");
    const apiParams = {
      ...filters,
      page: page,
    };
    makeApiRequest({
      endPoint: DISCOUNT_ENDPOINT,
      method: METHODS.get,
      params: apiParams,
    })
      .then((res) => {
        setDiscounts(res?.data?.results);
        setTotalData(res?.data?.count);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        toggleLoader("pageLoader");
      });
  }, [filters, page]);

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
  const deleteDiscount = () => {
    setDeleteLoader((prev) => true);
    makeApiRequest({
      endPoint: DISCOUNT_ENDPOINT,
      method: METHODS.delete,
      delete_id: itemToDelete,
    })
      .then((res) => {
        // updated required: add a better toast message here
        toastMessage("Discount deleted successfuly", successType);
        setDiscounts(deleteItemBasedOnId(discounts, itemToDelete));
      })
      .catch((err) => {
        console.log(err);
        toastMessage(err?.response?.data?.error || DEFAULT_ERROR_MESSAGE);
      })
      .finally(() => {
        setItemToDelete(null);
        toggleDeleteModal();
        setDeleteLoader((prev) => false);
      });
  };
  const handleAddNewCoupon = () => {};
  return (
    <div>
      {pageLoader ? (
        <PageLoader />
      ) : (
        <>
          <FilterSection
            filterFields={filterFields}
            handleFilterChange={handleFilterChange}
          >
            <CommonButton
              text="Add New Coupon"
              onClick={toggleDiscountTypeSection}
              className="orange_btn"
            />
          </FilterSection>
          <TableWrapper columns={DISCOUNTS_COLUMNS}>
            {discounts?.length ? (
              discounts?.map((it, idx) => (
                <SingleDiscountRow
                  item={it}
                  key={idx}
                  handleActions={handleActions}
                />
              ))
            ) : (
              <NoDataFound />
            )}
          </TableWrapper>
        </>
      )}

      <Pagination
        onPageChange={onPageChange}
        itemsPerPage={ITEMS_PER_PAGE}
        totalData={totalData}
      />
      {showDeleteModal && (
        <DeleteConfirmationModal
          // update required: may be need to correct this messages
          title="Are you sure you want to delete this discount coupons?"
          description="This action cannot be redo."
          onCancel={() => {
            setItemToDelete(null);
            toggleDeleteModal();
          }}
          loader={deleteLoader}
          onDelete={deleteDiscount}
        />
      )}
      {/* update required: need to add a blurr effect in this from designer also for delete modal */}
      {showDiscountTypeSection && (
        <DiscountTypeSection onClose={toggleDiscountTypeSection} />
      )}
    </div>
  );
};

export default Discounts;
