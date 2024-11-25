import React, { useState } from "react";

const VariantAccordion = ({ remove, watch, children, index }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div role="accordion">
      <button
        type="button"
        // onClick={() => handleToggle(index)}
        className={`w-full text-base text-left font-semibold p-5 ${
          openIndex === index
            ? "text-blue-600"
            : "text-gray-800 hover:text-blue-600"
        } flex items-center transition-all`}
      >
        <span className="mr-4">
          <div className="flex items-center justify-between mb-4">
            <select
              className="border border-gray-300 text-sm text-gray-700 rounded-lg p-2"
              disabled={true}
            >
              <option value="1">100 gm</option>
            </select>
            <div className="flex gap-2">
              <button
                type="button"
                className="text-blue-600 text-sm font-medium"
                onClick={() => handleToggle(index)}
              >
                Edit
              </button>
              {watch("variants").length > 1 && (
                <button
                  className="text-red-600 text-sm font-medium"
                  onClick={() => remove(index)}
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-4 fill-current ml-auto shrink-0 transition-transform ${
            openIndex === index ? "rotate-180" : "-rotate-90"
          }`}
          viewBox="0 0 24 24"
        >
          <path
            fillRule="evenodd"
            d="M11.99997 18.1669a2.38 2.38 0 0 1-1.68266-.69733l-9.52-9.52a2.38 2.38 0 1 1 3.36532-3.36532l7.83734 7.83734 7.83734-7.83734a2.38 2.38 0 1 1 3.36532 3.36532l-9.52 9.52a2.38 2.38 0 0 1-1.68266.69734z"
            clipRule="evenodd"
            data-original="#000000"
          ></path>
        </svg>
      </button>

      <div
        className={`transition-all ${
          openIndex === index ? "block py-4 px-6" : "hidden"
        }`}
      >
        <div>{children}</div>
      </div>
    </div>
  );
};

export default VariantAccordion;
