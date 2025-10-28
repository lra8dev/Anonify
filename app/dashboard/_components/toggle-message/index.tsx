"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { RefreshCcw } from "lucide-react";
import { useFetchMessages, useMessageAccept } from "../../_hooks";
import { toast } from "sonner";

export const ToggleMessage = () => {
  const { onSwitchChange, isAccepting, isSwitchLoading } = useMessageAccept();
  const { refetch, isPending, isRefetching } = useFetchMessages();

  return (
    <div className="flex items-center justify-between border-b dark:border-gray-700 pb-4">
      <div className="flex items-center space-x-2">
        <Switch
          id="accept-messages"
          className="cursor-pointer"
          disabled={isSwitchLoading}
          checked={isAccepting}
          onCheckedChange={(checked) => onSwitchChange(checked)}
        />
        <Label htmlFor="accept-messages">Accept Messages</Label>
      </div>

      <Button
        className="mt-4"
        variant="outline"
        size="icon"
        aria-label="Refresh messages"
        disabled={isPending || isRefetching}
        onClick={async (e) => {
          e.preventDefault();
          await refetch();
          toast.success("Messages refreshed");
        }}
      >
        <RefreshCcw
          size={16}
          aria-hidden
          className={cn(isRefetching && "animate-spin")}
        />
      </Button>
    </div>
  );
};
