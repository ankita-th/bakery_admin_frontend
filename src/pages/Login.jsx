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
        // toastMessage("Logged In Successfully", successType);
        localStorage.setItem("refreshToken", res?.data?.refresh);
        const userName = `${res?.data?.first_name} ${res?.data?.last_name}`;
        // update required:update this later
        localStorage.setItem("userName", "Admin");
        navigate("/dashboard");
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
  const afterAPISuccess = () => {};
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
          className="sign-in-button w-full py-3 mt-4 bg-gray-300 text-gray-600 font-semibold rounded-md hover:bg-[#5F6F52] hover:text-white rounded-[50px] cursor-pointer transition-all duration-400 ease-in-out"
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
