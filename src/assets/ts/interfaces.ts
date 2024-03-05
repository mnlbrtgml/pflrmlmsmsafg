import { type User } from "firebase/auth";
import { Role } from "@/assets/ts/enums";

interface IFirebaseConfig {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

interface IResponse {
  data: User | null;
  code: string | null;
  message: string | null;
}

interface ISignInForm {
  email: string;
  password: string;
}

interface ISignUpForm {
  firstName: string;
  middleName: string;
  lastName: string;
  role: Role;
  email: string;
  password: string;
}

export type { IFirebaseConfig, IResponse, ISignInForm, ISignUpForm };
