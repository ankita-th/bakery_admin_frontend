import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useLoader from "../hooks/useLoader";
import usePagination from "../hooks/usePagination";
import { makeApiRequest, METHODS } from "../api/apiFunctions";
import { CONFIGURATION_ENDPOINT } from "../api/endpoints";
import Pagination from "../Components/Common/Pagination";
import {
  CONFIGURATION_ITEMS_PER_PAGE,
  DEFAULT_ERROR_MESSAGE,
} from "../constant";
import FilterSection from "../Components/Common/FilterSection";
import CommonButton from "../Components/Common/CommonButton";
import useModalToggle from "../hooks/useModalToggle";
import AddEditConfiguration from "../Components/AddEditConfiguration";
import {
  deleteItemBasedOnId,
  handleEdit,
  returnAddressInfo,
} from "../utils/helpers";
import { successType, toastMessage } from "../utils/toastMessage";
import TableWrapper from "../Wrappers/TableWrapper";
import NoDataFound from "../Components/Common/NoDataFound";
import SingleConfigurationRow from "../Components/SingleConfigurationRow";
import DeleteConfirmationModal from "../Modals/DeleteConfirmationModal";
import { trashIcon } from "../assets/Icons/Svg";
import PageLoader from "../loaders/PageLoader";
const filterFields = [
  {
    type: "search",
    filterName: "name",
    placeholder: "Search Configuration",
  },
];

const CONFIGURATION_COLUMNS = [
  "S.No",
  "ZIP Code",
  "Area/Location Name",
  "Min. Order Quantity",
  "Availability",
  "Delivery Threshold",
  "Action",
];
const ZipConfiguration = () => {
  const formConfig = useForm();
  const { reset } = formConfig;
  const { page, onPageChange, setPage } = usePagination();
  const { pageLoader, toggleLoader } = useLoader();
  const {
    toggleModal: toggleConfiguration,
    showModal: showConfigurationSection,
  } = useModalToggle();

  const { toggleModal: toggleDeleteModal, showModal: showDeleteModal } =
    useModalToggle();

  const [filters, setFilters] = useState({});
  const [configurations, setConfigurations] = useState([]);
  const [totalData, setTotalData] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [editInfo, setEditInfo] = useState({
    isEdit: false,
    editItem: null,
  });
  const [deleteLoader, setDeleteLoader] = useState(false);
  const [btnLoaders, setBtnLoaders] = useState({
    publish: false,
    draft: false,
  });
  useEffect(() => {
    toggleLoader("pageLoader");
    const apiParams = {
      ...filters,
      page: page,
    };
    makeApiRequest({
      endPoint: CONFIGURATION_ENDPOINT,
      params: apiParams,
      method: METHODS?.get,
    })
      .then((res) => {
        setTotalData(res?.data?.count);
        setConfigurations(res?.data?.results);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        toggleLoader("pageLoader");
      });
  }, [page, filters]);

  //  to open from add config, edit and close
  const handleConfigurationSection = ({ action }) => {
    if (action === "open") {
      toggleConfiguration();
    } else if (action === "close") {
      reset();
      toggleConfiguration();
      setEditInfo({
        isEdit: false,
        editItem: null,
      });
    }
  };

  const handleFilterChange = (filterName, value) => {
    const temp = { ...filters };
    temp[filterName] = value;
    setFilters(temp);
  };

  const onSubmit = (data, event) => {
    toggleLoader("buttonLoader");
    const buttonType = event.nativeEvent.submitter.name;
    setBtnLoaders({ ...btnLoaders, [buttonType]: !btnLoaders[buttonType] });
    const { isEdit, editItem } = editInfo;
    // for extracting state , city and country from address
    // const { state, city, country } = returnAddressInfo(
    //   data?.address?.address_components
    // );
    const payload = {
      ...data,
      delivery_availability: data?.delivery_availability?.value,
      min_order_quantity: +data?.min_order_quantity,
      delivery_threshold: +data?.delivery_threshold,
      city: data?.city?.formatted_address,
      address: data?.address?.formatted_address,
      state: data?.state?.value,
    };

    makeApiRequest({
      endPoint: CONFIGURATION_ENDPOINT,
      method: isEdit ? METHODS?.patch : METHODS?.post,
      payload: payload,
      update_id: isEdit && editItem?.id,
    })
      .then((res) => {
        toastMessage(
          `Zip configuration ${isEdit ? "updated" : "created"} successfully`,
          successType
        );
        if (isEdit) {
          setConfigurations(
            handleEdit(configurations, editItem?.id, res?.data)
          );
        } else {
          setConfigurations((prev) => [...prev, res?.data]);
        }
      })
      .catch((err) => {
        console.log(err?.response?.data?.zip_code?.[0], "configuration error");
        toastMessage(
          err?.response?.data?.zip_code?.[0] || DEFAULT_ERROR_MESSAGE
        );
      })
      .finally(() => {
        handleConfigurationSection({ action: "close" });
        setBtnLoaders({ publish: false, draft: false });
        setPage(1);
      });
  };

  const handleActions = ({ action, delete_id, editItem }) => {
    if (action === "delete") {
      setItemToDelete(delete_id);
      toggleDeleteModal();
    } else if (action === "edit") {
      setEditInfo({ isEdit: true, editItem: editItem });
      toggleConfiguration();
    }
  };

  const deleteConfiguration = () => {
    setDeleteLoader((prev) => true);
    makeApiRequest({
      endPoint: "/zip/configurations/",
      method: METHODS.delete,
      delete_id: itemToDelete,
    })
      .then((res) => {
        setConfigurations(deleteItemBasedOnId(configurations, itemToDelete));
        toastMessage("Zip configuration deleted successfully", successType);
      })
      .catch((err) => {
        toastMessage(DEFAULT_ERROR_MESSAGE);
      })
      .finally(() => {
        toggleDeleteModal();
        setItemToDelete(null);
        setDeleteLoader((prev) => false);
      });
  };
  console.log(configurations, "configurations");
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
              text="Add Configuration"
              className="orange_btn"
              onClick={() => {
                handleConfigurationSection({ action: "open" });
              }}
            />
          </FilterSection>{" "}
          <TableWrapper columns={CONFIGURATION_COLUMNS}>
            {configurations?.length ? (
              configurations?.map((it, idx) => (
                <SingleConfigurationRow
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
            itemsPerPage={CONFIGURATION_ITEMS_PER_PAGE}
            totalData={totalData}
          />
          {showConfigurationSection && (
            <AddEditConfiguration
              formConfig={formConfig}
              onSubmit={onSubmit}
              editInfo={editInfo}
              onClose={() => {
                handleConfigurationSection({ action: "close" });
              }}
              btnLoaders={btnLoaders}
            />
          )}
          {showDeleteModal && (
            <DeleteConfirmationModal
              title="Are you sure you want to delete this ZIP configuration?"
              description="This action cannot be redo. Deleting this ZIP configuration will permanently remove it from your inventory"
              onCancel={() => {
                setItemToDelete(null);
                toggleDeleteModal();
              }}
              onDelete={deleteConfiguration}
              loader={deleteLoader}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ZipConfiguration;
