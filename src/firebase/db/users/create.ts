import type { IResponse, ISignUpForm } from "@/assets/ts/interfaces";
import { db } from "@/firebase/config";
import { setDoc, doc, Timestamp } from "firebase/firestore";

const response: IResponse = {
  data: null,
  code: "",
  message: "",
};

export default async function useCreateUser(form: ISignUpForm): Promise<IResponse> {
  try {
    await setDoc(doc(db, "users"), {
      firstName: form.firstName,
      middleName: form.middleName,
      lastName: form.lastName,
      emailAddress: form.email,
      imagePath: null,
      userRole: "admin",
      isActive: true,
      dateCreated: Timestamp.now(),
      dateModified: Timestamp.now(),
    }).then(() => {
      response.code = "auth/sign-up-successful";
      response.message = "The user was successfully created.";
    });
  } catch (error: any) {
    response.code = error.code;
    response.message = error.message;
  }

  return response;
}
