import React, { useEffect, useState } from "react";
import usePagination from "../hooks/usePagination";
import { INSTANCE, makeApiRequest, METHODS } from "../api/apiFunctions";
import useLoader from "../hooks/useLoader";
import { GET_INVENTORY_ENDPOINT, INVENTORY_ENDPOINT } from "../api/endpoints";
import FilterSection from "../Components/Common/FilterSection";
import CommonButton from "../Components/Common/CommonButton";
import {
  DEFAULT_ERROR_MESSAGE,
  DUMMY_INVENTORY_DATA,
  INVENTORY_PAGE_COLUMNS,
  ITEMS_PER_PAGE,
  SORT_BY_OPTIONS,
  YYYY_MM_DD
} from "../constant";
import NoDataFound from "../Components/Common/NoDataFound";
import TableWrapper from "../Wrappers/TableWrapper";
import Pagination from "../Components/Common/Pagination";
import SingleInventoryRow from "../Components/SingleInventoryRow";
import useModalToggle from "../hooks/useModalToggle";
import { useForm } from "react-hook-form";
import AddEditInventory from "../Components/Common/AddEditInventory";
import { formatDate, handleEdit,combineBarcode,deleteItemBasedOnId } from "../utils/helpers";
import { successType, toastMessage } from "../utils/toastMessage";
import DeleteConfirmationModal from "../Modals/DeleteConfirmationModal";
// For now this is static so follow comments when API will be created for this
const filterFields = [
  {
    type: "select",
    defaultOption: "Sort by",
    options: SORT_BY_OPTIONS,
    filterName: "action",
  },
  {
    type: "search",
    filterName: "name",
    placeholder: "Search Inventory",
  },
];

