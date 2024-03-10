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
  data: any | null;
  code: string | null;
  message: string | null;
}

interface ISignInForm {
  email: string;
  password: string;
}

interface ISignUpForm {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  role: Role;
  email: string;
  password: string;
}

interface IToastProps {
  title: string;
  description: string;
  variant: string;
  duration: number;
}

interface IProfile {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  emailAddress: string;
  userRole: string;
  imagePath: string | null;
}

export type { IFirebaseConfig, IResponse, ISignInForm, ISignUpForm, IToastProps, IProfile };
