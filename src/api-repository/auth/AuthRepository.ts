import { IFormData } from '@/types/forms';
import { $publicApiRequest } from '@/utils/api';
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
  User,
  sendPasswordResetEmail,
  getIdToken,
} from 'firebase/auth';
import store from '@/store';
import { IVerifyPassword, IPasswordConfirm } from '@/types/auth';

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
  getUserToken: async () => {
    let currentUser = store.getters.currentUser;
    let forceRefresh = true;
    return await getIdToken(currentUser, forceRefresh);
  },
  observerCurrentAuthedUser: async () => {
    return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(
        AUTH_INSTANCE,
        (user: User | null): any => {
          unsubscribe();
          resolve(user);
        },
        reject
      );
    });
  },
  initResetUserPassword: async (formData: IFormData) => {
    return await sendPasswordResetEmail(AUTH_INSTANCE, formData.email);
  },
  initVerifyResetPasswordCode: async (passwordVerificationObject: IVerifyPassword) => {
    return await $publicApiRequest({
      method: 'post',
      url: `${DOMAIN_PATH}/verify-password-code`,
      data: { ...passwordVerificationObject },
    });
  },
  setNewPassword: async (passwordConfirmObject: IPasswordConfirm) => {
    return await $publicApiRequest({
      method: 'post',
      url: `${DOMAIN_PATH}/confirm-password-reset`,
      data: { ...passwordConfirmObject },
    });
  },
};
