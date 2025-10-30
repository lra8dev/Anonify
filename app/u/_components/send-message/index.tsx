"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { useSendMessageForm } from "../../_hooks";
import { useEffect } from "react";

interface SendMessageProps {
  username: string;
  form: ReturnType<typeof useSendMessageForm>;
}

export const SendMessage = ({ username, form }: SendMessageProps) => {
  const { sendMessageForm, isPending, handleSubmit, onSubmit } = form;

  useEffect(() => {
    if (username) {
      sendMessageForm.setValue("username", username);
    }
  }, []);

  return (
    <div className="mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-center">
        Public Profile Link
      </h1>
      <Form {...sendMessageForm}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={sendMessageForm.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Send Anonymous Message to @{username}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write your anonymous message here"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isPending || !sendMessageForm.watch("content")}>
            {isPending && (
              <Loader2 size={16} className="animate-spin" aria-hidden />
            )}
            Send it
          </Button>
        </form>
      </Form>
    </div>
  );
};
