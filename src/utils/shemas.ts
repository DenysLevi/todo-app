import * as yup from "yup";
import { regexModule } from "./regex";

const login = yup.object({
  email: yup
    .string()
    .required("Email is required.")
    .matches(regexModule.emailRegex, "Invalid email"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Min password length is 6 characters.")
    .matches(
      regexModule.passwordRegex,
      "Password must include letters, numbers and special characters"
    ),
});

const signUp = yup.object({
  name: yup
    .string()
    .required("Name is required.")
    .max(20, "Max name length is 20 characters"),
  email: yup
    .string()
    .required("Email is required.")
    .matches(regexModule.emailRegex, "Invalid email"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Min password length is 6 characters.")
    .matches(
      regexModule.passwordRegex,
      "Password must include letters, numbers and special characters"
    ),
});

export const schemaModule = {
  login,
  signUp,
};
