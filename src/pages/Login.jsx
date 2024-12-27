import { useState } from "react";
import AuthRedirectSection from "../Components/AuthRedirectSection";
import { LoginValidations } from "../Validations/loginValidations";
import { useForm } from "react-hook-form";
import CommonTextField from "../Form Fields/CommonTextField";
import { ClosedEye, OpenEye } from "../assets/Icons/Svg";
import { useNavigate } from "react-router-dom";
import { login } from "../api/apiFunctions";
import { successType, toastMessage } from "../utils/toastMessage";
import { toast } from "react-toastify";
import googleIcon from "../assets/images/google_logo.svg";
import CommonButton from "../Components/Common/CommonButton";
import SocialLogin from "../Components/SocialLogin";
import { ROLES } from "../constant";

const Login = () => {
  const navigate = useNavigate();
  const formConfig = useForm();
  const {
    handleSubmit,
    formState: { errors, isValid },
  } = formConfig;
  const [showPassword, setShowPassword] = useState(false);
  const [btnLoader, setBtnLoader] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  const onSubmit = (values) => {
    setBtnLoader((prev) => true);
    login(values)
      .then((res) => {
        // const role = res?.data?.role;
        const role = ROLES?.admin;
        if (role === ROLES?.worker) {
          toastMessage("Invalid Role");
          return;
        }
        localStorage.setItem("token", res?.data?.access);
        localStorage.setItem("refreshToken", res?.data?.refresh);
        localStorage.setItem("role", role);

        const userName = `${res?.data?.first_name} ${res?.data?.last_name}`;
        localStorage.setItem("userName", userName);
        handleNavigate(role);
      })
      .catch((err) => {
        const fieldError =
          err?.response?.data?.non_field_errors?.[0] ||
          err?.response?.data?.email?.[0];
        if (fieldError) {
          toastMessage(fieldError || DEFAULT_ERROR_MESSAGE);
        }
      })
      .finally(() => setBtnLoader((prev) => false));
  };
  const handleNavigate = (role) => {
    if (role === ROLES?.admin) {
      // navigate("/dashboard");
      window.location.href = "/dashboard";
    } else if (role === ROLES?.accountManager) {
      // navigate("/orders-management");
      window.location.href = "/orders-management";
    } else if (role === ROLES?.stockManager) {
      // navigate("/products");
      window.location.href = "/products";
    }
  };
  return (
    <>
      {/* <AuthRedirectSection
        text="Don't have an account? "
        linkText="Sign up"
        linkUrl="/sign-up"
        className="right-align"
      /> */}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="login-form w-full max-w-[450px]"
      >
        <h2 className="text-3xl font-bold mb-4">Login!</h2>
        <CommonTextField
          fieldName="email"
          formConfig={formConfig}
          type="text"
          placeholder="Enter Email"
          rules={LoginValidations["email"]}
          label="Email address"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-black"
          labelClassName="block text-sm font-medium mb-2"
        />
        <CommonTextField
          fieldName="password"
          formConfig={formConfig}
          placeholder="Enter Password"
          rules={LoginValidations["password"]}
          label="Your password"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-black"
          labelClassName="block text-sm font-medium mb-2"
          type={showPassword ? "text" : "password"}
          //   for adding icons
          onIconClick={toggleShowPassword}
          icon={showPassword ? ClosedEye : OpenEye}
        />
        {/* commented for future  use */}
        <CommonButton
          text="Sign in"
          type="submit"
          loader={btnLoader}
          className={`disabled-sign-in ${isValid && "sign-in-button"}`}
          disabled={!isValid || btnLoader}
        />
        {/* commented for future  use */}
        {/* <SocialLogin
          afterAPISuccess={() => {
            afterAPISuccess;
          }}
        /> */}
      </form>
    </>
  );
};

export default Login;
