import React, { useEffect, useState } from "react";
import usePagination from "../hooks/usePagination";
import { useForm } from "react-hook-form";
import FilterSection from "../Components/Common/FilterSection";
import useLoader from "../hooks/useLoader";
import { makeApiRequest, METHODS } from "../api/apiFunctions";
import {
  EMPLOYEE_ENDPOINT,
  EMPLOYEE_MANAGEMENT_ENDPOINT,
} from "../api/endpoints";
import CommonButton from "../Components/Common/CommonButton";
import {
  DEFAULT_ERROR_MESSAGE,
  DUMMY_EMPLOYEE_DATA,
  DUMMY_TODO_DATA,
  EMPLOYEE_ID_ERROR,
  EMPLOYEE_SORT_BY_OPTIONS,
  ITEMS_PER_PAGE,
  SORT_BY_OPTIONS,
} from "../constant";
import useModalToggle from "../hooks/useModalToggle";
import TableWrapper from "../Wrappers/TableWrapper";
import SingleEmployeeRow from "../Components/SingleEmployeeRow";
import NoDataFound from "../Components/Common/NoDataFound";
import DeleteConfirmationModal from "../Modals/DeleteConfirmationModal";
import { successType, toastMessage } from "../utils/toastMessage";
import AddEditEmployee from "../Components/AddEditEmployee";
import { deleteItemBasedOnId, handleEdit } from "../utils/helpers";
import Pagination from "../Components/Common/Pagination";
const filterFields = [
  {
    type: "select",
    defaultOption: "Sort by",
    options: EMPLOYEE_SORT_BY_OPTIONS,
    filterName: "sort_by",
  },
  {
    type: "search",
    filterName: "name",
    placeholder: "Search Employee",
  },
];
const EMPLOYEE_COLUMNS = [
  "ID",
  "Name",
  "Role",
  "Email",
  "Phone Number",
  "Shift",
  "Status",
  "Action",
];

