import { ValidationError } from "yup";

interface Errors {
  [key: string]: string;
}

export default function getValidationErrors(e: ValidationError): Errors {
  const validationErrors: Errors = {};

  e.inner.forEach((error) => {
    validationErrors[error.path] = error.message;
  });

  return validationErrors;
}
