import React from "react";
import ListHeadings from "../Components/Common/ListHeadings";

const TableWrapper = ({ columns, children }) => {
  return (
    <div className="container mx-auto p-4">
      <table className="min-w-full bg-white border border-gray-200">
        <ListHeadings columns={columns} />
        <tbody>{children}</tbody>
      </table>
    </div>
  );
};

export default TableWrapper;
