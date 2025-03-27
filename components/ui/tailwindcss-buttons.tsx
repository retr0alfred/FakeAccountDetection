"use client";
import React from "react";
import { cn } from "../../lib/utils";

export const ButtonsCard = ({
  children,
  className,
  onClick,
}: {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "h-60 w-full bg-white rounded-xl border border-neutral-200 dark:bg-black dark:border-white/[0.1] hover:border-neutral-300 group/btn overflow-hidden relative flex items-center justify-center transition-all",
        className
      )}
    >
      <div className="absolute inset-0 dark:bg-dot-white/[0.05] bg-dot-black/[0.05]" />
      <div className="relative z-40">{children}</div>
    </div>
  );
};
