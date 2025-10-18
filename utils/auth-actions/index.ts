"use server";

import { OnSignInParams } from "@/types";
import { signIn, signOut } from "@/auth";

export const onSignIn = async ({
  provider,
  data,
  callbackUrl = "/dashboard",
}: OnSignInParams) => {
  await signIn(provider, { ...data, redirectTo: callbackUrl });
};

export const onSignOut = async () => {
  await signOut({ redirectTo: "/sign-in" });
};