const EmployeeManagement = () => {
  // for now this is page is static update the required points after api is created
  const { page, onPageChange, setPage } = usePagination();
  const { pageLoader, toggleLoader } = useLoader();
  const formConfig = useForm();
  const { reset, watch } = formConfig;
  const { showModal: showEmployeeSection, toggleModal: toggleEmployeeSection } =
    useModalToggle();
  const { showModal: showDeleteModal, toggleModal: toggleDeleteModal } =
    useModalToggle();
  const [employees, setEmployees] = useState([]);
  const [editInfo, setEditInfo] = useState({
    isEdit: false,
    editItem: null,
  });
  const [totalData, setTotalData] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [filters, setFilters] = useState({
    sort_by: "",
    name: "",
  });
  // make it a single state for loaders
  const [deleteLoader, setDeleteLoader] = useState(false);
  const [buttonLoader, setButtonLoader] = useState(false);

  useEffect(() => {
    toggleLoader("pageLoader");
    const apiParams = {
      ...filters,
      page: page,
    };
    makeApiRequest({
      endPoint: EMPLOYEE_MANAGEMENT_ENDPOINT,
      params: apiParams,
      method: METHODS.get,
    })
      .then((res) => {
        setEmployees(res?.data?.results);
        setTotalData(res?.data?.count);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        toggleLoader("pageLoader");
      });
  }, [page, filters]);

  const handleFilterChange = (filterName, value) => {
    const temp = { ...filters };
    temp[filterName] = value;
    setFilters(temp);
  };

  const handleActions = ({ action, deleteId, editItem }) => {
    if (action === "edit") {
      setEditInfo({
        isEdit: true,
        editItem: editItem,
      });
      toggleEmployeeSection();
    } else {
      setItemToDelete(deleteId);
      toggleDeleteModal();
    }
  };

  const handleEmployeeSection = ({ action }) => {
    if (action === "open") {
      toggleEmployeeSection();
    } else {
      // for close
      toggleEmployeeSection();
      setEditInfo({
        isEdit: false,
        editItem: null,
      });
      setButtonLoader((prev) => false);
      reset();
    }
  };
  const deleteEmployee = () => {
    // manage delete modal loader here
    setDeleteLoader((prev) => true);
    makeApiRequest({
      endPoint: EMPLOYEE_ENDPOINT,
      method: METHODS.delete,
      delete_id: itemToDelete,
    })
      .then((res) => {
        toastMessage("Employee Deleted Successfully", successType);
        deleteItemBasedOnId(employees,itemToDelete);
      })
      .catch((err) => {
        toastMessage(err?.response?.data?.error || DEFAULT_ERROR_MESSAGE);
      })
      .finally(() => {
        setDeleteLoader((prev) => false);
        toggleDeleteModal();
        setItemToDelete(null);
      });
  };

  const handleEmployeeCancel = () => {
    toggleEmployeeSection();
    setEditInfo({ isEdit: false, item: null });
    reset(); // for resetting form values
  };
  const onSubmit = (values) => {
    console.log(values, "these are values");
    setButtonLoader((prev) => true);
    // const buttonType = event.nativeEvent.submitter.name; //contains publish and draft
    // handleButtonLoaders(buttonType);
    const payload = {
      email: values.email,
      role: values.role,
      first_name: values.first_name,
      last_name: values.last_name,
      employee_detail: {
        employee_id: values.employee_id,
        address: values.address?.formatted_address || values.address,
        city: values.city.formatted_address || values?.city,
        state: values.state,
        country: "SE",
        // state: "CA",
        // country: "US",
        zip_code: values.zip_code,
        contact_no: values.contact_no,
        hiring_date: values.hiring_date,
        shift: values.shift,
      },
    };

    makeApiRequest({
      endPoint: EMPLOYEE_MANAGEMENT_ENDPOINT,
      payload: payload,
      method: editInfo?.isEdit ? METHODS?.patch : METHODS.post,
      update_id: editInfo?.isEdit && editInfo?.editItem?.id,
    })
      .then((res) => {
        toastMessage(
          `Employee ${editInfo?.isEdit ? "updated" : "added"} successfully`,
          successType
        );
        if (editInfo?.isEdit) {
          setEmployees(
            handleEdit(employees, editInfo?.editItem?.id, res?.data)
          );
        } else {
          setEmployees((prev) => [...prev, res?.data]);
        }
        handleEmployeeCancel();
        setPage(1);
      })
      .catch((err) => {
        console.log(err, "this is error");
        const fieldError =
          err?.response?.data?.message?.name?.[0] ||
          err?.response?.data?.message?.email?.[0] ||
          (err?.response?.data?.error === EMPLOYEE_ID_ERROR &&
            err?.response?.data?.error);

        toastMessage(fieldError || DEFAULT_ERROR_MESSAGE);
        if (!fieldError) {
          handleEmployeeCancel();
          setPage(1);
        }
      })
      .finally(() => setButtonLoader((prev) => false));
  };
  return (
    <div>
      {" "}
      <FilterSection
        filterFields={filterFields}
        handleFilterChange={handleFilterChange}
      >
        <CommonButton
          text="Add New Employee"
          className="orange_btn"
          type="button"
          onClick={() => {
            handleEmployeeSection({ action: "open" });
          }}
        />
      </FilterSection>
      <TableWrapper columns={EMPLOYEE_COLUMNS}>
        {employees?.length ? (
          employees?.map((it, idx) => (
            <SingleEmployeeRow
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
        itemsPerPage={ITEMS_PER_PAGE}
        totalData={totalData}
        currentPage={page}
      />
      {showDeleteModal && (
        <DeleteConfirmationModal
          title="Are you sure you want to remove this employee?"
          description="This action cannot be redo."
          onCancel={() => {
            setItemToDelete(null);
            toggleDeleteModal();
          }}
          onDelete={deleteEmployee}
          loader={deleteLoader}
        />
      )}
      {showEmployeeSection && (
        <AddEditEmployee
          onClose={() => {
            handleEmployeeSection({ action: "close" });
          }}
          formConfig={formConfig}
          onSubmit={onSubmit}
          loader={buttonLoader}
          editInfo={editInfo}
        />
      )}
    </div>
  );
};

export default EmployeeManagement;
