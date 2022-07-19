import { IVerifyPassword } from './auth';
import { IFormData } from './forms';

export interface IApi {
  [property: string]: any;
  'auth': IAuthRepository;
  'users': IUsersRepository;
}
export interface IAuthRepository {
  initSetPersistence(): any;
  signupUser(formData: IFormData): Promise<any>;
  loginUser(formData: IFormData): Promise<any>;
  initSignOut(): Promise<any>;
  observerCurrentAuthedUser(): Promise<any>;
  initResetUserPassword(formData: IFormData): Promise<any>;
  initVerifyResetPasswordCode(passwordVerificationObject: IVerifyPassword): Promise<any>;
  setNewPassword(passwordVerificationObject: IFormData): Promise<any>;
}
export interface IUsersRepository {
  createUser(formData: IFormData): Promise<any>;
}
