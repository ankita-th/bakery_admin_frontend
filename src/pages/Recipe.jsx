import React, { useEffect, useState } from "react";
import FilterSection from "../Components/Common/FilterSection";
import {
  DEFAULT_ERROR_MESSAGE,
  OPTIONS,
  RECIPE_ITEMS_PER_PAGE,
} from "../constant";
import CommonButton from "../Components/Common/CommonButton";
import { useNavigate } from "react-router-dom";
import usePagination from "../hooks/usePagination";
import useLoader from "../hooks/useLoader";
import { makeApiRequest, METHODS } from "../api/apiFunctions";
import { RECIPE_ENDPOINT } from "../api/endpoints";
import Pagination from "../Components/Common/Pagination";
import TableWrapper from "../Wrappers/TableWrapper";
import NoDataFound from "../Components/Common/NoDataFound";
import useModalToggle from "../hooks/useModalToggle";
import DeleteConfirmationModal from "../Modals/DeleteConfirmationModal";
import SingleRecipeRow from "../Components/SingleRecipeRow";
import { successType } from "../utils/toastMessage";
import { deleteItemBasedOnId } from "../utils/helpers";
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
    placeholder: "Search recipe",
  },
];
const RECIPE_COLUMNS = [
  "",
  "Recipe Name",
  "Category",
  "Prep Time",
  "Cook Time",
  "Serving Size",
  "Serving Size",
  "Actions",
];

const Recipe = () => {
  const navigate = useNavigate();
  const { page, onPageChange, setPage } = usePagination();
  const { buttonLoader, pageLoader, toggleLoader } = useLoader();
  const { showModal: showDeleteModal, toggleModal: toggleDeleteModal } =
    useModalToggle();

  const [filters, setFilters] = useState({
    type: "",
    action: "",
    name: "",
  });
  const [recipes, setRecipes] = useState([]);
  const [totalData, setTotalData] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);

  useEffect(() => {
    toggleLoader("pageLoader");
    const apiParams = {
      ...filters,
      page: page,
    };
    makeApiRequest({
      endPoint: RECIPE_ENDPOINT,
      method: METHODS?.get,
      params: apiParams,
    })
      .then((res) => {
        setRecipes(res?.data?.results);
        setTotalData(res?.data?.count);
      })
      .catch((err) => console.log(err))
      .finally(() => toggleLoader("pageLoader"));
  }, [filters, page]);

  const handleFilterChange = (filterName, value) => {
    const temp = { ...filters };
    temp[filterName] = value;
    setFilters(temp);
  };
  const handleActions = ({ action, delete_id }) => {
    if (action === "delete") {
      setItemToDelete(delete_id);
      toggleDeleteModal();
    }
  };

  const deleteRecipe = () => {
    toggleLoader("buttonLoader");
    makeApiRequest({
      endPoint: RECIPE_ENDPOINT,
      method: METHODS?.delete,
      delete_id: itemToDelete,
    })
      .then((res) => {
        toastMessage("Recipe deleted successfully", successType);
        setTodos(deleteItemBasedOnId(recipes, itemToDelete)); //itemTo delete contains the id
      })
      .catch((err) => {
        toastMessage(err?.response?.data?.error || DEFAULT_ERROR_MESSAGE);
      })
      .finally((res) => {
        toggleDeleteModal();
        toggleLoader("buttonLoader");
      });
  };
  return (
    <div>
      <FilterSection
        filterFields={filterFields}
        handleFilterChange={handleFilterChange}
      >
        <CommonButton
          text="Categories"
          className="buttonOne"
          onClick={() => navigate("/categories")}
        />
        <CommonButton
          text="Add New Recipe"
          className="buttonTwo"
          onClick={() => navigate("/add-edit-recipe")}
        />
      </FilterSection>
      <TableWrapper columns={RECIPE_COLUMNS}>
        {recipes?.length ? (
          recipes?.map((it, idx) => (
            <SingleRecipeRow
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
        itemsPerPage={RECIPE_ITEMS_PER_PAGE}
        totalData={totalData}
      />
      {showDeleteModal && (
        <DeleteConfirmationModal
          title="Are you sure you want to delete this recipe?"
          description="This action cannot be redo. Deleting this recipe will permanently remove it from your inventory"
          onCancel={() => {
            setItemToDelete(null);
            toggleDeleteModal();
          }}
          onDelete={deleteRecipe}
        />
      )}
    </div>
  );
};

export default Recipe;