const InventoryManagement = () => {
  const formConfig = useForm();
  const { reset } = formConfig;
  const { page, onPageChange, setPage } = usePagination();
  const { loader, toggleLoader } = useLoader();
  const { showModal: showInventorySection, toggleModal: toggleInventory } =
    useModalToggle();
    const { showModal: showDeleteModal, toggleModal: toggleDeleteModal } =
    useModalToggle();
  const [inventories, setInventories] = useState([]);
  const [totalData, setTotalData] = useState(null);
  const [editInfo, setEditInfo] = useState({
    isEdit: false,
    editItem: null,
  });
  const [deleteLoader, setDeleteLoader] = useState(false);
  const [btnLoaders, setbtnLoaders] = useState({
    inventory: false,
    print: false,
  });
  const [itemToDelete, setItemToDelete] = useState();
  const [filters, setFilters] = useState({
    sort_by: "",
    name: "",
  });
  useEffect(() => {
    toggleLoader("pageLoader");
    const apiParams = {
      ...filters,
      page: page,
    };
    setInventories(DUMMY_INVENTORY_DATA);
    // makeApiRequest({
    //   // update required: Update with the actual endpoint
    //   endPoint: GET_INVENTORY_ENDPOINT,
    //   params: apiParams,
    //   method: METHODS.get,
    // })
    //   .then((res) => {
    //     setInventories(res?.data?.results);
    //     setTotalData(res?.data?.count);
    //   })
    //   .catch((err) => console.log(err))
    //   .finally(() => {
    //     toggleLoader("pageLoader");
    //   });
  }, [page, filters]);

  console.log(inventories,'skdfjklsjfksdjfskldafj');

  const handleFilterChange = (filterName, value) => {
    const temp = { ...filters };
    temp[filterName] = value;
    setFilters(temp);
  };

  const handleActions = ({ action, deleteId, editItem, viewItem }) => {
    if (action === "edit") {
      setEditInfo({
        isEdit: true,
        item: editItem,
      });
      toggleInventory();
    } else {
      // for delete
      setItemToDelete(deleteId);
      toggleDeleteModal();
    }
  };


  const handleInventorySection = ({ action }) => {
    if (action === "open") {
      toggleInventory();
    } else if (action === "close") {
      toggleInventory();
      setPage(1);
      reset();
    }
  };

  const handleInventoryCancel = () => {
    toggleInventory();
    setEditInfo({ isEdit: false, item: null });
    reset(); // for resetting form values
  };

  const onSubmit = (values,event) => {
    console.log(values,'valeussdsf')
    const buttonType = event.nativeEvent.submitter.name; //contains publish and draft
    handleButtonLoaders(buttonType);
    const payload = {
      ...values,
      // barcode_no: combineBarcode(values.barcode_no,values.barcode_to),
      status: "in_stock",
      // barcode_from: +values?.barcode_from, // for converting barcode_from type from string into number
      // barcode_to: +values?.barcode_to, // for converting barcode_to type from string into number
    };

    // makeApiRequest({
    //   endPoint: INVENTORY_ENDPOINT,
    //   payload: payload,
    //   method: editInfo?.isEdit ? METHODS?.patch : METHODS.post,
    //   update_id: editInfo?.isEdit && editInfo?.item?.id,
    // })
    //   .then((res) => {
    //     toastMessage(
    //       `Inventory ${editInfo?.isEdit ? "updated" : "added"} successfully`,
    //       successType
    //     );
    //     if (editInfo?.isEdit) {
    //       setInventories(
    //         handleEdit(inventories, editInfo?.item?.id, res?.data)
    //       );
    //     } else {
    //       setInventories((prev) => [...prev, res?.data]);
    //     }
    //     setbtnLoaders({ publish: false, draft: false });
    //     handleInventoryCancel();
    //     setPage(1);
    //   })
    //   .catch((err) => {
    // toastMessage(err?.response?.data?.name?.[0] || DEFAULT_ERROR_MESSAGE);
    //     if (!err?.response?.data?.name?.[0]) {
    //       handleInventoryCancel();
    //       setPage(1);
    //     }
    //   })
    //   .finally(setbtnLoaders({ publish: false, draft: false }));

    toastMessage(
      `Inventory ${editInfo?.isEdit ? "updated" : "added"} successfully`,
      successType
    );
    if (editInfo?.isEdit) {
      setInventories(
        handleEdit(inventories, editInfo?.item?.id, payload)
      );
    } else {
      setInventories((prev) => [...prev, payload]);
    }
    setbtnLoaders({ inventory: false, print: false });
    handleInventoryCancel();
    setPage(1);
  };

  const handleButtonLoaders = (type) => {
    setbtnLoaders({ ...btnLoaders, [type]: !btnLoaders[type] });
  };

  const deleteInventory = () => {
    // setDeleteLoader((prev) => true);
    // makeApiRequest({
    //   endPoint: INVENTORY_ENDPOINT,
    //   method: METHODS?.delete,
    //   instanceType: INSTANCE.authorized,
    //   delete_id: itemToDelete,
    // })
    //   .then((res) => {
    //     toastMessage("Inventory deleted successfully", successType);
    //     setInventories(deleteItemBasedOnId(inventories, itemToDelete));
    //   })
    //   .catch((err) => {
    //     toastMessage(err?.response?.data?.error || DEFAULT_ERROR_MESSAGE);
    //   })
    //   .finally((res) => {
    //     toggleDeleteModal();
    //     setDeleteLoader((prev) => false);
    //   });
    toastMessage("Inventory deleted successfully", successType);
    setInventories(deleteItemBasedOnId(inventories, itemToDelete));
    toggleDeleteModal();
  };

  return (
    <div>
      {" "}
      <FilterSection
        filterFields={filterFields}
        handleFilterChange={handleFilterChange}
      >
        <CommonButton
          text="Add Inventory"
          className="orange_btn"
          onClick={() => {
            handleInventorySection({ action: "open" });
          }}
        />
      </FilterSection>
      <TableWrapper columns={INVENTORY_PAGE_COLUMNS}>
        {inventories?.length ? (
          inventories?.map((it, idx) => (
            <SingleInventoryRow
              key={idx}
              item={it}
              currentPage={page}
              index={idx}
              handleActions={handleActions}
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
      {showInventorySection && (
        <AddEditInventory
          formConfig={formConfig}
          // onClose={() => {
          //   handleInventorySection({ action: "close" });
          // }}
          onClose={handleInventoryCancel}
          editInfo={editInfo}
          onSubmit={onSubmit}
        />
      )}
      {showDeleteModal && (
            <DeleteConfirmationModal
              title="Are you sure you want to delete this inventory?"
              description="This action cannot be redo."
              onCancel={() => {
                setItemToDelete(null);
                toggleDeleteModal();
              }}
              loader={deleteLoader}
              onDelete={deleteInventory}
            />
          )}
    </div>
  );
};

export default InventoryManagement;
