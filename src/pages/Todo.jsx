import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { makeApiRequest, METHODS } from "../api/apiFunctions";
import { EMPLOYEE_ENDPOINT, TODO_ENDPOINT } from "../api/endpoints";

import useLoader from "../hooks/useLoader";
import FilterSection from "../Components/Common/FilterSection";
import CommonButton from "../Components/Common/CommonButton";
import {
  DEFAULT_ERROR_MESSAGE,
  DUMMY_TODO_DATA,
  SORT_BY_OPTIONS,
  TODO_ITEMS_PER_PAGE,
} from "../constant";
import usePagination from "../hooks/usePagination";
import TableWrapper from "../Wrappers/TableWrapper";
import NoDataFound from "../Components/Common/NoDataFound";
import SingleTodoRow from "../Components/Common/SingleTodoRow";
import useModalToggle from "../hooks/useModalToggle";
import Pagination from "../Components/Common/Pagination";
import DeleteConfirmationModal from "../Modals/DeleteConfirmationModal";
import { successType, toastMessage } from "../utils/toastMessage";
import {
  deleteItemBasedOnId,
  employeeListIntoOptions,
  handleEdit,
} from "../utils/helpers";
import AddEditTodo from "../Components/AddEditTodo";
import PageLoader from "../loaders/PageLoader";
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
    placeholder: "Search To Do",
  },
];
export const TODO_COLUMNS = [
  "ID",
  "Task Name",
  "Description",
  "Assigned To",
  "Priority",
  "Due Date",
  "Status",
  "Notes",
  "", // for edit and delete actions
];
const Todo = () => {
  const { page, onPageChange, setPage } = usePagination();
  const [assignLoader, setAssignLoader] = useState(false);
  const { buttonLoader, pageLoader, toggleLoader } = useLoader();
  // for add and edit todo section
  const todoSection = useModalToggle();
  const deleteModal = useModalToggle();
  const formConfig = useForm();
  const { reset } = formConfig;
  const [todos, setTodos] = useState([]);
  const [filters, setFilters] = useState({
    sort_by: "",
    name: "",
  });
  const [totalData, setTotalData] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [editInfo, setEditInfo] = useState({
    isEdit: false,
    editItem: null,
  });
  const [employeeList, setEmployeeList] = useState([]);
  const [deleteLoader, setDeleteLoader] = useState(false);
  const [btnLoaders, setBtnLoaders] = useState({
    unassigned: false,
    assigned: false,
  });
  // flow 1
  const [assignOnly, setAssignOnly] = useState(false);

  useEffect(() => {
    toggleLoader("pageLoader");
    const apiFilters = {
      ...filters,
      page: page,
    };

    makeApiRequest({
      endPoint: TODO_ENDPOINT,
      params: apiFilters,
      method: METHODS.get,
    })
      .then((res) => {
        setTotalData(res?.data?.count);
        setTodos(res?.data?.results);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        toggleLoader("pageLoader");
      });
  }, [filters, page]);

  // for setting employee list
  useEffect(() => {
    makeApiRequest({
      endPoint: EMPLOYEE_ENDPOINT,
      method: METHODS.get,
    })
      .then((res) => {
        const options = employeeListIntoOptions(res?.data);
        setEmployeeList(options);
        // const prefillKeys = [
        //   "task_id",
        //   "title",
        //   "description",
        //   "assigned_to",
        //   "notes",
        //   "priority",
        //   "start_date",
        //   "end_date",
        // ];

        // if (isEdit) {
        //   // for filling normal keys
        //   prefillFormValues(editItem, prefillKeys, setValue);
        //   // for prefilling values with custom logic
        //   setValue(
        //     "priority",
        //     extractOption(PRIORITY_OPTIONS, editItem?.priority, "value")
        //   );
        //   const employeeOption = extractOption(
        //     options,
        //     editItem?.assigned_to,
        //     "value"
        //   );
        //   setValue("assigned_to", employeeOption);
        //   console.log(employeeOption, "log employeeOption");
        // }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleFilterChange = (filterName, value) => {
    const temp = { ...filters };
    temp[filterName] = value;
    setFilters(temp);
  };

  // for handling edit and delete buttons inside single row
  const handleActions = ({ action, id, editItem }) => {
    if (action === "edit") {
      handleTodoSection({ action: "edit", editItem: editItem });
    } else if (action === "delete") {
      deleteModal?.toggleModal();
      setItemToDelete(id);
    }
  };

  const deleteTask = () => {
    setDeleteLoader((prev) => true);
    makeApiRequest({
      endPoint: TODO_ENDPOINT,
      method: METHODS?.delete,
      delete_id: itemToDelete,
    })
      .then((res) => {
        toastMessage("Task deleted successfully", successType);
        setTodos(deleteItemBasedOnId(todos, itemToDelete)); //itemTo delete contains the id
      })
      .catch((err) => {
        toastMessage(err?.response?.data?.error || DEFAULT_ERROR_MESSAGE);
      })
      .finally((res) => {
        deleteModal?.toggleModal();
        setDeleteLoader((prev) => false);
      });
  };

  const handleTodoSection = ({ action, editItem }) => {
    if (action === "open") {
      todoSection?.toggleModal();
    } else if (action === "close") {
      todoSection?.toggleModal();
      setEditInfo({
        isEdit: false,
        editItem: null,
      });
      reset();
    } else if (action === "edit") {
      todoSection?.toggleModal();
      setEditInfo({
        isEdit: true,
        editItem: editItem,
      });
    }
  };

  // for creating and updating todo

  const onSubmit = (data, event) => {
    const { isEdit, editItem } = editInfo;
    const buttonType = event.nativeEvent.submitter.name;
    const payload = {
      ...data,
      priority: data?.priority?.value,
      status: buttonType,
      assigned_to: data?.assigned_to?.value,
    };
    setBtnLoaders({ ...btnLoaders, [buttonType]: !btnLoaders[buttonType] });
    makeApiRequest({
      endPoint: TODO_ENDPOINT,
      method: isEdit ? METHODS.patch : METHODS.post,
      payload: payload,
      update_id: isEdit ? editItem?.id : null,
    })
      .then((res) => {
        console.log(res, "this is response");
        // need updated data inside response
        if (isEdit) {
          setTodos(handleEdit(todos, editItem?.id, res?.data)); //array , id to update , data to update
        } else {
          setTodos((prev) => [...prev, res?.data]);
        }
        toastMessage(
          isEdit ? "Task Updated successfully" : "Task Created Successfully",
          successType
        );
      })
      .catch((err) => {
        console.log(err?.response?.data?.task_id[0], "this is err");
        toastMessage(err?.response?.data?.task_id[0] || DEFAULT_ERROR_MESSAGE);
      })
      .finally(() => {
        handleTodoSection({ action: "close" });
        setBtnLoaders({ unassigned: false, assigned: false });
        setPage(1);
        // flow1
        // setAssignOnly(true)
      });
  };

  const handleAssignTask = (editItem) => {
    setAssignLoader((prev) => true);
    // flow 1 (Assigne is not required so click of it complete screen will be shown ,task will be assigned and then assign the task)
    // setAssignOnly(true)
    // handleActions({ action: "edit", editItem: editItem });

    // flow 2 (Assigne is required field hence only need to call the API on assign task)
    const payload = {
      ...editItem,
      status: "assigned",
    };
    makeApiRequest({
      endPoint: TODO_ENDPOINT,
      method: METHODS.patch,
      payload: payload,
      update_id: editItem?.id,
    })
      .then((res) => {
        console.log(res, "this is response");
        // need updated data inside response
        setTodos(handleEdit(todos, editItem?.id, res?.data)); //array , id to update , data to update
        toastMessage("Task Assigned Successfully", successType);
      })
      .catch((err) => {
        toastMessage(err?.response?.data?.task_id[0] || DEFAULT_ERROR_MESSAGE);
      })
      .finally(() => {
        setAssignLoader((prev) => false);
        setPage(1);
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
              text="Add Todo List"
              className="orange_btn"
              onClick={() => {
                // for opening add edit todo section
                handleTodoSection({ action: "open" });
              }}
            />
          </FilterSection>

          <TableWrapper columns={TODO_COLUMNS}>
            {todos?.length ? (
              todos?.map((it, idx) => (
                <SingleTodoRow
                  key={idx}
                  item={it}
                  handleActions={handleActions}
                  employeeList={employeeList}
                  handleAssignTask={handleAssignTask}
                  assignLoader={assignLoader}
                />
              ))
            ) : (
              <NoDataFound />
            )}
          </TableWrapper>
          <Pagination
            onPageChange={onPageChange}
            itemsPerPage={TODO_ITEMS_PER_PAGE}
            totalData={totalData}
          />

          {/* delete confirmation modal */}
          {deleteModal?.showModal && (
            <DeleteConfirmationModal
              title="Are you sure you want to delete this task?"
              description="This action cannot be redo.The task will permanently be deleted"
              onCancel={() => {
                setItemToDelete(null);
                deleteModal.toggleModal();
              }}
              onDelete={deleteTask}
              loader={deleteLoader}
            />
          )}

          {/* add/edit todo section */}
          {todoSection?.showModal && (
            <AddEditTodo
              onClose={() => handleTodoSection({ action: "close" })}
              editInfo={editInfo}
              onSubmit={onSubmit}
              formConfig={formConfig}
              employeeList={employeeList}
              btnLoaders={btnLoaders}
              handleTodoSection={handleTodoSection}
              assignOnly={assignOnly}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Todo;
