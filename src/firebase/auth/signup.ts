import type { IResponse } from "@/assets/ts/interfaces";
import { auth } from "@/firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";

const response: IResponse = {
  data: null,
  code: "",
  message: "",
};

async function useSignUp(email: string, password: string): Promise<IResponse> {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    if (userCredential) {
      response.data = userCredential.user;
      response.code = "auth/sign-up-successful";
      response.message = "The user was successfully created.";
    }
  } catch (error: any) {
    response.code = error.code;
    response.message = error.message;
  }

  return response;
}

export default useSignUp;
