import { type User } from "firebase/auth";

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

export type { IFirebaseConfig, IResponse, ISignInForm };
