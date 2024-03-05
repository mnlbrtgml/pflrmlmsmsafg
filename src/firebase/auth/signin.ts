import type { IResponse } from "@/assets/ts/interfaces";
import { auth } from "@/firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";

const response: IResponse = {
  data: null,
  code: "",
  message: "",
};

export default async function useSignIn(email: string, password: string): Promise<IResponse> {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    if (userCredential) {
      response.data = userCredential.user;
      response.code = "auth/sign-in-successful";
      response.message = "The user was successfully signed in.";
    }
  } catch (error: any) {
    response.code = error.code;
    response.message = error.message;
  }

  return response;
}
