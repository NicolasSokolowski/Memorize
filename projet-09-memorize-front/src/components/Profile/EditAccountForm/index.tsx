import { Formik, Form } from "formik";
import { useAppDispatch } from "../../../hooks/redux";
import Input from "./Input";
import {
  updatePassword,
  updateUser,
} from "../../../store/actions/user/updateUser";
import { validationSchema, initialValues } from "./validation";
import ButtonsGroup from "./ButtonsGroup";

function EditAccountForm({ toggleEdit }) {
  const dispatch = useAppDispatch();

  const onFormikSubmit = async (values, { setSubmitting }) => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const isPasswordModified = values.password !== "";

    const areOtherFieldsModified =
      values.username !== "" || values.email !== "";

    if (isPasswordModified) {
      dispatch(
        updatePassword({
          password: values.password,
          newPassword: values.newPassword,
        })
      );
    }

    if (areOtherFieldsModified) {
      dispatch(updateUser({ username: values.username, email: values.email }));
    }

    setSubmitting(false);
    toggleEdit();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onFormikSubmit}
    >
      <Form className="flex flex-col items-center justify-center text-center">
        <div className="space-y-1">
          <Input name="username" label="Votre nouvel identifiant" type="text" />
          <Input name="email" label="Votre nouvel email" type="email" />
          <Input
            name="password"
            label="Votre mot de passe actuel"
            type="password"
          />
          <Input
            name="newPassword"
            label="Votre nouveau mot de passe"
            type="password"
          />
        </div>
        <div className="mt-4">
          <ButtonsGroup
            buttons={[
              { text: "Save", type: "submit" },
              { text: "Cancel", type: "button", onClick: toggleEdit },
            ]}
          />
        </div>
      </Form>
    </Formik>
  );
}

export default EditAccountForm;
