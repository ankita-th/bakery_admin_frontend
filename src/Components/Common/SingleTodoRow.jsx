import React from "react";
import { editIcon, trashIcon } from "../../assets/Icons/Svg";
import CommonButton from "./CommonButton";
import { extractOption } from "../../utils/helpers";
const STATUS_TO_CLASS = {
  "Not Started": "status-pending",
  unassigned: "text-red-500",
  //  further add accordingly
};
const SingleTodoRow = ({
  item,
  currentPage = 1,
  index = null,
  handleActions,
  employeeList,
  handleAssignTask,
  assignLoader,
}) => {
  const {
    id,
    task_id,
    title,
    assigned_to,
    description,
    priority,
    start_date,
    end_date,
    status,
    notes,
  } = item;
  return (
    <tr className="text-center">
      <td className="py-2 px-4 border">{task_id}</td>
      <td className="py-2 px-4 border font-bold">{title}</td>
      <td className="py-2 px-4 border">{description}</td>
      <td className="py-2 px-4 border">
        {status === "assigned" ? (
          extractOption(employeeList, assigned_to, "value")?.label
        ) : (
          <CommonButton
            text="Assign Task"
            className="orange_btn"
            onClick={() => handleAssignTask(item)}
            loader={assignLoader}
            disabled={assignLoader}
          />
        )}
      </td>
      <td className="py-2 px-4 border capitalize">{priority}</td>
      <td className="py-2 px-4 border">{end_date}</td>
      <td className={`py-2 px-4 border ${STATUS_TO_CLASS[status]}`}>
        {status}
      </td>
      <td className="py-2 px-4 border">{notes}</td>
      <td className="py-2 px-4 border space-x-2">
        <button
          onClick={() => {
            // need to confirm about id or task id
            handleActions({ action: "edit", editItem: item });
          }}
          className="text-blue-500 hover:text-blue-700"
        >
          {editIcon}
        </button>
        <button
          onClick={() => {
            // need to confirm about id or task id
            // update this accordingly
            handleActions({ action: "delete", id: id });
          }}
          className="text-red-500 hover:text-red-700"
        >
          {trashIcon}
        </button>
      </td>
    </tr>
  );
};

export default SingleTodoRow;
