import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";

const PrivateLayout = () => {
  const isToken = localStorage.getItem("token");
  return (
    <div>
      {" "}
      {isToken && <Sidebar />}
      {isToken && <Header />}
      <div className="outlet">
        {isToken ? <Outlet /> : <Navigate to="/login" />}
      </div>
    </div>
  );
};

export default PrivateLayout;
