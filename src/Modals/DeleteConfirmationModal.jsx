import React from "react";

const DeleteConfirmationModal = ({
  icon,
  title,
  description,
  onDelete,
  onCancel,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg">
        <div className="flex justify-center">
          <div className="bg-red-100 rounded-full w-12 h-12 flex items-center justify-center">
            {icon}
          </div>
        </div>
        <h2 className="text-lg font-semibold text-center text-gray-900 mt-4">
          {title}
        </h2>
        <p className="text-sm text-center text-gray-600 mt-2">{description}</p>
        <div className="flex justify-center mt-6 space-x-3">
          <button
            className="buttonTwo"
            onClick={onDelete}
          >
            Delete
          </button>
          <button
            // className="bg-gray-200 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
            className="buttonOne"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
