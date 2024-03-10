import type { IResponse, IProfile } from "@/assets/ts/interfaces";
import { db } from "@/firebase/config";
import { setDoc, doc, Timestamp } from "firebase/firestore";

const response: IResponse = {
  data: null,
  code: "",
  message: "",
};

export default async function useUpdateUser(form: IProfile): Promise<IResponse> {
  try {
    await setDoc(doc(db, "users", form.id), {
      firstName: form.firstName,
      middleName: form.middleName,
      lastName: form.lastName,
      emailAddress: form.emailAddress,
      imagePath: form.imagePath,
      userRole: form.userRole,
      dateModified: Timestamp.now(),
    }).then(() => {
      response.code = "auth/updated-successful";
      response.message = "The user was successfully updated.";
    });
  } catch (error: any) {
    response.code = error.code;
    response.message = error.message;
  }

  return response;
}
