"use client";

import { useAuth, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export function UserMenu() {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return (
      <div className="flex items-center gap-2">
        <SignUpButton mode="modal">
          <Button
            variant="ghost"
            size="sm"
            className="hidden sm:block"
          >
            Sign Up
          </Button>
        </SignUpButton>
        <SignInButton mode="modal">
          <Button
            variant="default"
            size="sm"
            className="hidden sm:block"
          >
            Sign In
          </Button>
        </SignInButton>
        {/* Mobile auth buttons */}
        <div className="flex sm:hidden gap-1">
          <SignUpButton mode="modal">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-xs"
            >
              Sign Up
            </Button>
          </SignUpButton>
          <SignInButton mode="modal">
            <Button
              variant="default"
              size="sm"
              className="h-8 px-2 text-xs"
            >
              Sign In
            </Button>
          </SignInButton>
        </div>
      </div>
    );
  }

  return (
    <UserButton
      appearance={{
        elements: {
          avatarBox: "w-8 h-8",
          userButtonOuterBox: "relative",
          userButtonBox: "flex items-center justify-center",
          userButtonTrigger: "relative h-8 w-8 rounded-full p-0 hover:bg-muted/50 transition-colors",
          userButtonPopoverCard: "border-border shadow-lg",
          userButtonPopoverActionButton: "text-foreground hover:bg-muted/50",
          userButtonPopoverMain: "p-2",
          userButtonPopoverFooter: "border-t border-border p-2"
        }
      }}
      afterSignOutUrl="/"
    />
  );
}