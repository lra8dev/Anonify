"use client";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useSignInForm } from "../_hooks/handlers";
import { OAuthSignin } from "@/components/oauth-signin";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";

const SignInPage = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? undefined;
  const { signInForm, control, handleSubmit, onSubmit, isLoading } =
    useSignInForm();

  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-200 dark:bg-gray-800 rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Welcome Back to Anonify
          </h1>
          <p className="mb-4">Sign in to continue your secret conversations</p>
        </div>
        <Form {...signInForm}>
          <form
            onSubmit={handleSubmit((data) => onSubmit(data, callbackUrl))}
            className="space-y-6"
          >
            {signInForm.formState.errors.root && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-md text-sm">
                {signInForm.formState.errors.root.message}
              </div>
            )}
            <FormField
              name="emailOrUsername"
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email/Username</FormLabel>
                  <Input {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <Input type="password" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="w-full cursor-pointer"
              type="submit"
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="animate-spin" />} Sign In
            </Button>
            <Separator />
            <OAuthSignin callbackUrl={callbackUrl} isPending={isLoading} />
          </form>
        </Form>
        <div className="text-center mt-4">
          <div>
            Not a member yet?{" "}
            <Link
              href="/sign-up"
              className="text-blue-400 hover:text-blue-500 underline underline-offset-2"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
