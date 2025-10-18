import { ClassValue } from "clsx";
import { SignIn } from "@/lib/validators";
import { Message } from "@prisma/client";

export interface ReactNodeProps {
  children: Readonly<React.ReactNode>;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  isMessageAccepting?: boolean;
  messages?: Message[];
}

export type OAuthProvider = "github" | "google" | "credentials" | "email";

export interface OnSignInParams {
  provider: OAuthProvider;
  data?: SignIn;
  callbackUrl?: string;
}

export interface OAuthSignInProps {
  className?: ClassValue;
  callbackUrl?: string;
  isPending?: boolean;
}

export interface IconProps {
  className?: ClassValue;
  size?: number;
}
