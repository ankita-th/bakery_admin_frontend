import React, { useEffect, useState } from "react";
import FormWrapper from "../Wrappers/FormWrapper";
import AddEditSectionHeading from "./AddEditSectionHeading";
import CommonTextField from "../Form Fields/CommonTextField";
import { TodoValidations } from "../Validations/validations";
import CommonSelect from "../Form Fields/CommonSelect";
import CommonButton from "./Common/CommonButton";
import CommonDateField from "../Form Fields/CommonDateField";
import { PRIORITY_OPTIONS, today } from "../constant";
import {
  employeeListIntoOptions,
  extractOption,
  prefillFormValues,
} from "../utils/helpers";
import { makeApiRequest, METHODS } from "../api/apiFunctions";
import { EMPLOYEE_ENDPOINT, TODO_ENDPOINT } from "../api/endpoints";
const AddEditTodo = ({
  onClose,
  onSubmit,
  formConfig,
  editInfo,
  employeeList,
  btnLoaders,
  assignOnly = false,
}) => {
  const { isEdit, editItem } = editInfo;
  const { setValue, watch } = formConfig;
  useEffect(() => {
    const prefillKeys = [
      "task_id",
      "title",
      "description",
      "assigned_to",
      "notes",
      "priority",
      "start_date",
      "end_date",
    ];

    if (isEdit) {
      // for filling normal keys
      prefillFormValues(editItem, prefillKeys, setValue);
      // for prefilling values with custom logic
      setValue(
        "priority",
        extractOption(PRIORITY_OPTIONS, editItem?.priority, "value")
      );
      const employeeOption = extractOption(
        employeeList,
        editItem?.assigned_to,
        "value"
      );
      setValue("assigned_to", employeeOption);
    }
  }, [employeeList]);

  const fillForm = () => {
    setValue("task_id", 125);
    setValue("title", "Equipment Service");
    setValue("description", "Order 50 lbs of flour and sugar");
    setValue("assigned_to", { label: "Vandana Devi", value: 4 });
    setValue("start_date", "2024-11-04");
    setValue("end_date", "2024-20-04");
    setValue("notes", "Pending approval from vendor");
    setValue("priority", { label: "High", value: "high" });
  };
  console.log(watch("assigned_to"), "assigned to");

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="category-section">
        <AddEditSectionHeading
          onClose={onClose}
          text={isEdit ? "Edit Todo List" : "Add Todo List"}
        />
        <FormWrapper
          onSubmit={onSubmit}
          formConfig={formConfig}
          className="orange_btn"
          isCustomButtons={true}
        >
          <CommonButton
            type="button"
            text="Fill Form"
            className="orange_btn"
            onClick={fillForm}
          />
          <CommonTextField
            label="Task ID *"
            fieldName="task_id"
            rules={TodoValidations["task_id"]}
            formConfig={formConfig}
            isNumberOnly={true}
          />
          <CommonTextField
            label="Task Name *"
            fieldName="title"
            rules={TodoValidations["title"]}
            formConfig={formConfig}
          />

          <CommonTextField
            label="Description *"
            fieldName="description"
            rules={TodoValidations["description"]}
            formConfig={formConfig}
            rows={4}
            type="textarea"
          />
          {/* currently this is not required */}

          <CommonSelect
            label="Assigned To *"
            fieldName="assigned_to"
            rules={TodoValidations["assigned_to"]}
            formConfig={formConfig}
            selectType="react-select"
            placeholder="Select employee"
            options={employeeList}
            defaultOption="Assign"
            className="add-edit-input"
          />

          <CommonSelect
            formConfig={formConfig}
            label="Priority *"
            selectType="react-select"
            placeholder="Select Priority"
            options={PRIORITY_OPTIONS}
            defaultOption="Select priority"
            fieldName="priority"
            className="add-edit-input"
          />

          {/* add start and end dates */}

          <CommonTextField
            label="Notes"
            fieldName="notes"
            rules={TodoValidations["notes"]}
            formConfig={formConfig}
            placeholder="Enter Notes"
            type="textarea"
            rows={4}
          />
          {/* commented for future use */}

          <CommonDateField
            formConfig={formConfig}
            fieldName="start_date"
            minDate={today}
            rules={TodoValidations["start_date"]}
            label="Start Date"
          />

          <CommonDateField
            formConfig={formConfig}
            fieldName="end_date"
            minDate={watch("start_date")}
            label="End Date"
            rules={{
              required: "End Date is required",
              validate: (value) =>
                value >= watch("start_date") ||
                "End date must be greater than or equal to the start date",
            }}
          />

          <div className="button-section">
            <CommonButton
              type="submit"
              text="Assign Task"
              className="orange_btn"
              name="assigned"
              loader={btnLoaders?.assigned}
              disabled={btnLoaders?.assigned || btnLoaders?.unassigned}
            />
            {/* need to confirm functionality for this */}
            {!assignOnly && (
              <CommonButton
                type="submit"
                text="Assign Later"
                className="orange_btn"
                name="unassigned"
                loader={btnLoaders?.unassigned}
                disabled={btnLoaders?.assigned || btnLoaders?.unassigned}
              />
            )}
          </div>
        </FormWrapper>
      </div>
    </div>
  );
};

export default AddEditTodo;
