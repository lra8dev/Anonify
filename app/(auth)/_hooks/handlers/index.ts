"use client";

import { SignIn, signInSchema, SignUp, signUpSchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { onSignIn } from "@/utils/auth-actions";
import { useSignUp } from "../controllers";

export const useSignInForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const defaultValues = useMemo(
    (): SignIn => ({ emailOrUsername: "", password: "" }),
    []
  );

  const signInForm = useForm<SignIn>({
    resolver: zodResolver(signInSchema),
    defaultValues,
    mode: "onChange",
  });

  const { handleSubmit, control, reset } = signInForm;

  const onSubmit = async (payload: SignIn, callbackUrl?: string) => {
    setIsLoading(true);
    await onSignIn({ provider: "credentials", data: payload, callbackUrl });
    setIsLoading(false);
    reset();
  };

  return {
    signInForm,
    control,
    onSubmit,
    handleSubmit,
    isLoading,
  };
};

export const useSignUpForm = () => {
  const defaultValues = useMemo(
    (): SignUp => ({
      name: null,
      email: "",
      username: "",
      password: "",
      image: null,
    }),
    []
  );

  const signUpForm = useForm<SignUp>({
    resolver: zodResolver(signUpSchema),
    defaultValues,
    mode: "onChange",
  });

  const { signUp, isPending } = useSignUp();
  const { handleSubmit, control } = signUpForm;

  const onSubmit = (payload: SignUp) => {
    signUp(payload);
  };

  return {
    signUpForm,
    control,
    onSubmit,
    handleSubmit,
    isPending,
  };
};
