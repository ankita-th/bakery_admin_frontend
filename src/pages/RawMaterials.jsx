import React, { useEffect, useState } from "react";
import {
  bulkActionMaterial,
  INSTANCE,
  makeApiRequest,
  METHODS,
} from "../api/apiFunctions";
import { RAW_MATERIAL_ENDPOINT } from "../api/endpoints";
import usePagination from "../hooks/usePagination";
import useLoader from "../hooks/useLoader";
import { successType, toastMessage } from "../utils/toastMessage";
import {
  ACTIONS,
  DEFAULT_ERROR_MESSAGE,
  ITEMS_PER_PAGE,
  TYPE_OPTIONS,
  YYYY_MM_DD,
} from "../constant";
import TableWrapper from "../Wrappers/TableWrapper";
import NoDataFound from "../Components/Common/NoDataFound";
import SingleRawMaterialRow from "../Components/SingleRawMaterialRow";
import useModalToggle from "../hooks/useModalToggle";
import DeleteConfirmationModal from "../Modals/DeleteConfirmationModal";
import {
  actionToText,
  deleteItemBasedOnId,
  formatDate,
  handleBulkMessage,
  handleEdit,
} from "../utils/helpers";
import Pagination from "../Components/Common/Pagination";
import AddEditRawMaterial from "../Components/AddEditRawMaterial";
import { useForm } from "react-hook-form";
import FilterSection from "../Components/Common/FilterSection";
import CommonButton from "../Components/Common/CommonButton";
import PageLoader from "../loaders/PageLoader";
import ViewRawMaterials from "../Components/ViewRawMaterials";
import { T } from "../utils/languageTranslator";
import useSelectedItems from "../hooks/useSelectedItems";
const RAW_MATERIAL_COLUMNS = [
  "checkbox",
  T["id"],
  T["name"],
  T["qty_in_stock"],
  T["reorder_level"],
  T["expiration_date"],
  T["last_updated"],
  T["notes"],
  T["action"],
];
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
    placeholder: T["search_materials"],
  },
];

