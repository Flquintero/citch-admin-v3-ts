import { IFormData } from "@/types/forms";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
 const auth = getAuth();

export default {
    signupUser: async (formData: IFormData) => {
        return await createUserWithEmailAndPassword(auth, formData.email, formData.password);
    },
    loginUser: async (formData: IFormData) => {
        return await signInWithEmailAndPassword(auth, formData.email, formData.password);
    }
};