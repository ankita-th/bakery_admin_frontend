import React, { useEffect, useState } from "react";
import { INSTANCE, makeApiRequest, METHODS } from "../api/apiFunctions";
import { RAW_MATERIAL_ENDPOINT } from "../api/endpoints";
import usePagination from "../hooks/usePagination";
import useLoader from "../hooks/useLoader";
import { successType, toastMessage } from "../utils/toastMessage";
import {
  DEFAULT_ERROR_MESSAGE,
  OPTIONS,
  RAW_MATERIALS_ITEMS_PER_PAGE,
  YYYY_MM_DD,
} from "../constant";
import TableWrapper from "../Wrappers/TableWrapper";
import NoDataFound from "../Components/Common/NoDataFound";
import SingleRawMaterialRow from "../Components/SingleRawMaterialRow";
import useModalToggle from "../hooks/useModalToggle";
import DeleteConfirmationModal from "../Modals/DeleteConfirmationModal";
import { deleteItemBasedOnId, formatDate, handleEdit } from "../utils/helpers";
import { trashIcon } from "../assets/Icons/Svg";
import Pagination from "../Components/Common/Pagination";
import AddEditRawMaterial from "../Components/AddEditRawMaterial";
import { useForm } from "react-hook-form";
import FilterSection from "../Components/Common/FilterSection";
import CommonButton from "../Components/Common/CommonButton";
const RAW_MATERIAL_COLUMNS = [
  "",
  "ID",
  "Name",
  "Qty in Stock",
  "Reorder Level",
  "Expiration Date",
  "Last Updated",
  "Notes",
  "Action",
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
    type: "search",
    filterName: "name",
    placeholder: "Search Category",
  },
];

const dummyData = [
  {
    name: "Flour",
    id: 1,
    quantity: "150Kg",
    reorder: 50,
    expiration_date: "2024-12-01",
    last_updated: "2024-12-01",
    notes: "High quality wheat",
  },
  {
    id: 2,
    name: "Sugar",
    quantity: "150Kg",
    reorder: 50,
    expiration_date: "2024-12-01",
    last_updated: "2024-12-01",
    notes: "High quality wheat",
  },
  {
    id: 3,
    name: "Yeast",
    quantity: "150Kg",
    reorder: 50,
    expiration_date: "2024-12-01",
    last_updated: "2024-12-01",
    notes: "High quality wheat",
  },
];

const RawMaterials = () => {
  const formConfig = useForm();
  const { reset } = formConfig;
  const { showModal: showDeleteModal, toggleModal: toggleDeleteModal } =
    useModalToggle();
  //   for the section coming from side for adding and updating raw materials
  const {
    showModal: showRawMaterialSection,
    toggleModal: toggleRawMaterialSection,
  } = useModalToggle();

  const { buttonLoader, pageLoader, toggleLoader } = useLoader();
  const { page, onPageChange, setPage } = usePagination();
  const [filters, setFilters] = useState({
    type: "",
    category: "",
    name: "",
  });
  const [editInfo, setEditInfo] = useState({
    isEdit: false,
    item: null,
  });
  const [rawMaterials, setRawMaterials] = useState([]);
  const [totalData, setTotalData] = useState(null);
  const [itemToDelete, setItemToDelete] = useState();

  useEffect(() => {
    toggleLoader("pageLoader");
    const apiFilters = {
      ...filters,
      page: page,
    };
    // setRawMaterials(dummyData);

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
        toastMessage(err?.response?.data?.error || DEFAULT_ERROR_MESSAGE);
      })
      .finally(() => {
        toggleLoader("pageLoader");
      });
  }, [filters, page]);

  const handleActions = ({ action, deleteId, editItem }) => {
    if (action === "view") {
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
    toggleLoader("buttonLoader");

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
        toggleLoader("buttonLoader");
      });
  };

  const handleFilterChange = (filterName, value) => {
    const temp = { ...filters };
    temp[filterName] = value;
    setFilters(temp);
  };

  const handleRawMaterialCancel = () => {
    toggleRawMaterialSection();
    setEditInfo({ isEdit: false, item: null });
    reset(); // for resetting form values
  };

  const handleAddEditRawMaterial = (values, event) => {
    const buttonType = event.nativeEvent.submitter.name;

    console.log(values, "these are form values");
    toggleLoader("buttonLoader");
    const payload = {
      ...values,
      quantity: +values?.quantity, // for converting quantity type from string into number
      reorder: +values?.reorder, // for converting quantity type from string into number
      is_active: buttonType === "draft",
      expiry_date: formatDate(values?.expiry_date, YYYY_MM_DD),
    };
    console.log(payload, "this is payload");

    makeApiRequest({
      endPoint: RAW_MATERIAL_ENDPOINT,
      payload: payload,
      method: editInfo?.isEdit ? METHODS?.patch : METHODS.post,
      update_id: editInfo?.isEdit && editInfo?.item?.id,
    })
      .then((res) => {
        console.log(res,"res inside raw material")
        toastMessage(
          `Raw material ${editInfo?.isEdit ? "updated" : "added"} successfully`,
          successType
        );
        if (editInfo?.isEdit) {
          setRawMaterials(handleEdit(rawMaterials, editInfo?.item?.id, res?.data));
        } else {
           setRawMaterials((prev) => [...prev,res?.data])
        }
      })
      .catch((err) => {
        toastMessage(err?.response?.data?.error || DEFAULT_ERROR_MESSAGE);
      })
      .finally(() => {
        toggleLoader("buttonLoader");
        handleRawMaterialCancel();
        setPage(1);
      });
  };
  return (
    <>
      <FilterSection
        filterFields={filterFields}
        handleFilterChange={handleFilterChange}
      >
        <CommonButton
          text="Add Raw Product"
          className="buttonTwo"
          onClick={toggleRawMaterialSection}
        />
      </FilterSection>
      <TableWrapper columns={RAW_MATERIAL_COLUMNS}>
        {rawMaterials?.length ? (
          rawMaterials?.map((it, idx) => (
            <SingleRawMaterialRow
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
        itemsPerPage={RAW_MATERIALS_ITEMS_PER_PAGE}
        totalData={totalData}
      />

      {showDeleteModal && (
        <DeleteConfirmationModal
          icon={trashIcon}
          title="Are you sure you want to delete this raw material?"
          description="This action cannot be redo. Deleting this product will permanently remove it from your inventory"
          onCancel={() => {
            setItemToDelete(null);
            toggleDeleteModal();
          }}
          onDelete={deleteRawMaterial}
        />
      )}

      {showRawMaterialSection && (
        <AddEditRawMaterial
          formConfig={formConfig}
          onClose={handleRawMaterialCancel}
          onSubmit={handleAddEditRawMaterial}
          editInfo={editInfo}
        />
      )}
    </>
  );
};

export default RawMaterials;
