import { useField } from "formik";
import { FaExclamationCircle } from "react-icons/fa";

function Input({ label, ...props }) {
  const [field, meta] = useField(props);
  return (
    <div className="space-y-1">
      <label
        className="text-lg font-semibold text-1F3D75"
        htmlFor={props.id || props.name}
      >
        {label}
      </label>
      <input
        className="border rounded px-2 py-1 w-full"
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="flex items-center space-x-1 text-red-600">
          <FaExclamationCircle /> {/* Error Icon */}
          <span>{meta.error}</span> {/* Error Message */}
        </div>
      ) : null}
    </div>
  );
}

export default Input;
