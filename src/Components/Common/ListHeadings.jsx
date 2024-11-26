import React, { Fragment } from "react";
import Checkbox from "./Checkbox";

const ListHeadings = ({
  columns,
  rowClassName = "bg-orange-50",
  columnClassName = "py-2 px-4 bg-[#FFEFE7]",
}) => {
  return (
    <thead>
      <tr className={rowClassName}>
        {columns.map((hd) => (
          <Fragment>
            {hd === "checkbox" ? (
              <th className={columnClassName}>
                <Checkbox />
              </th>
            ) : (
              <th className={columnClassName}>{hd}</th>
            )}
          </Fragment>
        ))}
      </tr>
    </thead>
  );
};

export default ListHeadings;
