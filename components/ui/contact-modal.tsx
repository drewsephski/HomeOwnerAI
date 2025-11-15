"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Mail, Send, User, MessageSquare, FileText } from "lucide-react";
import { toast } from "sonner";



interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  organizedInfo: string;
}

export function ContactModal({ isOpen, onClose, organizedInfo }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    emailContent: "",
  });
  const [isSending, setIsSending] = useState(false);

  // Initialize email content when organizedInfo changes
  useEffect(() => {
    if (organizedInfo) {
      const defaultEmailContent = `${organizedInfo}`;
      setFormData(prev => ({ 
        ...prev, 
        emailContent: defaultEmailContent 
      }));
    }
  }, [organizedInfo]);

  // Update email content when user details change
  useEffect(() => {
    if (organizedInfo && formData.emailContent) {
      // Extract the business info part (everything before the last "---")
      const businessInfoMatch = formData.emailContent.match(/(.+?)(---\n|$)/s);
      const businessInfoPart = businessInfoMatch ? businessInfoMatch[1] : '';
      
      const updatedContent = `${businessInfoPart}`;
      setFormData(prev => ({ 
        ...prev, 
        emailContent: updatedContent 
      }));
    }
  }, [formData.name, formData.email, formData.message, organizedInfo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    try {
      console.log('Submitting form with data:', {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        emailContentLength: formData.emailContent.length
      });

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          emailContent: formData.emailContent,
        }),
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      const data = await response.json();
      console.log('Response data:', data);

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      } 
      setFormData({ name: "", email: "", message: "", emailContent: "" });
      onClose();
      toast.success("Message sent successfully! We'll get back to you within 24 hours.");
    } catch (error) {
      console.error('Error sending contact form:', error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5" />
            <DialogTitle>Send Business Information</DialogTitle>
          </div>
          <DialogDescription className="text-base font-light">
            Send your organized business information along with a message. We&apos;ll get back to you within 24 hours.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Content Editor */}
          <div className="bg-muted/50 rounded-lg p-4 border border-border">
            <div className="flex items-center gap-2 mb-3">
              <FileText className="w-4 h-4" />
              <h4 className="font-medium text-sm">Email Content (Editable)</h4>
            </div>
            <Textarea
              id="emailContent"
              placeholder="Email content will appear here..."
              value={formData.emailContent}
              onChange={(e) => handleInputChange('emailContent', e.target.value)}
              className="min-h-[200px] text-sm font-mono"
              required
            />
            <p className="text-xs text-muted-foreground mt-2">
              Your business information is pre-filled and will be beautifully formatted in the email. You can edit this content before sending if needed.
            </p>
          </div>
          
          {/* Contact Form */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Your Name *
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Your Email *
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="message" className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Additional Message
              </Label>
              <Textarea
                id="message"
                placeholder="Any specific questions or details you'd like to share..."
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                rows={3}
              />
            </div>
          </div>
          
          <div className="flex gap-3 pt-4">
            <Button type="submit" disabled={isSending} className="flex-1 btn-lift">
              {isSending ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </>
              )}
            </Button>
            <Button type="button" variant="outline" onClick={onClose} disabled={isSending}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
