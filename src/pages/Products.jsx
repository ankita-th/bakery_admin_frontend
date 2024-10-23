import React, { useEffect, useState } from "react";
import CommonSelectField from "../Form Fields/CommonSelectField";
import { useForm } from "react-hook-form";
import FilterSection from "../Components/Common/FilterSection";
import { deleteProduct, getProducts } from "../api/apiFunctions";
import usePagination from "../hooks/usePagination";
import Pagination from "../Components/Common/Pagination";
import { DUMMY_PRODUCT_DATA, PRODUCTS_ITEMS_PER_PAGE } from "../constant";
import CommonButton from "../Components/Common/CommonButton";
import TableComponent from "../Components/Common/TableComponent";
import useModalToggle from "../hooks/useModalToggle";
import DeleteConfirmationModal from "../Modals/DeleteConfirmationModal";
import { trashIcon } from "../assets/Icons/Svg";
import { successType, toastMessage } from "../utils/toastMessage";
import "react-toastify/dist/ReactToastify.css";
import useLoader from "../hooks/useLoader";
import PageLoader from "../loaders/PageLoader";
import SingleProductRow from "../Components/SingleproductTableRow";
import NoDataFound from "../Components/Common/NoDataFound";
import { useNavigate } from "react-router-dom";

const OPTIONS = [
  { value: "Option1", label: "Option1" },
  { value: "Option2", label: "Option2" },
  { value: "Option3", label: "Option3" },
];

const DUMMY_COLUMNS = [
  { label: "S.no", key: "projectName" },
  { label: "Name", key: "name" },
  { label: "SKU", key: "sku" },
  { label: "Stock", key: "status" },
  { label: "Price", key: "" },
  { label: "Category", key: "category" },
  { label: "Date", key: "" },
  { label: "Action", key: "projectStatus" },
];
const PRODUCT_PAGE_COLUMNS = [
  "S.no",
  "Name",
  "SKU",
  "Stock",
  "Price",
  "Category",
  "Date",
  "Action",
  // this extra space is for view ,edit  and delete actions button they do not have any column headings
  "",
];
const filterFields = [
  {
    type: "select",
    defaultOption: "All",
    options: OPTIONS,
    filterName: "type",
  },
  {
    type: "select",
    defaultOption: "Select Category",
    options: OPTIONS,
    filterName: "category",
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
    placeholder: "Search Product",
  },
];
const Products = () => {
  // only one of the below will be used depending on the API response
  const navigate = useNavigate();
  const { page, onPageChange } = usePagination();
  const { showModal, toggleModal } = useModalToggle();
  const { loader, toggleLoader } = useLoader();
  const [products, setProducts] = useState([]);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [totalData, setTotalData] = useState();
  const [filters, setFilters] = useState({
    type: "",
    category: "",
    action: "",
    name: "",
  });

  useEffect(() => {
    const apiFilters = {
      ...filters,
      page: page,
    };
    toggleLoader();
    // update required: remove this dummy data and according to the API data
    setProducts(DUMMY_PRODUCT_DATA);
    getProducts(apiFilters)
      .then((res) => {
        console.log(res?.data, "this is response");
        // update res?.data accordingly and totalPages and totalData logic
        setProducts(res?.data?.results);
        setTotalData(res?.data?.count);
      })
      .catch((err) => console.log(err))
      .finally(() => toggleLoader());
  }, [filters, page]);

  const handleFilterChange = (filterName, value) => {
    const temp = { ...filters };
    temp[filterName] = value;
    setFilters(temp);
  };
  const handleCategoryClick = () => {};

  const handleAddNewProductClick = () => {};
  const handleDeleteProduct = () => {
    // update required: comment from here and use the APi one
    toastMessage("Product deleted successfully", successType);
    toggleModal();

    deleteProduct(itemToDelete)
      .then((res) => {
        toastMessage("Product deleted successfully", successType);
        toggleModal();
      })
      .catch((err) => console.log(err));
  };
  // for managing view , edit and delete buttons inside single row
  // in case of delete the id will be the deleteItemId and in case of edit the id of the item to edit
  const handleActions = (action, id) => {
    if (action === "view") {
    } else if (action === "edit") {
      // update required: make the route name better
      navigate("/add-edit-product", { state: id });
    } else if (action === "delete") {
      toggleModal();
      setItemToDelete(id);
    }
  };
  console.log(itemToDelete, "itemToDelete");

  return (
    <>
      {/* update required : depending on the css of the loader make sure we have to show other data or not */}
      {loader && <PageLoader />}
      <div>
        <FilterSection
          filterFields={filterFields}
          handleFilterChange={handleFilterChange}
        >
          <CommonButton
            text="Categories"
            onClick={() => navigate("/categories")}
            type="button"
            className="buttonOne"
          />
          <CommonButton
            text="Add New Product"
            onClick={() => navigate("/add-edit-product")}
            type="button"
            className="buttonTwo"
          />
        </FilterSection>
        {/* product listing */}
        <TableComponent columns={PRODUCT_PAGE_COLUMNS}>
          {products?.length ? (
            products?.map((dt, idx) => (
              <SingleProductRow
                key={idx}
                data={dt}
                currentPage={page}
                index={idx}
                handleActions={handleActions}
              />
            ))
          ) : (
            // updates required:Create a better no data found component
            <NoDataFound />
          )}
        </TableComponent>

        <Pagination
          onPageChange={onPageChange}
          itemsPerPage={PRODUCTS_ITEMS_PER_PAGE}
          totalData={totalData}
        />
      </div>
      {showModal && (
        <DeleteConfirmationModal
          icon={trashIcon}
          title="Are you sure you want to delete this product?"
          description="This action cannot be redo. Deleting this product will permanently remove it from your inventory, and it will no longer be available for purchase."
          onCancel={() => {
            setItemToDelete(null);
            toggleModal();
          }}
          onDelete={handleDeleteProduct}
        />
      )}
    </>
  );
};

export default Products;
