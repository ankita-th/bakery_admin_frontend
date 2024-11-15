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

const Login = () => {
  const navigate = useNavigate();
  const formConfig = useForm();
  const { handleSubmit } = formConfig;
  const [showPassword, setShowPassword] = useState(false);
  const [btnLoader, setBtnLoader] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  const onSubmit = (values) => {
    setBtnLoader((prev) => true);
    login(values)
      .then((res) => {
        // update the token logic with actual token
        localStorage.setItem("token", res?.data?.access);
        toastMessage("Logged In Successfully", successType);
        localStorage.setItem("refreshToken", res?.data?.refresh);
        const userName = `${res?.data?.first_name} ${res?.data?.last_name}`;
        localStorage.setItem("userName", userName);
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err?.response?.data?.non_field_errors[0], "error");
        toastMessage(
          err?.response?.data?.non_field_errors[0] || DEFAULT_ERROR_MESSAGE
        );
      })
      .finally(() => setBtnLoader((prev) => false));
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
          placeholder="Enter Username"
          rules={LoginValidations["email"]}
          label="Username or email address"
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
        {/* <AuthRedirectSection
          text=""
          linkText="Forgot your password"
          linkUrl="/forgot-password"
          className="text-left text-gray-500 hover:text-black mt-2"
        /> */}
        <CommonButton
          text="Sign in"
          type="submit"
          loader={btnLoader}
          className="sign-in-button w-full py-3 mt-4 bg-gray-300 text-gray-600 font-semibold rounded-md hover:bg-[#5F6F52] hover:text-white rounded-[50px] cursor-pointer transition-all duration-400 ease-in-out"
        />
        {/* <AuthRedirectSection
          text="Don't have an acount? "
          linkText="Sign up"
          linkUrl="/sign-up"
        /> */}

        {/* <p className="text-center text-sm mt-4">
          Don’t have an account?{" "}
          <a
            href="#"
            className="text-grey-500 underline hover:text-blue-500 transition-all duration-400 ease-in-out"
          >
            Sign up
          </a>
        </p> */}

        {/* <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-gray-500">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div> */}
        {/* 
        <button className="w-full py-3 flex items-center justify-center border border-gray-300 hover:bg-gray-100 rounded-[50px]">
          <img src={googleIcon} alt="Google" className="w-5 h-5 mr-2" />
          Continue with Google
        </button> */}
      </form>
    </>
  );
};

export default Login;
