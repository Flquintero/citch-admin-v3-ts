import { IFormData } from '@/types/forms';
import { $apiRequest } from '@/utils/api';
import Vue from 'vue';
import {
  getAuth,
  createUserWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  UserCredential,
  Auth,
  signOut,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { IVerifyPassword } from '@/types/auth';
const AUTH_INSTANCE: Auth = getAuth(Vue.prototype.$firebase_app);
const DOMAIN_PATH = '/auth';

export default {
  initSetPersistence: () => {
    setPersistence(AUTH_INSTANCE, browserLocalPersistence);
  },
  signupUser: async (formData: IFormData) => {
    let userCredential: UserCredential = await createUserWithEmailAndPassword(
      AUTH_INSTANCE,
      formData.email,
      formData.password
    );
    await updateProfile(userCredential.user, {
      displayName: `${formData.firstName} ${formData.lastName}`,
    });
  },
  loginUser: async (formData: IFormData) => {
    return await signInWithEmailAndPassword(AUTH_INSTANCE, formData.email, formData.password);
  },
  initSignOut: async () => {
    return await signOut(AUTH_INSTANCE);
  },
  observerCurrentAuthedUser: async () => {
    return await onAuthStateChanged(AUTH_INSTANCE, (user: any): any => {
      console.log('observed user', user);
      return user;
    });
  },
  initResetUserPassword: async (formData: IFormData) => {
    return await sendPasswordResetEmail(AUTH_INSTANCE, formData.email);
  },
  initVerifyResetPasswordCode: async (passwordVerificationObject: IVerifyPassword) => {
    return await $apiRequest({
      method: 'post',
      url: `${DOMAIN_PATH}/verify-password-code`,
      data: { ...passwordVerificationObject },
    });
  },
  setNewPassword: async (formData: IFormData) => {
    return await signInWithEmailAndPassword(AUTH_INSTANCE, formData.email, formData.password);
  },
};
