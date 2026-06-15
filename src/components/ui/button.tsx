import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "ghost" | "outline";
  size?: "default" | "sm";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-offset-slate-950",
          variant === "default" &&
            "bg-brand-600 text-white shadow-sm hover:bg-brand-700 dark:bg-brand-500 dark:hover:bg-brand-400",
          variant === "ghost" &&
            "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800",
          variant === "outline" &&
            "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800",
          size === "default" && "h-10 px-4 py-2",
          size === "sm" && "h-8 px-3 text-xs",
          className,
        )}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button };
