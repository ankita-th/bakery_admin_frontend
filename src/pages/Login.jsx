import { useState } from "react";
import AuthRedirectSection from "../Components/AuthRedirectSection";
import { LoginValidations } from "../Validations/loginValidations";
import { useForm } from "react-hook-form";
import CommonTextField from "../Form Fields/CommonTextField";
import { ClosedEye, OpenEye } from "../assets/Icons/Svg";
import { useNavigate } from "react-router-dom";
import { login } from "../api/apiFunctions";

const Login = () => {
  const navigate = useNavigate();
  const formConfig = useForm();
  const { handleSubmit } = formConfig;
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  const onSubmit = (values) => {
    console.log(values, "inside submit");
    // update required: add token from the API here
    const token = Date.now();
    localStorage.setItem("token", token);
    navigate("/products");

    login(values)
      .then((res) => {
        // update the token logic with actual token
        const token = Date.now();
        localStorage.setItem("token", token);
        navigate("/dashboard");
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      {/* <AuthRedirectSection
        text="Don't have an account? "
        linkText="Sign up"
        linkUrl="/sign-up"
        className="right-align"
      /> */}
      <form onSubmit={handleSubmit(onSubmit)} className="login-form">
        <h2>Login!</h2>
        <CommonTextField
          fieldName="username"
          formConfig={formConfig}
          type="text"
          placeholder="Enter Username"
          rules={LoginValidations["userName"]}
          label="Username or email address"
        />
        <CommonTextField
          fieldName="password"
          formConfig={formConfig}
          placeholder="Enter Password"
          rules={LoginValidations["password"]}
          label="Your password"
          type={showPassword ? "text" : "password"}
          //   for adding icons
          onIconClick={toggleShowPassword}
          icon={showPassword ? ClosedEye : OpenEye}
        />
        <AuthRedirectSection
          text=""
          linkText="Forgot your password"
          linkUrl="/forgot-password"
          className="text-right"
        />
        <button type="submit" className="sign-in-button">
          Sign in
        </button>
        {/* <AuthRedirectSection
          text="Don't have an acount? "
          linkText="Sign up"
          linkUrl="/sign-up"
        /> */}
      </form>
    </>
  );
};

export default Login;
