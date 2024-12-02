import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { INSTANCE, makeApiRequest, METHODS } from "../api/apiFunctions";
import { CATEGORIES_ENDPOINT, SUBCATEGORY_ENDPOINT } from "../api/endpoints";
import { successType, toastMessage } from "../utils/toastMessage";
import {
  ACTIONS,
  DEFAULT_ERROR_MESSAGE,
  ITEMS_PER_PAGE,
  OPTIONS,
  TYPE_OPTIONS,
} from "../constant";
import useLoader from "../hooks/useLoader";
import usePagination from "../hooks/usePagination";
import TableWrapper from "../Wrappers/TableWrapper";
import NoDataFound from "../Components/Common/NoDataFound";
import SingleCategoryRow from "../Components/Common/SingleCategoryRow";
import useModalToggle from "../hooks/useModalToggle";
import DeleteConfirmationModal from "../Modals/DeleteConfirmationModal";
import Pagination from "../Components/Common/Pagination";
import { deleteItemBasedOnId, handleEdit } from "../utils/helpers";
import FilterSection from "../Components/Common/FilterSection";
import CommonButton from "../Components/Common/CommonButton";
import AddEditCategorySection from "../Components/AddEditCategorySection";
import PageLoader from "../loaders/PageLoader";
const CATEGORY_PAGE_COLUMNS = [
  "checkbox",
  "", // for image section
  "Name",
  "Slug",
  "Description",
  // "Parent Category",
  "Product Count",
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
    defaultOption: "select_type",
    options: TYPE_OPTIONS,
    filterName: "type",
  },
  {
    type: "select",
    defaultOption: "Select Action",
    options: ACTIONS,
    filterName: "action",
  },
  {
    type: "search",
    filterName: "name",
    placeholder: "Search Categories",
  },
];

