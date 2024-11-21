import React, { useEffect, useState } from "react";
import FilterSection from "../Components/Common/FilterSection";
import { DEFAULT_ERROR_MESSAGE, ITEMS_PER_PAGE, OPTIONS } from "../constant";
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
import { successType, toastMessage } from "../utils/toastMessage";
import { deleteItemBasedOnId } from "../utils/helpers";
import PageLoader from "../loaders/PageLoader";
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
  "Categories",
  "Prep Time",
  "Cook Time",
  "Serving Size",
  "Status",
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
  const [deleteLoader, setDeleteLoader] = useState(false);

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

  const handleActions = ({ action, id }) => {
    if (action === "delete") {
      setItemToDelete(id);
      toggleDeleteModal();
    } else if (action === "edit") {
      navigate(`/add-edit-recipe/${id}`);
    } else {
      // this is for print/view
    }
  };

  const deleteRecipe = () => {
    setDeleteLoader((prev) => true);
    makeApiRequest({
      endPoint: RECIPE_ENDPOINT,
      method: METHODS?.delete,
      delete_id: itemToDelete,
    })
      .then((res) => {
        console.log(itemToDelete);
        toastMessage("Recipe deleted successfully", successType);
        setTodos(deleteItemBasedOnId(recipes, itemToDelete)); //itemTo delete contains the id
      })
      .catch((err) => {
        toastMessage(err?.response?.data?.error || DEFAULT_ERROR_MESSAGE);
      })
      .finally((res) => {
        toggleDeleteModal();
        toggleLoader("buttonLoader");
        setDeleteLoader((prev) => false);
      });
  };
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
              text="Categories"
              className="grey_btn"
              onClick={() => navigate("/categories")}
            />
            <CommonButton
              text="Add New Recipe"
              className="orange_btn"
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
                  isRecipe={true}
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
          {showDeleteModal && (
            <DeleteConfirmationModal
              title="Are you sure you want to delete this recipe?"
              description="This action cannot be redo. Deleting this recipe will permanently remove it from your inventory"
              onCancel={() => {
                setItemToDelete(null);
                toggleDeleteModal();
              }}
              onDelete={deleteRecipe}
              loader={deleteLoader}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Recipe;
