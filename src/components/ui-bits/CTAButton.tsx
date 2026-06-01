import { forwardRef, ReactNode, ButtonHTMLAttributes } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

type Variant = "primary" | "gold" | "outline" | "whatsapp" | "ghost";
type Size = "sm" | "md" | "lg";

type Common = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  className?: string;
};

const cls = (variant: Variant = "primary", size: Size = "md", extra?: string) =>
  cn("btn-base", `btn-${variant}`, size === "sm" && "btn-sm", size === "lg" && "btn-lg", extra);

export function CTAButton({
  children, variant, size, iconLeft, iconRight, className, ...rest
}: Common & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cls(variant, size, className)} {...rest}>
      {iconLeft && <span className="btn-icon btn-icon-left">{iconLeft}</span>}
      <span>{children}</span>
      {iconRight && <span className="btn-icon btn-icon-right">{iconRight}</span>}
    </button>
  );
}

export function CTALink({
  children, variant, size, iconLeft, iconRight, className, to, href, target, ariaLabel,
}: Common & { to?: string; href?: string; target?: string; ariaLabel?: string }) {
  const content = (
    <>
      {iconLeft && <span className="btn-icon btn-icon-left">{iconLeft}</span>}
      <span>{children}</span>
      {iconRight && <span className="btn-icon btn-icon-right">{iconRight}</span>}
    </>
  );
  if (to) return <Link to={to} aria-label={ariaLabel} className={cls(variant, size, className)}>{content}</Link>;
  return <a href={href} target={target} rel={target === "_blank" ? "noreferrer" : undefined} aria-label={ariaLabel} className={cls(variant, size, className)}>{content}</a>;
}
