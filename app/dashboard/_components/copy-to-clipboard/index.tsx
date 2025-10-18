"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

interface CopyToClipboardProps {
  url: string;
}

export const CopyToClipboard = ({ url }: CopyToClipboardProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      await navigator.clipboard.writeText(url);
      toast.success("URL Copied!");
      setIsCopied(true);

      setTimeout(() => setIsCopied(false), 3000);
    } catch {
      toast.error("Failed to copy URL.");
      setIsCopied(false);
    }
  };

  return <Button onClick={handleCopy}>{isCopied ? "Copied!" : "Copy"}</Button>;
};
