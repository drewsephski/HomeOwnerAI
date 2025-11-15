"use client";

import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { NavLink } from "@/components/NavLink";
import { UserMenu } from "@/components/UserMenu";
import { ThemeToggle } from "@/components/theme-toggle";

const navigationItems = [
  {
    href: "/pricing",
    label: "Pricing",
  },
  {
    href: "/how-it-works",
    label: "How It Works",
  },
  {
    href: "/setup",
    label: "Get Started",
  },
  {
    href: "/settings",
    label: "Settings",
  },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border/50 shadow-sm"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="shrink-0">
            <NavLink
              href="/"
              className="font-heading text-xl font-semibold tracking-tight px-2 py-1 rounded-md hover:bg-muted/50 transition-colors"
              activeClassName="text-foreground"
              inactiveClassName="text-muted-foreground"
            >
              Relay
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navigationItems.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                className="text-sm font-medium px-3 py-2 rounded-md transition-all duration-200"
                activeClassName="text-foreground bg-muted/50"
                inactiveClassName="text-muted-foreground hover:text-foreground hover:bg-muted/30"
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-2">
            <ThemeToggle />
            <UserMenu />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <Button
              variant="ghost"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-foreground hover:bg-muted/50 rounded-md transition-colors"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-background/95 backdrop-blur-sm border-t border-border/50 shadow-lg">
            <div className="px-4 py-4 space-y-1">
              {navigationItems.map((item) => (
                <NavLink
                  key={item.href}
                  href={item.href}
                  className="block text-sm font-medium px-3 py-3 rounded-md transition-all duration-200"
                  activeClassName="text-foreground bg-muted/50"
                  inactiveClassName="text-muted-foreground hover:text-foreground hover:bg-muted/30"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </NavLink>
              ))}
              <div className="border-t border-border/50 pt-4 mt-4">
                <UserMenu />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
