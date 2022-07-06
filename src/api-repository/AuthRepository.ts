import { IFormData } from "@/types/forms";
import Vue from 'vue'
import { getAuth, createUserWithEmailAndPassword,setPersistence, browserLocalPersistence,signInWithEmailAndPassword, onAuthStateChanged, updateProfile, UserCredential, Auth, signOut } from "firebase/auth";
const auth: Auth = getAuth(Vue.prototype.$firebase_app);



export default {
    initSetPersistence: () => {
        setPersistence(auth, browserLocalPersistence);
    },
    signupUser: async (formData: IFormData) => {
        let userCredential: UserCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        await updateProfile(userCredential.user, {displayName: `${formData.firstName} ${formData.lastName}`})
    },
    loginUser: async (formData: IFormData) => {
        return await signInWithEmailAndPassword(auth, formData.email, formData.password);
    },
    initSignOut: async () => {
        return await signOut(auth);
    },
    observerCurrentAuthedUser: async () => {
        return await onAuthStateChanged(auth, (user: any): any => {
            console.log('observed user', user);
            return user;
        });
    },
    getCurrentAuthUser: async () => {
        console.log('currentUSer', auth)
        return await auth.currentUser
    },
};