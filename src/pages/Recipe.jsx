import React, { useEffect, useState } from "react";
import FilterSection from "../Components/Common/FilterSection";
import {
  ACTIONS,
  DEFAULT_ERROR_MESSAGE,
  ITEMS_PER_PAGE,
  TYPE_OPTIONS,
} from "../constant";
import CommonButton from "../Components/Common/CommonButton";
import { useNavigate } from "react-router-dom";
import usePagination from "../hooks/usePagination";
import useLoader from "../hooks/useLoader";
import { bulkActionRecipe, makeApiRequest, METHODS } from "../api/apiFunctions";
import { PRINT_RECIPE_ENDPOINT, RECIPE_ENDPOINT } from "../api/endpoints";
import Pagination from "../Components/Common/Pagination";
import TableWrapper from "../Wrappers/TableWrapper";
import NoDataFound from "../Components/Common/NoDataFound";
import useModalToggle from "../hooks/useModalToggle";
import DeleteConfirmationModal from "../Modals/DeleteConfirmationModal";
import SingleRecipeRow from "../Components/SingleRecipeRow";
import { successType, toastMessage } from "../utils/toastMessage";
import {
  actionToText,
  deleteItemBasedOnId,
  downloadPDF,
  handleBulkMessage,
  handlePrint,
} from "../utils/helpers";
import PageLoader from "../loaders/PageLoader";
import { T } from "../utils/languageTranslator";
import useSelectedItems from "../hooks/useSelectedItems";
import PrintModal from "../Modals/PrintModal";
const filterFields = [
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
    filterName: "search",
    placeholder: T["search_recipe"],
  },
];
const RECIPE_COLUMNS = [
  "checkbox",
  T["recipe_name"],
  T["categories"],
  T["prep_time"],
  T["cook_time"],
  T["serving_size"],
  T["status"],
  T["action"],
];

const Recipe = () => {
  const navigate = useNavigate();
  const { page, onPageChange, setPage } = usePagination();
  const { buttonLoader, pageLoader, toggleLoader, setPageLoader } = useLoader();
  const { showModal: showDeleteModal, toggleModal: toggleDeleteModal } =
    useModalToggle();
  const {
    selectedItems: selectedRecipes,
    setSelectedItems: setSelectedRecipes,
    handleSelectItems: handleSelectRecipe,
    selectAllItems: selectAllRecipes,
  } = useSelectedItems();

  const [filters, setFilters] = useState({
    status: "",
    action: "",
    search: "",
  });
  const [recipes, setRecipes] = useState([]);
  const [totalData, setTotalData] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [deleteLoader, setDeleteLoader] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [printLoaders, setPrintLoaders] = useState({
    print: false,
    download: false,
  });
  const [recipeId, setRecipeId] = useState(null);

  useEffect(() => {
    const apiParams = {
      ...filters,
      page: page,
    };
    fetchRecipes(apiParams);
  }, [page, filters]);
  // commented for future use
  // }, [filters, page]);

  const handleFilterChange = (filterName, value) => {
    if (filterName === "action") {
      if (selectedRecipes?.length) {
        const payload = {
          recipes: [...selectedRecipes],
          status: value,
        };
        setPageLoader((prev) => true);
        bulkActionRecipe(payload)
          .then(() => {
            // setFilters({ ...filters, action: "" })
            toastMessage(
              `Recipes ${actionToText[value]} successfully`,
              successType
            );
          })
          .catch((err) => {
            console.log();
            toastMessage(err?.response?.data?.error || DEFAULT_ERROR_MESSAGE);
          })
          .finally(() => {
            setPageLoader((prev) => false);
            setFilters({ ...filters, action: "" });
            setSelectedRecipes([]);
          });
      } else {
        toastMessage(handleBulkMessage("Recipe"));
      }
    } else {
      const temp = { ...filters };
      temp[filterName] = value;
      setFilters(temp);
    }
  };
  const fetchRecipes = (apiParams) => {
    setPageLoader((prev) => true);
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
      .finally(() => setPageLoader((prev) => false));
  };

  const handleActions = ({ action, id }) => {
    if (action === "delete") {
      setItemToDelete(id);
      toggleDeleteModal();
    } else if (action === "edit") {
      navigate(`/add-edit-recipe/${id}`);
    } else {
      // this is for print/view
      setRecipeId(id);
      setShowPrintModal(true);
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
        toastMessage("Recipe deleted successfully", successType);
        setRecipes(deleteItemBasedOnId(recipes, itemToDelete)); //itemTo delete contains the id
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
  console.log(selectedRecipes, "selectedRecipes");
  const onRecipeSubmit = (data, event) => {
    const buttonType = event.nativeEvent.submitter.name;
    handlePrintLoaders(buttonType);
    const payload = {
      serving_size: data?.quantity,
    };
    // downloadPDF("https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf","dummyPdf");
    // handlePrint("https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf");

    makeApiRequest({
      endPoint: `${PRINT_RECIPE_ENDPOINT}/${recipeId}/`,
      method: METHODS?.post,
      payload: payload,
    })
      .then((res) => {
        console.log(res?.data, "this is print");
        if (buttonType === "download") {
          downloadPDF(res?.data);
        } else {
          handlePrint(res?.data);
        }
      })
      .catch((err) => {
        toastMessage(err?.response?.data || DEFAULT_ERROR_MESSAGE);
      })
      .finally(() => {
        handlePrintLoaders(buttonType);
        setRecipeId(null);
        setShowPrintModal(false);
      });
  };
  const handlePrintLoaders = (buttonType) => {
    setPrintLoaders((prev) => ({
      ...prev,
      [buttonType]: !prev[buttonType],
    }));
  };
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
        <TableWrapper
          columns={RECIPE_COLUMNS}
          onCheckboxChange={(e) => {
            selectAllRecipes(e, recipes);
          }}
          checked={
            recipes?.length && recipes?.length === selectedRecipes?.length
          }
        >
          {recipes?.length ? (
            recipes?.map((it, idx) => (
              <SingleRecipeRow
                key={idx}
                item={it}
                index={idx}
                currentPage={page}
                handleActions={handleActions}
                isRecipe={true}
                selectedRecipes={selectedRecipes}
                handleSelectRecipe={handleSelectRecipe}
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
        {showPrintModal && (
          <PrintModal
            onCancel={() => {
              setShowPrintModal(false);
              setRecipeId(null);
            }}
            onRecipeSubmit={onRecipeSubmit}
            printLoaders={printLoaders}
          />
        )}
      </>
    </div>
  );
};

export default Recipe;
