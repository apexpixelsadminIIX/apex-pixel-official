import { Link } from "@tanstack/react-router";
import * as React from "react";

type SmartLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
  onClick?: () => void;
  ariaLabel?: string;
};

/**
 * Renders an external <a> for http(s) links and a typed TanStack <Link> for
 * internal paths. Supports "/path?query=1" and "/path#hash" href strings.
 */
export function SmartLink({
  href,
  children,
  className,
  activeClassName,
  onClick,
  ariaLabel,
}: SmartLinkProps) {
  if (/^https?:\/\//i.test(href)) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        onClick={onClick}
        aria-label={ariaLabel}
      >
        {children}
      </a>
    );
  }

  const [pathWithQuery, hash] = href.split("#");
  const [pathname, query] = pathWithQuery.split("?");
  const search = query
    ? Object.fromEntries(new URLSearchParams(query))
    : undefined;
  const to = (pathname || "/") as React.ComponentProps<typeof Link>["to"];

  return (
    <Link
      to={to}
      search={search as never}
      hash={hash || undefined}
      className={className}
      activeProps={activeClassName ? { className: activeClassName } : undefined}
      activeOptions={{ exact: pathname === "/" }}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </Link>
  );
}
