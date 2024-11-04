import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { makeApiRequest } from "../api/apiFunctions";
import { TODO_ENDPOINT } from "../api/endpoints";

import useLoader from "../hooks/useLoader";

const Todo = () => {
  const [filters, setFilters] = useState({});
  const [todos, setTodos] = useState([]);
  const { buttonLoader, pageloader, toggleLoader } = useLoader();
  const formConfig = useForm();

  useEffect(() => { 
    toggleLoader("pageLoader");
    makeApiRequest({
      endPoint: TODO_ENDPOINT,
    })
      .then((res) => {})
      .catch((err) => {})
      .finally(() => {
        toggleLoader("pageLoader");
      });
  }, []);

  return <div></div>;
};

export default Todo;
