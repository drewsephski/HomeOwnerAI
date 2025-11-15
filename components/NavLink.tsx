"use client";

import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface NavLinkProps extends Omit<LinkProps, "className"> {
  className?: string;
  activeClassName?: string;
  inactiveClassName?: string;
  children: React.ReactNode;
  href: string;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({
    className,
    activeClassName = "text-foreground font-medium",
    inactiveClassName = "text-muted-foreground hover:text-foreground transition-colors",
    children,
    href,
    ...props
  }, ref) => {
    const pathname = usePathname();
    
    // Determine if the link is active
    const isActive = pathname === href ||
                   (href !== "/" && pathname.startsWith(href));
    
    const linkClassName = cn(
      "inline-flex items-center",
      isActive ? activeClassName : inactiveClassName,
      className
    );

    return (
      <Link
        ref={ref}
        href={href}
        className={linkClassName}
        {...props}
      >
        {children}
      </Link>
    );
  },
);

NavLink.displayName = "NavLink";

export { NavLink };
