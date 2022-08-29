import * as yup from "yup";

export const validate = yup.object().shape({
  name: yup.string().required("Input cannot empty"),
  author: yup.string().required("Input cannot empty"),
  genre: yup.string().required("Input cannot empty"),
  pages: yup
    .number()
    .min(2, "two characters at least")
    .positive()
    .integer()
    .required("Input cannot empty"),
  language: yup.string().required("Select language"),
  country: yup.string().required("Select country"),
  publishDate: yup
    .number()
    .test(
      "len",
      "Must be exactly 4 characters",
      (val) => val && val.toString().length === 4
    )
    .max(new Date().getFullYear()),
});
