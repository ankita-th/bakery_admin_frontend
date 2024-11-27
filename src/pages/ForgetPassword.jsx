// import {
//   changePassword,
//   sendEmailOtp,
//   verifyOtp,

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import OtpSection from "../Components/OtpSection";
import CommonTextField from "../Form Fields/CommonTextField";
import { LoginValidations } from "../Validations/loginValidations";
import CommonButton from "../Components/Common/CommonButton";
import { changePassword, sendEmailOtp, verifyOtp } from "../api/apiFunctions";
import { successType, toastMessage } from "../utils/toastMessage";
import ChangePassword from "../Components/ChangePassword";
import { DEFAULT_ERROR_MESSAGE } from "../constant";

// } from "@/_Api Handlers/apiFunctions";
const ForgetPassword = () => {
  const navigate = useNavigate();
  const formConfig = useForm();
  const { handleSubmit, watch } = formConfig;
  const [step, setStep] = useState();
  // storing email and otp for last step
  const [passwordUpdatePayload, setPasswordUpdatePayload] = useState({
    otp: "",
    email: "",
  });

  // for step 1 (send otp)
  const onSubmit = (values) => {
    setPasswordUpdatePayload({
      ...passwordUpdatePayload,
      email: values?.email,
    });
    setStep("otp");
    toastMessage("OTP Sent successfully to you email", successType);

    sendEmailOtp(values)
      .then((res) => {
        setStep("otp");
        toastMessage("OTP Sent successfully to you email", successType);
      })
      .catch((err) => {
        // check which field is there for invalid email address
        toastMessage("Invalid email address");
      });
  };

  // step 2:verify otp
  const handleSubmitOTP = (otp) => {
    setPasswordUpdatePayload({ ...passwordUpdatePayload, otp: otp });
    // toastMessage("OTP verified successfully", successType);
    // setStep("password-change");
    const payload = {
      otp: otp,
      email: passwordUpdatePayload?.email,
    };
    toastMessage("OTP verified successfully", successType);
    setStep("password-change");

    verifyOtp(payload)
      .then((res) => {
        toastMessage("OTP verified successfully", successType);
        setStep("password-change");
      })
      .catch((err) => {
        // update required: add invalid otp message according to the api response
        console.log(err, "otp verify error");
        toastMessage(err?.response?.data?.error || DEFAULT_ERROR_MESSAGE);
      });
  };

  // step 2:update password

  const onPasswordChange = (values) => {
    const { password } = values;
    const payload = {
      email: passwordUpdatePayload?.email,
      new_password: password,
    };
    changePassword(payload)
      .then((res) => {
        toastMessage("Password updated successfully", successType);
        navigate("/dashboard");
      })
      .catch((err) =>
        toastMessage(err?.response?.data?.error || DEFAULT_ERROR_MESSAGE)
      );
  };

  return (
    <div>
      {step !== "password-change" && step !== "otp" && (
        <>
          <h3>Forgot your Password?</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="login-form">
            <CommonTextField
              fieldName="email"
              formConfig={formConfig}
              type="text"
              placeholder="Enter Email"
              rules={LoginValidations["email"]}
              label="Email address"
            />
            <CommonButton text="Send OTP" type="submit" />
          </form>
        </>
      )}
      {step === "otp" && <OtpSection handleSubmitOTP={handleSubmitOTP} />}
      {step === "password-change" && (
        <ChangePassword
          onPasswordChange={onPasswordChange}
          fieldOneName="password"
          fieldTwoName="confirm_password"
        />
      )}
    </div>
  );
};

export default ForgetPassword;
