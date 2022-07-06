
import { IFormData, IValidationObject } from '@/types/forms';
export const FormFunctions = {
    setFormValue(formData: IFormData, $v:IValidationObject, valueObject: { [k: string]: string }) {
    (formData as any)[valueObject.field] = valueObject.value;
      ($v as IValidationObject).formData[valueObject.field].$touch();
      },
    hasInputError($v:IValidationObject, field: string): () => boolean {
      let error =
        ($v as IValidationObject).formData[field].$error ||
        ($v as IValidationObject).formData[field].$anyError;
      return error;
    },
  
  };