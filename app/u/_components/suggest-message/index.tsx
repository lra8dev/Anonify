"use client";

import { useState } from "react";
import { RefreshCcw } from "lucide-react";
import { MESSAGES } from "@/constants";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { suggestedMessage } from "@/utils/suggest-message";
import type { useSendMessageForm } from "../../_hooks";

type Message = {
  content: string[];
  error: string;
};

interface SuggestMessageProps {
  form: ReturnType<typeof useSendMessageForm>;
}

export const SuggestMessage = ({ form }: SuggestMessageProps) => {
  const [message, setMessage] = useState<Message>({ content: [], error: "" });
  const [isPending, setIsPending] = useState(false);
  const { sendMessageForm } = form;

  const handleMessage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    sendMessageForm.setValue("content", e.currentTarget.textContent || "");
  };

  const getMessages = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsPending(true);

    const { messages, error } = await suggestedMessage();

    setMessage({ content: messages, error });
    setIsPending(false);
  };

  return (
    <div className="space-y-4 my-8">
      <div className="flex items-center justify-between gap-4">
        <p>Click on any message below to select it.</p>
        <Button size="icon" disabled={isPending} onClick={getMessages}>
          <RefreshCcw
            size={16}
            aria-hidden
            className={cn(isPending && "animate-spin")}
          />
        </Button>
      </div>
      <Card>
        <CardHeader>
          <h3 className="text-xl font-semibold">Messages</h3>
        </CardHeader>
        <CardContent className="flex flex-col space-y-4">
          {message.content.length > 0
            ? message.content.map((msg, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="mb-2"
                  onClick={handleMessage}
                >
                  {msg}
                </Button>
              ))
            : MESSAGES.map(({ content }) => (
                <Button
                  key={content}
                  variant="outline"
                  className="mb-2"
                  onClick={handleMessage}
                >
                  {content}
                </Button>
              ))}
        </CardContent>
      </Card>
    </div>
  );
};
