"use client";

import { Fragment } from "react";
import { Toaster } from "sonner";
import { ReactNodeProps } from "@/types";

export const SonnerProvider = ({ children }: ReactNodeProps) => {
  return (
    <Fragment>
      {children}
      <Toaster richColors />
    </Fragment>
  );
};
