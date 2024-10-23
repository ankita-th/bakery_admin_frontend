import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthSideSection from "../Components/AuthSideSection";
import authImage from "../assets/images/authImage.png";

const PublicLayout = () => {
  const isToken = localStorage.getItem("token");
  return (
    <div className="login-container">
      {
        <>
          <div className="section1">
            <img src={authImage} alt="auth image" />
          </div>
          <div className="section2">
            {!isToken ? <Outlet /> : <Navigate to="/dashboard" />}{" "}
          </div>
        </>
      }
    </div>
  );
};

export default PublicLayout;
