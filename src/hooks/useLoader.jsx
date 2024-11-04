import React, { useState } from "react";

const useLoader = () => {
  const [pageLoader, setPageLoader] = useState(false);
  const [buttonLoader, setButtonLoader] = useState(false);
  const toggleLoader = (type) => {
    if (type === "buttonLoader") {
      setButtonLoader((prev) => !prev);
    } else {
      setPageLoader((prev) => !prev);
    }
  };
  return { pageLoader, toggleLoader, buttonLoader };
};

export default useLoader;
