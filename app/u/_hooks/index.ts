"use client";

import { Message, messageSchema } from "@/lib/validators";
import { ApiResponse } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const useSendMessage = () => {
  const { mutate: sendMessage, isPending } = useMutation({
    mutationFn: async (payload: Message) => {
      const response = await fetch("/api/send-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to send message");
      }

      return response.json();
    },

    onSuccess: (data: ApiResponse) => {
      if (!data.success) {
        toast.error(data.message, { id: "send-message-toast" });
      }

      toast.success(data.message, { id: "send-message-toast" });
    },

    onError: (err) => {
      toast.error(err.message, { id: "send-message-toast" });
    },
  });

  return { sendMessage, isPending };
};

export const useSendMessageForm = () => {
  const defaultValues = useMemo(
    (): Message => ({ username: "", content: "" }),
    []
  );

  const sendMessageForm = useForm<Message>({
    defaultValues,
    resolver: zodResolver(messageSchema),
  });

  const { sendMessage, isPending } = useSendMessage();

  const onSubmit = (payload: Message) => {
    sendMessage(payload);
    sendMessageForm.resetField("content");
  };

  return {
    onSubmit,
    isPending,
    sendMessageForm,
    handleSubmit: sendMessageForm.handleSubmit,
  };
};
