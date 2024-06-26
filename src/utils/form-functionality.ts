import { IFormData, IValidationObject } from "@/types/forms/interfaces";
export const FormFunctions = {
  setFormValue(
    formData: IFormData,
    $v: IValidationObject,
    valueObject: { [k: string]: string }
  ) {
    (formData as any)[valueObject.field] = valueObject.value;
    ($v as IValidationObject).formData[valueObject.field].$touch();
  },
  hasInputError($v: IValidationObject, field: string): () => boolean {
    const error =
      ($v as IValidationObject).formData[field].$error ||
      ($v as IValidationObject).formData[field].$anyError;
    return error;
  },
  formatFormData(formData: IFormData) {
    const formattedForm = { ...formData };
    for (const property in formData) {
      switch (property) {
        case "email":
          formattedForm.email = formData.email.trim().toLowerCase();
          break;
        case "firstName":
          formattedForm.firstName = formData.firstName.trim().toLowerCase();
          break;
        case "lastName":
          formattedForm.lastName = formData.lastName.trim().toLowerCase();
          break;
        default:
          break;
      }
    }
    return formattedForm;
  },
};
