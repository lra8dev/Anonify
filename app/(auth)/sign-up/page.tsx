"use client";

import { useState } from "react";
import { useDebounceCallback } from "usehooks-ts";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useCheckUsername } from "../_hooks/controllers";
import { useSignUpForm } from "../_hooks/handlers";
import { cn } from "@/lib/utils";

const SignUpPage = () => {
  const [username, setUsername] = useState("");
  const { signUpForm, control, handleSubmit, onSubmit, isPending } =
    useSignUpForm();
  const { data, isLoading, error } = useCheckUsername(username);
  const debounced = useDebounceCallback(setUsername, 300);

  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-md p-8 space-y-8 rounded-lg shadow-md bg-gray-200 dark:bg-gray-800">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Join Anonify
          </h1>
          <p className="mb-4">Sign up to continue your secret conversations</p>
        </div>
        <Form {...signUpForm}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="username"
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="username"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        debounced(e.target.value);
                      }}
                    />
                  </FormControl>
                  {isLoading && (
                    <Loader2 size={18} className="animate-spin" aria-hidden />
                  )}
                  <p
                    className={cn(
                      "text-sm",
                      data?.success ? "text-green-500" : "text-red-500"
                    )}
                  >
                    {data?.message || error?.message}
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email" {...field} />
                  </FormControl>
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
                  <FormControl>
                    <Input type="password" placeholder="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={isPending}
              className="cursor-pointer"
            >
              {isPending && <Loader2 className="animate-spin" />} Signup
            </Button>
          </form>
        </Form>
        <div className="text-center mt-4">
          <div>
            Already a member?{" "}
            <Link
              href="/sign-in"
              className="text-blue-400 hover:text-blue-500 underline underline-offset-2"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
