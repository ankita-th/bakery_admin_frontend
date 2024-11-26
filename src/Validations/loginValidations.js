import { EMAIL_REGEX } from "../regex/regex";

// login validations
export const LoginValidations = {
  email: {
    required: "Email address is required",
    pattern: {
      value: EMAIL_REGEX,
      message: "Please enter a valid email address",
    },
  },
  password: {
    required: "Password is required",
  },
};
