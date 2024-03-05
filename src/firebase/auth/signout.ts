import type { IResponse } from "@/assets/ts/interfaces";
import { auth } from "@/firebase/config";
import { signOut } from "firebase/auth";

const response: IResponse = {
  data: null,
  code: "",
  message: "",
};

export default async function useSignOut(): Promise<IResponse> {
  try {
    await signOut(auth).then(() => {
      response.code = "auth/sign-out-successful";
      response.message = "The user was successfully signed out.";
    });
  } catch (error: any) {
    response.code = error.code;
    response.message = error.message;
  }

  return response;
}
