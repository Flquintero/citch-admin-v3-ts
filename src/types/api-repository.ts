import { IFormData } from "./forms";

export interface IApi {
    auth: IAuth;
}
export interface IAuth {
    signupUser(formData: IFormData): Promise<any>;
    loginUser(formData: IFormData): Promise<any>;
}