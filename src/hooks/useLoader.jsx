import React, { useState } from "react";

const useLoader = () => {
  const [loader, setLoader] = useState(false);
  const toggleLoader = () => {
    setLoader((prev) => !prev);
  };
  return {loader, toggleLoader};
};

export default useLoader;
