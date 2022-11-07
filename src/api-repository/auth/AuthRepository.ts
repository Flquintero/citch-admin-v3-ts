import { IFormData } from '@/types/forms/interfaces';
import { IVerifyPassword, IPasswordConfirm } from '@/types/auth/interfaces';
import { UserCredential, User } from 'firebase/auth';
import {
  auth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from '@/config/firebase';
import { $publicApiRequest } from '@/utils/api';

const DOMAIN_PATH = '/auth';

export default {
  signupUser: async (formData: IFormData) => {
    let userCredential: UserCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
    await updateProfile(userCredential.user, {
      displayName: `${formData.firstName} ${formData.lastName}`,
    });
    return auth.currentUser;
  },
  loginUser: async (formData: IFormData) => {
    await signInWithEmailAndPassword(auth, formData.email, formData.password);
    return auth.currentUser;
  },
  initSignOut: async () => {
    return await signOut(auth);
  },
  observerCurrentAuthedUser: async () => {
    return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(
        auth,
        (user: User | null): any => {
          unsubscribe();
          resolve(user);
        },
        reject
      );
    });
  },
  initResetUserPassword: async (formData: IFormData) => {
    return await sendPasswordResetEmail(auth, formData.email);
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
