// import { User } from 'firebase/auth';
import { IVerifyPassword } from './auth';
import { IFormData } from './forms';

export interface IApi {
  [property: string]: any;
  'auth': IAuthRepository;
  'users': IUsersRepository;
  'organizations': IOrganizationsRepository;
}
export interface IAuthRepository {
  signupUser(formData: IFormData): Promise<any>;
  loginUser(formData: IFormData): Promise<any>;
  initSignOut(): Promise<any>;
  observerCurrentAuthedUser(): Promise<any>;
  initResetUserPassword(formData: IFormData): Promise<any>;
  initVerifyResetPasswordCode(passwordVerificationObject: IVerifyPassword): Promise<any>;
  setNewPassword(passwordVerificationObject: IFormData): Promise<any>;
}
export interface IUsersRepository {
  signupUser(formData: IFormData): Promise<any>;
}
export interface IOrganizationsRepository {
  updateOrganization(formData: IFormData): Promise<any>;
}
