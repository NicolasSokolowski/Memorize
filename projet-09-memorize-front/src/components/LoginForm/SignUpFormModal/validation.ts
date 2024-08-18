import * as Yup from "yup";
import {
  emailValidation,
  passwordValidation,
  usernameValidation,
} from "../../Profile/EditAccountForm/validation";

const initialValues = {
  username: "",
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  username: usernameValidation,
  email: emailValidation,
  password: passwordValidation,
});

export {
  usernameValidation,
  emailValidation,
  passwordValidation,
  initialValues,
  validationSchema,
};
