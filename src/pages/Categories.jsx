import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { INSTANCE, makeApiRequest, METHODS } from "../api/apiFunctions";
import { CATEGORIES_ENDPOINT } from "../api/endpoints";
import { successType, toastMessage } from "../utils/toastMessage";
import {
  CATEGORIES_ITEMS_PER_PAGE,
  DEFAULT_ERROR_MESSAGE,
  OPTIONS,
} from "../constant";
import useLoader from "../hooks/useLoader";
import usePagination from "../hooks/usePagination";
import TableComponent from "../Components/Common/TableComponent";
import TableWrapper from "../Wrappers/TableWrapper";
import NoDataFound from "../Components/Common/NoDataFound";
import SingleCategoryRow from "../Components/Common/SingleCategoryRow";
import useModalToggle from "../hooks/useModalToggle";
import DeleteConfirmationModal from "../Modals/DeleteConfirmationModal";
import { trashIcon } from "../assets/Icons/Svg";
import Pagination from "../Components/Common/Pagination";
import { deleteItemBasedOnId, handleEdit } from "../utils/helpers";
import FilterSection from "../Components/Common/FilterSection";
import CommonButton from "../Components/Common/CommonButton";
import AddEditCategorySection from "../Components/AddEditCategorySection";
const CATEGORY_PAGE_COLUMNS = [
  "", // for image section
  "Name",
  "Slug",
  "Description",
  "Parent Category",
  "Actions",
  // this extra space is for the hamburger menu ,
  // "",
];
const DEFAULT_CATEGORY_VALUES = {
  name: "",
  description: "",
  parent_category: "",
  image: "",
};

const filterFields = [
  {
    type: "select",
    defaultOption: "All",
    options: OPTIONS,
    filterName: "type",
  },
  {
    type: "select",
    defaultOption: "Select Action",
    options: OPTIONS,
    filterName: "action",
  },
  {
    type: "search",
    filterName: "name",
    placeholder: "Search Category",
  },
];

