"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNodeProps } from "@/types";

export const AuthProvider = ({ children }: ReactNodeProps) => {
  return <SessionProvider>{children}</SessionProvider>;
};
