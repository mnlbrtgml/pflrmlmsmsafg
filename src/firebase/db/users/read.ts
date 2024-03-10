import type { IResponse } from "@/assets/ts/interfaces";
import { db } from "@/firebase/config";
import { doc, getDoc } from "firebase/firestore";

const response: IResponse = {
  data: null,
  code: "",
  message: "",
};

export default async function useReadUser(uid: string): Promise<IResponse> {
  try {
    const userRef = doc(db, "users", uid);
    const user = await getDoc(userRef);

    if (user.exists()) {
      response.data = user.data();
      response.code = "auth/src/firebase/db/users/create.ts";
      response.message = "The user was successfully created.";
    } else {
      response.code = "auth/user-not-found";
      response.message = "The user was not found.";
    }
  } catch (error: any) {
    response.code = error.code;
    response.message = error.message;
  }

  return response;
}
