"use client";

import type { ComponentProps } from "react";
import { SubmitButton } from "@/components/admin/SubmitButton";

type DeleteButtonProps = ComponentProps<typeof SubmitButton> & {
  confirmMessage?: string;
};

export function DeleteButton({
  confirmMessage = "Delete this item? This can't be undone.",
  onClick,
  children = "Delete",
  ...props
}: DeleteButtonProps) {
  return (
    <SubmitButton
      {...props}
      onClick={(e) => {
        if (!confirm(confirmMessage)) {
          e.preventDefault();
          return;
        }
        onClick?.(e);
      }}
    >
      {children}
    </SubmitButton>
  );
}
