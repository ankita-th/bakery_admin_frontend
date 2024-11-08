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
import { deleteItemBasedOnId, employeeListIntoOptions, handleEdit } from "../utils/helpers";
import AddEditTodo from "../Components/AddEditTodo";
const filterFields = [
  {
    type: "select",
    defaultOption: "Sort-By",
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
  const { page, onPageChange,setPage } = usePagination();
  const { buttonLoader, pageloader, toggleLoader } = useLoader();
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

  useEffect(() => {
    toggleLoader("pageLoader");
    const apiFilters = {
      ...filters,
      page: page,
    };
    // setTodos(DUMMY_TODO_DATA);

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
    console.log("inside");
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
  console.log(employeeList, "employee list inside parent");

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
    toggleLoader("buttonLoader");
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
        toggleLoader("buttonLoader");
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
    console.log(event, "submitter");
    const buttonType = event.nativeEvent.submitter.name;
    console.log(buttonType, "buttonType");
    const payload = {
      ...data,
      priority: data?.priority?.value,
      status: buttonType === "assign-later" ? "unassigned" : "assigned",
      assigned_to: data?.assigned_to?.value,
    };
    toggleLoader("buttonLoader");

    makeApiRequest({
      endPoint: TODO_ENDPOINT,
      method: isEdit ? METHODS.patch : METHODS.post,
      payload: payload,
      update_id: isEdit ? editItem?.id : null,
    })
      .then((res) => {
        console.log(res,"this is response")
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
        toggleLoader("buttonLoader");
        setPage(1);
      });
  };
  return (
    <div>
      <FilterSection
        filterFields={filterFields}
        handleFilterChange={handleFilterChange}
      >
        <CommonButton
          text="Add Todo List"
          className="buttonTwo"
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
        />
      )}
    </div>
  );
};

export default Todo;
