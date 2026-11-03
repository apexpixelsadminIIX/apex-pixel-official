import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";
import { SmartLink } from "./SmartLink";

/**
 * Apex Pixels button system. Orange is the primary accent and always carries
 * dark ink text. Outline buttons adapt to the section tone (dark or light).
 */
export const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange",
  {
    variants: {
      variant: {
        primary:
          "bg-orange text-ink shadow-glow-orange hover:brightness-110 hover:-translate-y-0.5",
        "outline-dark": "border border-white/25 text-on-dark hover:bg-white/10",
        "outline-light": "border border-ink/20 text-on-light hover:bg-ink/5",
        "ghost-dark": "text-on-dark-muted hover:text-orange",
        "ghost-light": "text-on-light-muted hover:text-orange",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-sm",
        lg: "h-12 px-7 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

type ButtonLinkProps = VariantProps<typeof buttonVariants> & {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  ariaLabel?: string;
};

export function ButtonLink({
  href,
  children,
  variant,
  size,
  className,
  onClick,
  ariaLabel,
}: ButtonLinkProps) {
  return (
    <SmartLink
      href={href}
      className={cn(buttonVariants({ variant, size }), className)}
      onClick={onClick}
      ariaLabel={ariaLabel}
    >
      {children}
    </SmartLink>
  );
}
