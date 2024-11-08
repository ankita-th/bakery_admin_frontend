import React from "react";
import ListHeadings from "../Components/Common/ListHeadings";

const TableWrapper = ({ columns, children }) => {
  return (
    <div className="container mx-auto mt-5">
      <table className="min-w-full bg-white border border-gray-200 custom_table">
        <ListHeadings columns={columns} />
        <tbody>{children}</tbody>
      </table>
    </div>
  );
};

export default TableWrapper;
