"use client";

import { Button } from "@/components/ui/button";
import { formatDateTime } from "@/utils/format-datetime";
import { Loader2, X } from "lucide-react";
import { useDeleteMessage } from "../../_hooks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface MessageCardProps {
  id: string;
  content: string;
  createdAt: Date;
}

export const MessageCard = ({ id, content, createdAt }: MessageCardProps) => {
  const { deleteMessage, isDeletePending } = useDeleteMessage();

  return (
    <Card className="relative w-full bg-transparent border max-w-lg p-4 gap-2 rounded-lg">
      <CardHeader className="p-0">
        <CardTitle>{content}</CardTitle>
        <AlertDialog>
          <AlertDialogTrigger>
            <Button
              size="icon"
              disabled={isDeletePending}
              className="absolute z-50 -top-2 -right-2 rounded-full"
            >
              {isDeletePending ? (
                <Loader2 aria-hidden className="animate-spin" />
              ) : (
                <X
                  aria-hidden
                  className="size-5 hover:bg-muted-foreground rounded p-1 cursor-pointer"
                />
              )}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => deleteMessage(id)}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardHeader>
      <CardContent className="text-xs text-muted-foreground p-0">
        {formatDateTime(createdAt)}
      </CardContent>
    </Card>
  );
};
