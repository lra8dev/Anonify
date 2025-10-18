"use client";

import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { SignUp } from "@/lib/validators";
import { ApiResponse } from "@/types";
import { toast } from "sonner";

export const useSignUp = () => {
  const router = useRouter();

  const { mutate: signUp, isPending } = useMutation({
    mutationKey: ["auth", "signup"],

    mutationFn: async (payload: SignUp) => {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data: ApiResponse = await response.json();
        throw new Error(data.message || "Failed to sign up");
      }

      return response.json();
    },

    onSuccess: (data: ApiResponse) => {
      if (!data.success) {
        toast.error(data.message, { id: "sign-up-toast" });
        return;
      }

      toast.success(data.message, { id: "sign-up-toast" });
      router.replace("/sign-in");
    },
    onError: (err) => {
      toast.error(err.message, { id: "sign-up-toast" });
      router.refresh();
    },
  });

  return { signUp, isPending };
};

export const useCheckUsername = (username: string) => {
  const { data, isPending, error } = useQuery({
    queryKey: ["auth", "check-username", username],
    queryFn: async () => {
      const response = await fetch(`/api/auth/check-username/${username}`);

      if (!response.ok) {
        throw new Error(`Failed to check username: ${response.statusText}`);
      }

      return response.json();
    },
    enabled: username.trim().length > 0,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  return { data, isLoading: isPending, error };
};
