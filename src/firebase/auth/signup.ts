import type { ISignUpForm, IResponse } from "@/assets/ts/interfaces";
import { auth } from "@/firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import useCreateUser from "@/firebase/db/users/create";

const response: IResponse = {
  data: null,
  code: "",
  message: "",
};

export default async function useSignUp(form: ISignUpForm): Promise<IResponse> {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);

    if (userCredential) {
      await useCreateUser(form).then(() => {
        response.data = userCredential.user;
        response.code = "auth/sign-up-successful";
        response.message = "The user was successfully created.";
      });
    }
  } catch (error: any) {
    response.code = error.code;
    response.message = error.message;
  }

  return response;
}
