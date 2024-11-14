import React, { Fragment } from "react";
import { Controller, useFieldArray } from "react-hook-form";
import CommonButton from "./CommonButton";
import { crossIcon, plusIcon } from "../../assets/Icons/Svg";
import CommonTextField from "../../Form Fields/CommonTextField";

const CommonFieldArray = ({
  heading,
  fieldArrayName,
  formConfig,
  items,
  itemToAppend,
}) => {
  const {
    control,
    register,
    watch,
    formState: { errors },
  } = formConfig;
  const { fields, append, remove } = useFieldArray({
    control,
    name: fieldArrayName,
  });

  return (
    <div>
      <h4 className="font-bold">{heading}</h4>
      {fields?.map((field, index) => (
        <div key={field.id} className="flex space-x-4 items-center">
          {items?.map(
            (
              {
                label,
                fieldName,
                placeholder,
                isRequired,
                field_type,
                isNumberOnly = false,
              },
              itemIndex
            ) => (
              <>
                {field_type === "stepCount" ? (
                  <div>
                    {/* update required , you will need to add step_count value while creating payload */}
                    <p>{label}</p>
                    <Controller
                      control={control}
                      name={`${fieldArrayName}.${index}.${fieldName}`}
                      render={({ field }) => (
                        <input
                          {...field}
                          className="px-4 py-3 bg-gray-100 focus:bg-transparent text-sm outline-[#333] rounded-sm transition-all"
                          value={index + 1}
                          disabled={true}
                        />
                      )}
                    />
                  </div>
                ) : (
                  <CommonTextField
                    fieldName={`${fieldArrayName}.${index}.${fieldName}`}
                    formConfig={formConfig}
                    label={label}
                    placeholder={placeholder}
                    isNumberOnly={isNumberOnly}
                    rules={{
                      required: isRequired ? "This field is required" : false,
                    }}
                    key={itemIndex}
                    customError={
                      errors?.[fieldArrayName]?.[index]?.[fieldName]?.message
                    }
                  />
                )}
              </>
            )
          )}
          {watch(fieldArrayName)?.length !== 1 && (
            <CommonButton
              icon={crossIcon}
              type="button"
              onClick={() => remove(index)}
              className="cross-icon"
            />
          )}
        </div>
      ))}
      <CommonButton
        text="Add Row"
        icon={plusIcon}
        onClick={() => append(itemToAppend)}
        type="button"
        className="add-row-button"
      />
    </div>
  );
};

export default CommonFieldArray;
