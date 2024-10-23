import React from "react";

const ListHeadings = ({
  columns,
  rowClassName = "bg-orange-50",
  columnClassName = "py-2 px-4 border",
}) => {
  return (
    <thead>
      <tr className={rowClassName}>
        {columns.map((hd) => (
          <th className={columnClassName}>{hd}</th>
        ))}
      </tr>
    </thead>
  );
};

export default ListHeadings;