const Categories = () => {
  const formConfig = useForm({
    defaultValues: DEFAULT_CATEGORY_VALUES,
  });
  const { reset, setValue } = formConfig;
  const [filters, setFilters] = useState({
    type: "",
    action: "",
    name: "",
  });
  const [file, setFile] = useState({
    file: null,
    preview: "",
    error: "",
  });
  const [categories, setCategories] = useState([]);
  const [itemToDelete, setItemToDelete] = useState({
    id: null,
    type: "", // for checking whether to delete category or subcategory
  });
  const [totalData, setTotalData] = useState();
  const [editCategoryInfo, setEditCategoryInfo] = useState({
    isEdit: false,
    editItem: null,
    type: "", // for managing whether to edit category or subcategory
  });
  const [btnLoaders, setBtnLoaders] = useState({
    publish: false,
    draft: false,
  });
  const [deleteLoader, setDeleteLoader] = useState(false);
  const { pageLoader, toggleLoader } = useLoader();
  // for delete confirmation modal
  const { showModal, toggleModal } = useModalToggle();
  const { page, onPageChange, setPage } = usePagination();
  // for add and edit category modal
  const categoryModal = useModalToggle();

  useEffect(() => {
    fetchData();
  }, [page]);
  // commented for future use
  // }, [filters, page]);

  const fetchData = () => {
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
        console.log(err);
      })
      .finally(() => toggleLoader("pageLoader"));
  };

  const handleActions = ({ action, editItem, deleteId, type }) => {
    if (action === "edit") {
      categoryModal?.toggleModal();
      setEditCategoryInfo({ isEdit: true, item: editItem, type: type });
    } else if (action === "delete") {
      setItemToDelete({ id: deleteId, type: type });
      toggleModal();
    }
  };

  const handleDeleteCategory = () => {
    setDeleteLoader((prev) => true);
    makeApiRequest({
      endPoint:
        itemToDelete.type === "category"
          ? CATEGORIES_ENDPOINT
          : SUBCATEGORY_ENDPOINT,

      method: METHODS.delete,
      instanceType: INSTANCE.authorized,
      delete_id: itemToDelete?.id,
    })
      .then((res) => {
        if (res.status === 204) {
          toastMessage(
            `${
              itemToDelete.type === "category" ? "Category" : "Subcategory"
            } Deleted Successfully`,
            successType
          );
          fetchData();
          // Update the categories or subcategories
        } else {
          throw new Error("Unexpected response");
        }
      })
      .catch((err) => {
        toastMessage(err?.response?.data?.error || DEFAULT_ERROR_MESSAGE);
      })
      .finally(() => {
        setDeleteLoader((prev) => false);
        toggleModal();
        setItemToDelete({ id: null, type: "" });
        setPage(1);
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
      setEditCategoryInfo({ isEdit: false, item: null, type: "" });
      setItemToDelete({ id: null, type: "" });
      setFile({ preview: "", file: null, error: "" });
      setPage(1);
      categoryModal?.toggleModal();
      setValue("category_image", null);
    }
  };

  const handleAddEditCategory = (values, event) => {
    // if (file?.error) {
    //   return;
    // }
    const { isEdit, item, type } = editCategoryInfo;
    const buttonType = event.nativeEvent.submitter.name;

    handleButtonLoaders(buttonType);
    // const payload = {
    //   ...values,
    //   is_active: buttonType === "publish",
    // };
    const payload = {
      name: values.name,
      slug: values.slug,
      description: values.description,
      is_active: buttonType === "publish",
    };
    delete payload.image;
    // converting payload into form data
    const formData = new FormData();

    for (let key in payload) {
      formData.append(key, payload[key]);
    }
    // appending file
    if (file?.file) {
      formData.append("category_image", file.file);
    }
    if (values?.parent) {
      formData.append("parent", values.parent?.value);
    }

    const data = Object.fromEntries(formData.entries()); // Convert to object
    const isSubCategory = values?.parent;
    makeApiRequest({
      endPoint: manageApiEndpoint(),
      method: isEdit ? METHODS?.patch : METHODS?.post,
      update_id: isEdit && item?.id,
      payload: formData,
      instanceType: INSTANCE.formInstance,
      // payload: payload,
    })
      .then((res) => {
        toastMessage(
          `${
            isSubCategory
              ? "Subcategory"
              : type === "subcategory"
              ? "Subcategory"
              : "Category"
          } ${isEdit ? "updated" : "added"} sucessfully`,
          successType
        );
        fetchData();
        setBtnLoaders({ publish: false, draft: false });
        handleCategoryModal({ action: "close" });
        reset();
        setFile(null);
      })
      .catch((err) => {
        const fieldError =
          err?.response?.data?.name?.[0] || err?.response?.data?.slug?.[0];
        console.log(fieldError);
        if (fieldError) {
          toastMessage(fieldError);
        } else {
          toastMessage(handleCategoryErrorToast(err));
          fetchData();
          handleCategoryModal({ action: "close" });
          reset();
          setFile(null);
        }
        setBtnLoaders({ publish: false, draft: false });
      });
  };

  const handleCategoryErrorToast = (err) => {
    if (err?.response?.data?.name?.[0]) {
      return err?.response?.data?.name?.[0];
    } else if (err?.response?.data?.slug?.[0]) {
      return err?.response?.data?.slug?.[0];
    } else {
      return DEFAULT_ERROR_MESSAGE;
    }
  };
  const handleButtonLoaders = (type) => {
    setBtnLoaders({ ...btnLoaders, [type]: !btnLoaders[type] });
  };

  const manageApiEndpoint = () => {
    if (editCategoryInfo?.isEdit) {
      if (editCategoryInfo?.type === "category") {
        return CATEGORIES_ENDPOINT;
      } else {
        return SUBCATEGORY_ENDPOINT;
      }
    } else {
      return CATEGORIES_ENDPOINT;
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
          >
            <CommonButton
              text="Add Category/SubCategory"
              // may be need to change this action from here to somewhere else
              onClick={() => {
                handleCategoryModal({ action: "open" });
              }}
              type="button"
              className="orange_btn"
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
                  // for image upload
                  // setFile={setFile}
                  // file={file}
                />
              ))
            ) : (
              // updates required:Create a better no data found component
              <NoDataFound />
            )}
          </TableWrapper>

          <Pagination
            onPageChange={onPageChange}
            itemsPerPage={ITEMS_PER_PAGE}
            totalData={totalData}
            currentPage={page}
          />
          {showModal && (
            <DeleteConfirmationModal
              title={`Are you sure you want to delete this ${
                itemToDelete?.type === "category" ? "Category" : "Subcategory"
              }?`}
              description={`This action cannot be redo. Deleting this  ${
                itemToDelete?.type === "category" ? "Category" : "Subcategory"
              } will permanently remove it from your inventory`}
              onCancel={() => {
                setItemToDelete({ id: null, type: "" });
                toggleModal();
              }}
              onDelete={handleDeleteCategory}
              loader={deleteLoader}
            />
          )}

          {categoryModal?.showModal && (
            <AddEditCategorySection
              onClose={() => handleCategoryModal({ action: "close" })}
              onSubmit={handleAddEditCategory}
              formConfig={formConfig}
              file={file}
              setFile={setFile}
              editCategoryInfo={editCategoryInfo}
              btnLoaders={btnLoaders}
              categories={categories}
            />
          )}
        </>
      )}
    </>
  );
};

export default Categories;
