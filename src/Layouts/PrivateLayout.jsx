import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";

const PrivateLayout = ({ curItem }) => {
  const isToken = localStorage.getItem("token");
  // const role = localStorage.getItem("role");
  // console.log(curItem, "current route");
  // const shouldShowRoute = curItem.roles.includes(role);
  // const shouldOpenRoute = () => {};
  return (
    <div>
      {""}
      {isToken && <Sidebar />}
      {isToken && <Header />}
      <div className="outlet">
        {isToken ? <Outlet /> : <Navigate to="/login" />}
      </div>
    </div>
  );
};

export default PrivateLayout;
