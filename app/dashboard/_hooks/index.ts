"use client";

import { toast } from "sonner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ApiResponse } from "@/types";

const headers: HeadersInit = { "Content-Type": "application/json" };

export const useMessageAccept = () => {
  const queryClient = useQueryClient();

  const { data, error } = useQuery({
    queryKey: ["update-accept-messages", "switch"],
    queryFn: async () => {
      const response = await fetch("/api/accept-messages");

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const result: ApiResponse = await response.json();

      if (!result.success) {
        throw new Error(result.message);
      }

      return result;
    },

    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  if (error) {
    toast.error(error.message);
  }

  const { mutate: onSwitchChange, isPending: isSwitchLoading } = useMutation({
    mutationKey: ["update-accept-messages", "switch"],
    mutationFn: async (isMessageAccepting: boolean) => {
      const response = await fetch("/api/accept-messages", {
        method: "POST",
        headers,
        body: JSON.stringify({ isMessageAccepting }),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const result: ApiResponse = await response.json();

      if (!result.success) {
        throw new Error(result.message);
      }

      return result;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      return;
    },
    onError: (err) => {
      toast.error(err.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["update-accept-messages", "switch"],
      });
    },
  });

  return {
    onSwitchChange,
    isAccepting: data?.isMessageAccepting ?? false,
    isSwitchLoading,
  };
};

export const useFetchMessages = () => {
  const { data, refetch, isPending, error } = useQuery({
    queryKey: ["messages", "fetch"],
    queryFn: async () => {
      const response = await fetch("/api/fetch-messages");

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data: ApiResponse = await response.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      return data;
    },

    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  if (error) {
    toast.error(error.message);
  }

  return { refetch, messages: data?.messages, isPending };
};

export const useDeleteMessage = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteMessage, isPending: isDeletePending } = useMutation({
    mutationKey: ["messages", "delete"],
    mutationFn: async (messageId: string) => {
      const response = await fetch(`/api/delete-message/${messageId}`, {
        method: "DELETE",
        headers,
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const result: ApiResponse = await response.json();

      if (!result.success) {
        throw new Error(result.message);
      }

      return result;
    },
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (err) => {
      toast.error(err.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["messages", "fetch"],
      });
    },
  });

  return { deleteMessage, isDeletePending };
};
