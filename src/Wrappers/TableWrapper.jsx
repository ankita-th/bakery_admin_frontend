import React from "react";
import ListHeadings from "../Components/Common/ListHeadings";

const TableWrapper = ({ columns, children }) => {
  return (
    <div className="mt-5">
      <table className="min-w-full custom_table bg-transparent border-0 border-separate border-spacing-x-0 border-spacing-y-4">
        <ListHeadings columns={columns} />
        <tbody>{children}</tbody>
      </table>
    </div>
  );
};

export default TableWrapper;
