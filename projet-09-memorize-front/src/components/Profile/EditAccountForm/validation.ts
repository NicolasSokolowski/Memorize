import * as Yup from "yup";

const initialValues = {
  username: "",
  email: "",
  password: "",
  newPassword: "",
};

const usernameValidation = Yup.string();

const emailValidation = Yup.string().email(
  "You did not input a valid email address"
);

const passwordValidation = Yup.string()
  .matches(
    /[a-z]/,
    "The password must contain at least 1 lowercase alphabetical character"
  )
  .matches(
    /[A-Z]/,
    "The password must contain at least 1 uppercase alphabetical character"
  )
  .matches(
    /[^a-zA-Z0-9]/,
    "The password must contain at least 1 special character"
  )
  .matches(/[0-9]/, "The password must contain at least 1 numeric character")
  .min(8, "The password should contain at least 8 characters");

const validationSchema = Yup.object({
  username: usernameValidation,
  email: emailValidation,
  password: passwordValidation,
  newPassword: passwordValidation,
});

export {
  usernameValidation,
  emailValidation,
  passwordValidation,
  initialValues,
  validationSchema,
};
