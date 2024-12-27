import React, { useEffect, useState } from "react";
import usePagination from "../hooks/usePagination";
import { INSTANCE, makeApiRequest, METHODS } from "../api/apiFunctions";
import useLoader from "../hooks/useLoader";
import {
  GET_INVENTORY_ENDPOINT,
  INVENTORY_ENDPOINT,
  UPDATE_STOCK_ENDPOINT,
} from "../api/endpoints";
import FilterSection from "../Components/Common/FilterSection";
import CommonButton from "../Components/Common/CommonButton";
import {
  DEFAULT_ERROR_MESSAGE,
  DUMMY_INVENTORY_DATA,
  INVENTORY_PAGE_COLUMNS,
  ITEMS_PER_PAGE,
  SORT_BY_OPTIONS,
  YYYY_MM_DD,
} from "../constant";
import NoDataFound from "../Components/Common/NoDataFound";
import TableWrapper from "../Wrappers/TableWrapper";
import Pagination from "../Components/Common/Pagination";
import SingleInventoryRow from "../Components/SingleInventoryRow";
import useModalToggle from "../hooks/useModalToggle";
import { useForm } from "react-hook-form";
import AddEditInventory from "../Components/Common/AddEditInventory";
import {
  formatDate,
  handleEdit,
  combineBarcode,
  deleteItemBasedOnId,
} from "../utils/helpers";
import { successType, toastMessage } from "../utils/toastMessage";
import DeleteConfirmationModal from "../Modals/DeleteConfirmationModal";
import { T } from "../utils/languageTranslator";
import PageLoader from "../loaders/PageLoader";
// For now this is static so follow comments when API will be created for this
const filterFields = [
  {
    type: "select",
    defaultOption: T["sort_by"],
    options: SORT_BY_OPTIONS,
    filterName: "action",
  },
  {
    type: "search",
    filterName: "search",
    placeholder: T["search_inventory"],
  },
];

const InventoryManagement = () => {
  const formConfig = useForm();
  const { reset } = formConfig;
  const { page, onPageChange, setPage } = usePagination();
  const { pageLoader, toggleLoader, setPageLoader } = useLoader();
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
    search: "",
  });
  useEffect(() => {
    fetchInventory();
  }, [page, filters]);
  // console.log(inventories, "inventories");

  const fetchInventory = () => {
    setPageLoader((prev) => true);
    const apiParams = {
      ...filters,
      page: page,
    };
    makeApiRequest({
      endPoint: GET_INVENTORY_ENDPOINT,
      params: apiParams,
      method: METHODS.get,
    })
      .then((res) => {
        setInventories(res?.data?.results);
        setTotalData(res?.data?.count);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setPageLoader((prev) => false);
      });
  };

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

  const onSubmit = (values, event) => {
    const buttonType = event.nativeEvent.submitter.name; //contains invenory and print
    const itemStatus = editInfo?.item?.status;
    console.log(buttonType, "buttonType");
    handleButtonLoaders(buttonType);
    console.log(values?.quantity, "values?.quantity");
    const payload = {
      name: values?.name,
      sku: values?.sku,
      quantity: +values?.quantity,
      start_from: +values?.barcode_from,
      end_from: +values?.barcode_to,
    status: itemStatus,
    };

    makeApiRequest({
      endPoint: UPDATE_STOCK_ENDPOINT,
      payload: payload,
      method: METHODS?.put,
      // update_id: editInfo?.isEdit && editInfo?.item?.id,
    })
      .then((res) => {
        toastMessage(`Stocks added successfully`, successType);
        handleInventoryCancel();
        // setPage(1);
        fetchInventory();

        // commented for future use
        // toastMessage(
        //   `Inventory ${editInfo?.isEdit ? "updated" : "added"} successfully`,
        //   successType
        // );
        // if (editInfo?.isEdit) {
        //   setInventories(handleEdit(inventories, editInfo?.item?.id, res?.data));
        // } else {
        //   setInventories((prev) => [...prev, res?.data]);
        // }
      })
      .catch((err) => {
        toastMessage(err?.response?.data?.name?.[0] || DEFAULT_ERROR_MESSAGE);
        if (!err?.response?.data?.name?.[0]) {
          handleInventoryCancel();
          setPage(1);
        }
      })
      .finally(() => {
        setbtnLoaders({ inventory: false, print: false });
      });
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
      {pageLoader && <PageLoader />}{" "}
      <FilterSection
        filterFields={filterFields}
        handleFilterChange={handleFilterChange}
        filters={filters}
      >
        {/* <CommonButton
          text="Add Inventory"
          className="orange_btn"
          onClick={() => {
            handleInventorySection({ action: "open" });
          }}
        /> */}
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
        currentPage={page}
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
          btnLoaders={btnLoaders}
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
