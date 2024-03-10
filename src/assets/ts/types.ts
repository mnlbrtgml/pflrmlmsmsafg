import { Variant } from "@/assets/ts/enums";

type ButtonVariant = Variant | null | undefined;

type PropsToast = {
  title: string | undefined;
  description: string | undefined;
  variant: "default" | "destructive" | null | undefined;
  duration: number | undefined;
};

type PropsDestructiveAlert = {
  useFunction: ((...args: any[]) => void) | undefined | undefined;
  trigger: string | undefined;
  title: string | undefined;
  description: string | undefined;
  action: string | undefined;
};

export type { ButtonVariant, PropsToast, PropsDestructiveAlert };
