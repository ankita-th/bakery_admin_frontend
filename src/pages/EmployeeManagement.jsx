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
  SORT_BY_OPTIONS,
} from "../constant";
import useModalToggle from "../hooks/useModalToggle";
import TableWrapper from "../Wrappers/TableWrapper";
import SingleEmployeeRow from "../Components/SingleEmployeeRow";
import NoDataFound from "../Components/Common/NoDataFound";
import DeleteConfirmationModal from "../Modals/DeleteConfirmationModal";
import { successType, toastMessage } from "../utils/toastMessage";
import AddEditEmployee from "../Components/AddEditEmployee";
const filterFields = [
  {
    type: "select",
    defaultOption: "Sort by",
    options: SORT_BY_OPTIONS,
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
  const { buttonLoader, pageLoader, toggleLoader } = useLoader();
  const formConfig = useForm();
  const { reset } = formConfig;
  const { showModal: showEmployeeSection, toggleModal: toggleEmployeeSection } =
    useModalToggle();
  const { showModal: showDeleteModal, toggleModal: toggleDeleteModal } =
    useModalToggle();
  const [employees, setEmployees] = useState([]);
  const [editInfo, setEditInfo] = useState({
    isEdit: false,
    edititem: null,
  });
  const [totalData, setTotalData] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [filters, setFilters] = useState({
    sort_by: "",
    name: "",
  });
  const [deleteLoader, setDeleteLoader] = useState(false);

  useEffect(() => {
    toggleLoader("pageLoader");
    const apiParams = {
      ...filters,
      page: page,
    };
    setEmployees(DUMMY_EMPLOYEE_DATA);

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
  }, [page,filters]);

  const handleFilterChange = (filterName, value) => {
    const temp = { ...filters };
    temp[filterName] = value;
    setFilters(temp);
  };

  const handleActions = ({ action, delete_id, editItem }) => {
    if (action === "delete") {
      toggleDeleteModal();
      setItemToDelete(delete_id);
    } else {
      // for edit
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
        // update required:Add a proper message here
        toastMessage("Deleted Successfully", successType);
      })
      .catch((err) => {
        // update required: chek in the api in which object error message is coming
        toastMessage(err?.response?.data?.error || DEFAULT_ERROR_MESSAGE);
      })
      .finally(() => {
        setDeleteLoader((prev) => false);
        toggleDeleteModal();
        setItemToDelete(null);
      });
  };

  const onSubmit = (values) => {
    console.log(values, "these are values");
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
          editInfo={editInfo}
        />
      )}
    </div>
  );
};

export default EmployeeManagement;
