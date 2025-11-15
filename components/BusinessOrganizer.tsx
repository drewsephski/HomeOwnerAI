"use client";

import { useState, useEffect, useCallback } from "react";
import { Copy, Mail, FileText, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { saveBusinessInfo, getBusinessInfo } from "@/lib/supabase/business-info";
import { OpenRouter } from "@openrouter/sdk";
import ReactMarkdown from "react-markdown";
import { useAuth } from "@clerk/nextjs";
import { AuthModal } from "@/components/ui/auth-modal";
import { ContactModal } from "@/components/ui/contact-modal";
import { toast } from "sonner";

interface BusinessOrganizerProps {
  onSendOrganizedInfo?: (organizedInfo: string) => void;
}

export function BusinessOrganizer({ onSendOrganizedInfo }: BusinessOrganizerProps) {
  const { isSignedIn, userId } = useAuth();
  const [businessInfo, setBusinessInfo] = useState("");
  const [organizedInfo, setOrganizedInfo] = useState("");
  const [isOrganizing, setIsOrganizing] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  const openRouter = new OpenRouter({
    apiKey: process.env.NEXT_PUBLIC_OPENROUTER_API_KEY || "",
  });

  const loadBusinessInfo = useCallback(async () => {
    try {
      if (userId) {
        const savedInfo = await getBusinessInfo(userId);
        if (savedInfo) {
          setBusinessInfo(savedInfo.raw_info);
          setOrganizedInfo(savedInfo.organized_info);
        }
      }
    } catch (error) {
      console.error('Error loading business info:', error);
    }
  }, [userId]);

  useEffect(() => {
    if (isSignedIn && userId) {
      loadBusinessInfo();
    }
  }, [isSignedIn, userId, loadBusinessInfo]);

  const handleOrganizeBusinessInfo = async () => {
    if (!businessInfo.trim()) return;

    if (!isSignedIn) {
      setShowAuthModal(true);
      return;
    }

    setIsOrganizing(true);
    try {
      const result = await openRouter.chat.send({
        model: "openai/gpt-oss-20b:free",
        messages: [
          {
            role: "system",
            content: `You are a professional business information organizer and marketing specialist. Your task is to transform raw business information into an engaging, hierarchical, and visually appealing format that captures attention and builds trust.                                                                
## ORGANIZATION PRINCIPLES:
- Use hierarchical structure with clear visual hierarchy
- Create engaging section headers
- Use bullet points, sub-bullets, and nested formatting
- Avoid tables - use lists and descriptive formatting instead
- Make the content scannable and professional
- Add subtle marketing language to enhance appeal

## REQUIRED SECTIONS (use these exact headers):

🏢 **BUSINESS OVERVIEW**
- Company name and tagline
- Mission statement or core value proposition
- Years in business (if mentioned)
- Brief company description

📞 **CONTACT & AVAILABILITY**
- Primary contact methods (phone, email, website)
- Business hours with clear formatting
- Emergency/after-hours availability
- Response time expectations

🎯 **SERVICES & EXPERTISE**
- Primary services with brief descriptions
- Specializations or unique capabilities
- Service delivery methods
- Industries served (if applicable)

⏰ **SERVICE AREA & HOURS**
- Geographic coverage areas
- Service availability windows
- Emergency service capabilities
- Scheduling preferences

💰 **PRICING & PAYMENT**
- Pricing structure overview
- Payment methods accepted
- Insurance information (if applicable)
- Free estimates or consultations

🌟 **UNIQUE VALUE PROPOSITION**
- What makes this business special
- Competitive advantages
- Customer service philosophy
- Quality guarantees or promises

📋 **CALL TO ACTION**
- How customers should get started
- Next steps for interested clients
- Special offers or promotions
- Contact encouragement

## FORMATTING REQUIREMENTS:
- Use **bold** for emphasis on key points
- Use bullet points (•) for lists
- Use nested bullet points for sub-items
- Keep sentences relatively short and scannable
- Add professional but friendly tone
- Include clear contact information
- End with a strong call to action

Transform the user's raw business information into this professional, organized format.`
          },
          {
            role: "user",
            content: businessInfo.trim()
          }
        ],
        temperature: 0.7,
      });

      const organizedContent = result.choices[0]?.message?.content || "Unable to organize business information.";
      setOrganizedInfo(typeof organizedContent === 'string' ? organizedContent : JSON.stringify(organizedContent));

      // Save to database if user is authenticated
      if (userId) {
        await saveBusinessInfo(userId, businessInfo.trim(), typeof organizedContent === 'string' ? organizedContent : JSON.stringify(organizedContent));
      }

      toast.success("Business information organized successfully!");
    } catch (error) {
      console.error("Error organizing business info:", error);
      setOrganizedInfo("An error occurred while organizing your business information. Please try again.");
      toast.error("Failed to organize business information");
    } finally {
      setIsOrganizing(false);
    }
  };

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(organizedInfo);
      toast.success("Business information copied to clipboard!");
    } catch (error) {
      console.error("Failed to copy to clipboard:", error);
      toast.error("Failed to copy to clipboard");
    }
  };

  const handleEmailInfo = () => {
    if (!isSignedIn) {
      setShowAuthModal(true);
      return;
    }
    setShowContactModal(true);
  };

  const handleSendAsMessage = () => {
    if (onSendOrganizedInfo && organizedInfo) {
      onSendOrganizedInfo(organizedInfo);
      toast.success("Business information added to your message!");
    }
  };

  return (
    <>
      <Card className="p-8 border border-border">
        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="w-5 h-5 text-primary" />
          <h2 className="font-heading text-2xl">Business Information Organizer</h2>
        </div>
        
        <div className="space-y-6">
          <div>
            <Label htmlFor="business-info" className="text-base font-medium mb-3 block">
              Paste Your Business Information
            </Label>
            <Textarea
              id="business-info"
              placeholder="Paste all your business information here - services, hours, contact details, service area, pricing, etc. The AI will organize it into a clean, professional format..."
              value={businessInfo}
              onChange={(e) => setBusinessInfo(e.target.value)}
              className="min-h-[150px] resize-none"
            />
          </div>

          <div className="flex gap-3">
            <Button 
              onClick={handleOrganizeBusinessInfo}
              disabled={!businessInfo.trim() || isOrganizing}
              className="flex-1"
            >
              {isOrganizing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Organizing...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Organize Information
                </>
              )}
            </Button>
          </div>

          {organizedInfo && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-base font-medium">Organized Business Information</Label>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopyToClipboard}
                    className="flex items-center gap-2"
                  >
                    <Copy className="w-4 h-4" />
                    Copy
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleEmailInfo}
                    className="flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    Email
                  </Button>
                  {onSendOrganizedInfo && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleSendAsMessage}
                      className="flex items-center gap-2"
                    >
                      <FileText className="w-4 h-4" />
                      Add to Message
                    </Button>
                  )}
                </div>
              </div>
              
              <div className="bg-muted/50 rounded-lg p-6 border border-border">
                <div className="prose prose-sm max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground">
                  <ReactMarkdown
                    components={{
                      ul: ({children}) => <ul className="list-disc list-inside space-y-1">{children}</ul>,
                      ol: ({children}) => <ol className="list-decimal list-inside space-y-1">{children}</ol>,
                      li: ({children}) => <li className="ml-2">{children}</li>,
                      strong: ({children}) => <strong className="font-semibold">{children}</strong>,
                    }}
                  >
                    {organizedInfo}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal 
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
        />
      )}

      {/* Contact Modal */}
      {showContactModal && (
        <ContactModal
          isOpen={showContactModal}
          onClose={() => setShowContactModal(false)}
          organizedInfo={organizedInfo}
        />
      )}
    </>
  );
}
