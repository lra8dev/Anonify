"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useFetchMessages } from "../../_hooks";
import { MessageCard } from "../message-card";

export const Messages = () => {
  const { messages, isPending } = useFetchMessages();

  if (isPending) {
    return <Skeleton className="w-full h-40 mt-4 rounded-xl" />;
  }

  return (
    <div className="grid md:grid-cols-2 gap-4 rounded-lg p-4">
      {!messages || messages.length === 0 ? (
        <div className="p-4 text-center text-muted-foreground">
          No messages found.
        </div>
      ) : (
        messages.map((msg) => (
          <MessageCard
            key={msg.id}
            id={msg.id}
            content={msg.content}
            createdAt={msg.createdAt}
          />
        ))
      )}
    </div>
  );
};
