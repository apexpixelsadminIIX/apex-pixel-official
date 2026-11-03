import { Link } from "@tanstack/react-router";
import * as React from "react";

type SmartLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string | undefined;
  activeClassName?: string | undefined;
  onClick?: (() => void) | undefined;
  ariaLabel?: string | undefined;
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

  const [pathWithQuery, hash] = href.split("#") as [string, string | undefined];
  const [rawPathname, query] = pathWithQuery.split("?") as [
    string,
    string | undefined,
  ];
  const pathname = rawPathname || "/";
  const search = query
    ? Object.fromEntries(new URLSearchParams(query))
    : undefined;
  const to = pathname as never;

  return (
    <Link
      to={to}
      search={search as never}
      {...(hash ? { hash } : {})}
      className={className}
      {...(activeClassName
        ? { activeProps: { className: activeClassName } }
        : {})}
      activeOptions={{ exact: pathname === "/" }}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </Link>
  );
}