const Categories = () => {
  const formConfig = useForm({
    defaultValues: DEFAULT_CATEGORY_VALUES,
  });
  const { reset,setValue } = formConfig;
  const [filters, setFilters] = useState({
    type: "",
    action: "",
    name: "",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [categories, setCategories] = useState([]);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [totalData, setTotalData] = useState();
  const [editCategoryInfo, setEditCategoryInfo] = useState({
    isEdit: false,
    editItem: null,
  });
  const { buttonLoader, pageLoader, toggleLoader } = useLoader();
  // for delete confirmation modal
  const { showModal, toggleModal } = useModalToggle();
  const { page, onPageChange, setPage } = usePagination();
  // for add and edit category modal
  const categoryModal = useModalToggle();

  useEffect(() => {
    toggleLoader("pageLoader");
    const apiFilters = {
      ...filters,
      page: page,
    };
    makeApiRequest({
      endPoint: CATEGORIES_ENDPOINT,
      method: METHODS.get,
      params: apiFilters,
      instanceType: INSTANCE.authorized,
    })
      .then((res) => {
        setTotalData(res?.data?.count);
        setCategories(res?.data?.results);
      })
      .catch((err) => {
        toastMessage(err?.response?.data?.error || DEFAULT_ERROR_MESSAGE);
      })
      .finally(() => toggleLoader("pageLoader"));
  }, [filters, page]);

  const handleActions = ({ action, editItem, deleteId }) => {
    if (action === "edit") {
      categoryModal?.toggleModal();
      setEditCategoryInfo({ isEdit: true, item: editItem });
    } else {
      // delete action
      setItemToDelete(deleteId);
      toggleModal();
    }
  };

  const handleDeleteCategory = () => {
    makeApiRequest({
      endPoint: CATEGORIES_ENDPOINT,
      method: METHODS.delete,
      instanceType: INSTANCE.authorized,
      delete_id: itemToDelete,
    })
      .then((res) => {
        setCategories(deleteItemBasedOnId(categories, itemToDelete));
        // or  setCategories((prev)=>prev?.filter((el) => el.id! == itemToDelete))
        toastMessage("Category Deleted Successfully", successType);
      })
      .catch((err) => {
        toastMessage(err?.response?.data?.error || DEFAULT_ERROR_MESSAGE);
      })
      .finally(() => {
        toggleLoader("buttonLoader");
        toggleModal();
        setItemToDelete(null);
      });
  };

  const handleFilterChange = (filterName, value) => {
    const temp = { ...filters };
    temp[filterName] = value;
    setFilters(temp);
  };

  const handleCategoryModal = ({ action }) => {
    if (action === "open") {
      categoryModal?.toggleModal();
    } else if (action === "close") {
      reset();
      setEditCategoryInfo({ isEdit: false, item: null });
      setItemToDelete(null);
      setImagePreview(null);
      setPage(1);
      categoryModal?.toggleModal();
      setValue("category_image", null);
    }
  };

  const handleAddEditCategory = (values, event) => {
    const { isEdit, item } = editCategoryInfo;
    const buttonType = event.nativeEvent.submitter.name;

    toggleLoader("buttonLoader");
    const payload = {
      ...values,
      is_active: buttonType === "publish",
      //update required:  comment this and fix image issue
      category_image: null,
      // category_image: imagePreview,
    };
    delete payload.image;

    // converting payload into form data
    const formData = new FormData();

    for (let key in payload) {
      formData.append(key, payload[key]);
    }

    for (let [key, value] of formData.entries()) {
      console.log(key, value, "form values");
    }
    console.log(payload, " log payload");

    makeApiRequest({
      endPoint: CATEGORIES_ENDPOINT,
      method: isEdit ? METHODS?.patch : METHODS?.post,
      update_id: isEdit && item?.id,
      payload: formData,
      instanceType: INSTANCE.formInstance,
      // payload: payload,
    })
      .then((res) => {
        if (isEdit) {
          setCategories(handleEdit(categories, item?.id, res?.data)); //array , id to update , data to update
        } else {
          setCategories((prev) => [...prev, res?.data]);
        }
        toastMessage(
          `Category ${isEdit ? "updated" : "added"} successfully`,
          successType
        );
      })
      .catch((err) => {
        toastMessage(err?.response?.data?.error || DEFAULT_ERROR_MESSAGE);
      })
      .finally(() => {
        handleCategoryModal({ action: "close" });
        reset();
      });
  };

  return (
    <>
      <FilterSection
        filterFields={filterFields}
        handleFilterChange={handleFilterChange}
      >
        <CommonButton
          text="Add Category"
          // may be need to change this action from here to somewhere else
          onClick={() => {
            handleCategoryModal({ action: "open" });
          }}
          type="button"
          className="buttonTwo"
        />
      </FilterSection>
      <TableWrapper columns={CATEGORY_PAGE_COLUMNS}>
        {categories?.length ? (
          categories?.map((it, idx) => (
            <SingleCategoryRow
              key={idx}
              item={it}
              currentPage={page}
              index={idx}
              handleActions={handleActions}
            />
          ))
        ) : (
          // updates required:Create a better no data found component
          <NoDataFound />
        )}
      </TableWrapper>

      <Pagination
        onPageChange={onPageChange}
        itemsPerPage={CATEGORIES_ITEMS_PER_PAGE}
        totalData={totalData}
      />
      {showModal && (
        <DeleteConfirmationModal
          icon={trashIcon}
          title="Are you sure you want to delete this category?"
          description="This action cannot be redo. Deleting this category will permanently remove it from your inventory"
          onCancel={() => {
            setItemToDelete(null);
            toggleModal();
          }}
          onDelete={handleDeleteCategory}
          disabled={buttonLoader}
        />
      )}

      {categoryModal?.showModal && (
        <AddEditCategorySection
          onClose={() => handleCategoryModal({ action: "close" })}
          onSubmit={handleAddEditCategory}
          formConfig={formConfig}
          imagePreview={imagePreview}
          setImagePreview={setImagePreview}
          editCategoryInfo={editCategoryInfo}
        />
      )}
    </>
  );
};

export default Categories;