const RawMaterials = () => {
  const formConfig = useForm();
  const { reset, watch } = formConfig;
  const { showModal: showDeleteModal, toggleModal: toggleDeleteModal } =
    useModalToggle();
  //   for the section coming from side for adding and updating raw materials
  const {
    showModal: showRawMaterialSection,
    toggleModal: toggleRawMaterialSection,
  } = useModalToggle();
  const {
    selectedItems: selectedMaterials,
    setSelectedItems: setSelectedMaterials,
    handleSelectItems: handleSelectMaterials,
    selectAllItems,
  } = useSelectedItems();

  const { pageLoader, toggleLoader, setPageLoader } = useLoader();
  const { page, onPageChange, setPage } = usePagination();
  const [filters, setFilters] = useState({
    status: "all",
    category: "",
    search: "",
  });
  const [editInfo, setEditInfo] = useState({
    isEdit: false,
    item: null,
  });
  const [rawMaterials, setRawMaterials] = useState([]);
  const [totalData, setTotalData] = useState(null);
  const [itemToDelete, setItemToDelete] = useState();
  const [deleteLoader, setDeleteLoader] = useState(false);
  const [btnLoaders, setbtnLoaders] = useState({
    publish: false,
    draft: false,
  });
  const [viewInfo, setViewInfo] = useState({ show: false, item: null });

  useEffect(() => {
    const apiFilters = {
      ...filters,
      page: page,
    };
    fetchRawMaterials(apiFilters);
  }, [page, filters]);
  // commented for future use
  // }, [filters, page]);
  const fetchRawMaterials = (apiFilters) => {
    setPageLoader((prev) => true);
    makeApiRequest({
      endPoint: RAW_MATERIAL_ENDPOINT,
      method: METHODS.get,
      params: apiFilters,
      instanceType: INSTANCE?.authorized,
    })
      .then((res) => {
        const response = res?.data;
        setTotalData(response?.count);
        setRawMaterials(response?.results);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setPageLoader((prev) => false);
      });
  };

  const handleActions = ({ action, deleteId, editItem, viewItem }) => {
    if (action === "view") {
      setViewInfo({ show: true, item: viewItem });
    } else if (action === "edit") {
      setEditInfo({
        isEdit: true,
        item: editItem,
      });
      toggleRawMaterialSection();
    } else {
      // for delete
      setItemToDelete(deleteId);
      toggleDeleteModal();
    }
  };

  const deleteRawMaterial = () => {
    setDeleteLoader((prev) => true);
    makeApiRequest({
      endPoint: RAW_MATERIAL_ENDPOINT,
      method: METHODS?.delete,
      instanceType: INSTANCE.authorized,
      delete_id: itemToDelete,
    })
      .then((res) => {
        toastMessage("Raw material deleted successfully", successType);
        setRawMaterials(deleteItemBasedOnId(rawMaterials, itemToDelete));
      })
      .catch((err) => {
        toastMessage(err?.response?.data?.error || DEFAULT_ERROR_MESSAGE);
      })
      .finally((res) => {
        toggleDeleteModal();
        setDeleteLoader((prev) => false);
      });
  };

  const handleFilterChange = (filterName, value) => {
    if (filterName === "action") {
      if (selectedMaterials?.length) {
        const payload = {
          product_material_ids: [...selectedMaterials],
          status: value,
        };
        bulkActionMaterial(payload)
          .then((res) => {
            toastMessage(
              `Raw materials ${actionToText[value]} successfully`,
              successType
            );
            // no need to call the api below as the filters will change api will get called automatically
            // fetchRawMaterials({ page: page });
          })
          .catch((err) => {
            toastMessage(err?.response?.data?.error || DEFAULT_ERROR_MESSAGE);
            setPage(1);
          })
          .finally(() => {
            // toggleLoader("pageLoader");
            // setPageLoader((prev) => false);
            setFilters({ ...filters, action: "" });
            setSelectedMaterials([]);
          });
      } else {
        toastMessage(handleBulkMessage("Raw product"));
      }
    } else {
      const temp = { ...filters };
      temp[filterName] = value;
      setFilters(temp);
    }
  };

  const handleRawMaterialCancel = () => {
    toggleRawMaterialSection();
    setEditInfo({ isEdit: false, item: null });
    reset(); // for resetting form values
    setViewInfo({ show: false, item: null });
  };

  const handleAddEditRawMaterial = (values, event) => {
    const buttonType = event.nativeEvent.submitter.name; //contains publish and draft
    handleButtonLoaders(buttonType);
    const payload = {
      ...values,
      quantity: +values?.quantity, // for converting quantity type from string into number
      reorder: +values?.reorder, // for converting quantity type from string into number
      is_active: buttonType === "publish",
      expiry_date: formatDate(values?.expiry_date, YYYY_MM_DD),
    };

    makeApiRequest({
      endPoint: RAW_MATERIAL_ENDPOINT,
      payload: payload,
      method: editInfo?.isEdit ? METHODS?.patch : METHODS.post,
      update_id: editInfo?.isEdit && editInfo?.item?.id,
    })
      .then((res) => {
        toastMessage(
          `Raw product ${editInfo?.isEdit ? "updated" : "added"} successfully`,
          successType
        );
        if (editInfo?.isEdit) {
          setRawMaterials(
            handleEdit(rawMaterials, editInfo?.item?.id, res?.data)
          );
        } else {
          setRawMaterials((prev) => [...prev, res?.data]);
        }
        setbtnLoaders({ publish: false, draft: false });
        handleRawMaterialCancel();
        setPage(1);
      })
      .catch((err) => {
        toastMessage(err?.response?.data?.name?.[0] || DEFAULT_ERROR_MESSAGE);
        if (!err?.response?.data?.name?.[0]) {
          handleRawMaterialCancel();
          setPage(1);
        }
      })
      .finally(() => {
        setbtnLoaders({ publish: false, draft: false });
      });
  };
  // for managing loaders for  publish and draft buttons
  const handleButtonLoaders = (type) => {
    setbtnLoaders({ ...btnLoaders, [type]: !btnLoaders[type] });
  };
  return (
    <>
      {pageLoader && <PageLoader />}
      <FilterSection
        filterFields={filterFields}
        handleFilterChange={handleFilterChange}
        filters={filters}
      >
        <CommonButton
          text="Add Raw Product"
          className="orange_btn"
          onClick={toggleRawMaterialSection}
        />
      </FilterSection>
      <TableWrapper
        columns={RAW_MATERIAL_COLUMNS}
        onCheckboxChange={(e) => {
          selectAllItems(e, rawMaterials);
        }}
        checked={
          rawMaterials?.length &&
          rawMaterials?.length === selectedMaterials?.length
        }
      >
        {rawMaterials?.length ? (
          rawMaterials?.map((it, idx) => (
            <SingleRawMaterialRow
              key={idx}
              item={it}
              index={idx}
              currentPage={page}
              handleActions={handleActions}
              selectedMaterials={selectedMaterials}
              handleSelectMaterials={handleSelectMaterials}
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
          title="Are you sure you want to delete this raw product?"
          description="This action cannot be redo. Deleting this raw material will permanently remove it from your inventory"
          onCancel={() => {
            setItemToDelete(null);
            toggleDeleteModal();
          }}
          loader={deleteLoader}
          onDelete={deleteRawMaterial}
        />
      )}

      {showRawMaterialSection && (
        <AddEditRawMaterial
          formConfig={formConfig}
          onClose={handleRawMaterialCancel}
          onSubmit={handleAddEditRawMaterial}
          editInfo={editInfo}
          btnLoaders={btnLoaders}
        />
      )}
      {viewInfo?.show && (
        <ViewRawMaterials
          item={viewInfo?.item}
          onClose={() => {
            setViewInfo({ show: false, item: null });
            reset();
          }}
          formConfig={formConfig}
        />
      )}
    </>
  );
};

export default RawMaterials;
