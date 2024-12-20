import React, { useEffect, useState } from "react";
import {
  ACTIONS,
  DEFAULT_ERROR_MESSAGE,
  ITEMS_PER_PAGE,
  SORT_BY_OPTIONS,
  TYPE_OPTIONS,
} from "../constant";
import FilterSection from "../Components/Common/FilterSection";
import usePagination from "../hooks/usePagination";
import { bulkActionDiscount, bulkActionProduct, makeApiRequest, METHODS } from "../api/apiFunctions";
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
import { useNavigate } from "react-router-dom";
import { T } from "../utils/languageTranslator";
import useSelectedItems from "../hooks/useSelectedItems";
const filterFields = [
  {
    type: "select",
    defaultOption: T["sort_by"],
    options: SORT_BY_OPTIONS,
    filterName: "sort_by",
  },
  {
    type: "select",
    defaultOption: T["select_type"],
    options: TYPE_OPTIONS,
    filterName: "status",
  },
  {
    type: "select",
    defaultOption: T["select_action"],
    options: ACTIONS,
    filterName: "action",
  },
  {
    type: "search",
    filterName: "name",
    placeholder: T["search_coupon"],
  },
];
const DISCOUNTS_COLUMNS = [
  "checkbox",
  T["title"],
  T["method"],
  T["type"],
  T["combinations"],
  T["status"],
];

const Discounts = () => {
  const navigate = useNavigate();
  const { page, onPageChange,setPage } = usePagination();
  const { toggleLoader, pageLoader } = useLoader();
  const [filters, setFilters] = useState({
    sort_by: "",
    search: "",
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
  const {
    selectedItems: selectedDiscount,
    setSelectedItems: setSelectedDiscount,
    handleSelectItems: handleSelectedDiscount,
    selectAllItems,
  } = useSelectedItems();
  useEffect(() => {
    toggleLoader("pageLoader");
    const apiParams = {
      ...filters,
      page: page,
    };
    fetchDiscounts(apiParams);
  }, [filters, page]);
  const fetchDiscounts = (apiParams) => {
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
  };

  // const handleFilterChange = (filterName, value) => {
  //   const temp = { ...filters };
  //   temp[filterName] = value;
  //   setFilters(temp);
  // };

  const handleFilterChange = (filterName, value) => {
    // logic for bulk actions
    if (filterName === "action") {
      const payload = {handleFilterChange,
        coupons: selectedDiscount,
        status: value,
      };
      console.log(value, "this is value");

      if (selectedDiscount?.length) {
        toggleLoader("pageLoader");
        bulkActionDiscount(payload)
          .then((res) => {
            // fetchDiscounts({ page: 1 });
            toastMessage(
              res?.data?.message ||
                `Discounts ${
                  value === "delete"
                    ? "Deleted"
                    : value === "draft"
                    ? "Drafted"
                    : value === "duplicate" && "Duplicated"
                } successfully`,
              successType
            );
          })
          .catch((err) => {
            console.log(err, "this is err");
            toastMessage(err?.response?.data?.error || DEFAULT_ERROR_MESSAGE);
          })
          .finally(() => {
            toggleLoader("pageLoader");
            setPage(1);
            setSelectedDiscount([]);
            setFilters({ ...filters, ["action"]: "" });
          });
      } else {
        toastMessage(
          "Please select at least one discount before performing any action"
        );
      }
    } else {
      const temp = { ...filters };
      temp[filterName] = value;
      setFilters(temp);
    }
  };

  const handleActions = ({ action, delete_id, editItem }) => {
    if (action === "delete") {
      toggleDeleteModal();
      setItemToDelete(delete_id);
    }
    if (action === "edit") {
      const state = {
        type: editItem?.coupon_type,
        isEdit: true,
        editId: editItem?.id,
      };
      navigate("/add-edit-discount", { state: state });
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
      {pageLoader && <PageLoader />}
      <>
        <FilterSection
          filterFields={filterFields}
          handleFilterChange={handleFilterChange}
          filters={filters}
        >
          <CommonButton
            text="Add New Coupon"
            onClick={toggleDiscountTypeSection}
            className="orange_btn"
          />
        </FilterSection>
        <TableWrapper
          columns={DISCOUNTS_COLUMNS}
          onCheckboxChange={(e) => {
            selectAllItems(e, discounts);
          }}
          checked={discounts?.length === selectedDiscount?.length}
        >
          {discounts?.length ? (
            discounts?.map((it, idx) => (
              <SingleDiscountRow
                item={it}
                key={idx}
                handleActions={handleActions}
                selectedDiscount={selectedDiscount}
                handleSelectedDiscount={handleSelectedDiscount}
              />
            ))
          ) : (
            <NoDataFound />
          )}
        </TableWrapper>
      </>

      <Pagination
        onPageChange={onPageChange}
        itemsPerPage={ITEMS_PER_PAGE}
        totalData={totalData}
        currentPage={page}
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
