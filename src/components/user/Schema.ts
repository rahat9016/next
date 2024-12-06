import * as yup from "yup";

const Schema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters long"),
  email: yup
    .string()
    .required("Email is required")
    .matches(
      /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Email must be a valid email address"
    ),
  gender: yup
    .string()
    .required("Gender is required")
    .oneOf(
      ["male", "female", "third gender"],
      "Gender must be either 'male', 'female', or 'third gender'"
    ),
  employeeType: yup.string().required("Employee type is required"),
});

export default Schema;
