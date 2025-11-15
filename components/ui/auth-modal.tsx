"use client";

import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertCircle, FileText } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            <DialogTitle>Sign In Required</DialogTitle>
          </div>
          <DialogDescription className="text-base font-light">
            Sign in to save and organize your business information. Your data will be securely stored and accessible across devices.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="bg-muted/50 rounded-lg p-4 border border-border">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Benefits of signing in:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Save your organized business information</li>
                  <li>• Access your data from any device</li>
                  <li>• Automatic backups and synchronization</li>
                  <li>• Enhanced AI features and personalization</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-3">
            <SignInButton mode="modal" fallbackRedirectUrl="/settings">
              <Button className="w-full btn-lift">
                Sign In
              </Button>
            </SignInButton>
            <SignUpButton mode="modal" fallbackRedirectUrl="/settings">
              <Button variant="outline" className="w-full">
                Create Account
              </Button>
            </SignUpButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
