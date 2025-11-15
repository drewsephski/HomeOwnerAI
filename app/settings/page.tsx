"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@clerk/nextjs";
import { Copy, Mail, FileText } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { saveBusinessInfo, getBusinessInfo } from "@/lib/supabase/business-info";
import { OpenRouter } from "@openrouter/sdk";
import ReactMarkdown from "react-markdown";
import { Separator } from "@/components/ui/separator";
import Navigation from "@/components/Navigation";
import { AuthModal } from "@/components/ui/auth-modal";
import { ContactModal } from "@/components/ui/contact-modal";
import { toast } from "sonner";

const Settings = () => {
  const { isSignedIn, userId } = useAuth();
  const [businessInfo, setBusinessInfo] = useState("");
  const [organizedInfo, setOrganizedInfo] = useState("");
  const [isOrganizing, setIsOrganizing] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  const openRouter = new OpenRouter({
    apiKey: process.env.NEXT_PUBLIC_OPENROUTER_API_KEY || "",
  });

  // Load saved business info on component mount
  useEffect(() => {
    if (isSignedIn && userId) {
      loadBusinessInfo();
    }
  }, [isSignedIn, userId]);

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

  const handleOrganizeBusinessInfo = async () => {
    if (!businessInfo.trim()) return;

    // Check if user is authenticated
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

📍 **SERVICE AREA & COVERAGE**
- Geographic areas served
- Remote service capabilities
- Travel radius or delivery zones
- Service limitations (if any)

💰 **INVESTMENT & PRICING**
- Pricing structure (avoid tables - use descriptive format)
- Payment methods accepted
- Package options with clear benefits
- Value propositions and ROI points

✨ **KEY DIFFERENTIATORS**
- Unique selling propositions
- Competitive advantages
- Certifications, awards, or credentials
- Customer satisfaction highlights

## FORMATTING GUIDELINES:
- Use markdown with **bold** for emphasis
- Create nested bullet points for details
- Use horizontal rules (---) between major sections
- Ensure consistent spacing and readability
- Add call-to-action elements where appropriate

## TONE:
Professional yet approachable
Confident and trustworthy
Customer-focused
Slightly persuasive but not pushy

Transform the provided information following these guidelines. If a section has no relevant information, omit it entirely. The final output should be marketing-ready and impressive.`
          },
          {
            role: "user",
            content: businessInfo.trim()
          }
        ],
      });

      const organizedContent = typeof result.choices[0]?.message?.content === 'string' 
        ? result.choices[0]?.message?.content 
        : "Unable to organize information. Please try again.";

      setOrganizedInfo(organizedContent);
      
      // Save to database
      try {
        if (userId) {
          await saveBusinessInfo(userId, businessInfo.trim(), organizedContent);
        }
      } catch (error) {
        console.error("Error saving business info:", error);
      }
    } catch (error) {
      console.error("Error organizing business info:", error);
      setOrganizedInfo("An error occurred while organizing your business information. Please try again.");
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
    setShowContactModal(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-12 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          
          <div className="mb-12">
            <h1 className="font-heading text-4xl mb-2">Settings</h1>
            <p className="text-muted-foreground font-light">
              Configure your AI receptionist and service details
            </p>
          </div>

          {/* Business Info Organizer */}
          <Card className="p-8 border border-border mb-8">
            <div className="flex items-center gap-2 mb-6">
              <FileText className="w-5 h-5" />
              <h2 className="font-heading text-2xl">Business Information Organizer</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <Label htmlFor="business-info" className="text-base font-light mb-3 block">
                  Paste Your Business Information
                </Label>
                <Textarea
                  id="business-info"
                  placeholder="Paste all your business information here - services, hours, contact details, service area, pricing, etc. The AI will organize it into a clean, professional format..."
                  value={businessInfo}
                  onChange={(e) => setBusinessInfo(e.target.value)}
                  className="min-h-[150px] font-light resize-none"
                />
              </div>

              <div className="flex gap-3">
                <Button 
                  onClick={handleOrganizeBusinessInfo}
                  disabled={!businessInfo.trim() || isOrganizing}
                  className="btn-lift"
                >
                  {isOrganizing ? "Organizing..." : "Organize Information"}
                </Button>
              </div>

              {organizedInfo && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-base font-light">Organized Business Information</Label>
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
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 rounded-lg p-6 border border-border">
                    <ReactMarkdown
                      components={{
                        h1: ({ children }) => <h1 className="text-xl font-semibold mb-4">{children}</h1>,
                        h2: ({ children }) => <h2 className="text-lg font-semibold mb-3 mt-6">{children}</h2>,
                        h3: ({ children }) => <h3 className="text-base font-semibold mb-2 mt-4">{children}</h3>,
                        p: ({ children }) => <p className="mb-3 leading-relaxed">{children}</p>,
                        ul: ({ children }) => <ul className="list-disc list-inside space-y-1 mb-4">{children}</ul>,
                        ol: ({ children }) => <ol className="list-decimal list-inside space-y-1 mb-4">{children}</ol>,
                        li: ({ children }) => <li className="text-sm">{children}</li>,
                        strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                        em: ({ children }) => <em className="italic">{children}</em>,
                        table: ({ children }) => (
                          <div className="overflow-x-auto my-4">
                            <table className="min-w-full border-collapse border border-border rounded-lg">
                              {children}
                            </table>
                          </div>
                        ),
                        thead: ({ children }) => <thead className="bg-muted">{children}</thead>,
                        tbody: ({ children }) => <tbody>{children}</tbody>,
                        tr: ({ children }) => <tr className="border-b border-border">{children}</tr>,
                        th: ({ children }) => (
                          <th className="border border-border px-4 py-2 text-left font-semibold text-sm bg-muted/50">
                            {children}
                          </th>
                        ),
                        td: ({ children }) => (
                          <td className="border border-border px-4 py-2 text-sm">
                            {children}
                          </td>
                        ),
                        br: () => <br/>,
                      }}
                    >
                      {organizedInfo}
                    </ReactMarkdown>
                  </div>
                </div>
              )}
            </div>
          </Card>

          <Separator />
          <Tabs defaultValue="voice" className="space-y-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="voice">Voice & Tone</TabsTrigger>
              <TabsTrigger value="service">Service Details</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
            </TabsList>

            {/* Voice Settings */}
            <TabsContent value="voice">
              <Card className="p-8 border border-border">
                <h2 className="font-heading text-2xl mb-6">Voice Configuration</h2>
                
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="voice-style" className="text-base font-light mb-3 block">
                      Voice Style
                    </Label>
                    <Select defaultValue="calm">
                      <SelectTrigger id="voice-style">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="calm">Calm & Steady</SelectItem>
                        <SelectItem value="warm">Warm & Friendly</SelectItem>
                        <SelectItem value="direct">Direct & Efficient</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground font-light mt-2">
                      Choose the personality that best represents your business
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="greeting" className="text-base font-light mb-3 block">
                      Custom Greeting
                    </Label>
                    <Input 
                      id="greeting"
                      placeholder="Thank you for calling [Business Name]. How can I help you today?"
                      className="font-light"
                    />
                  </div>

                  <div>
                    <Label htmlFor="business-name" className="text-base font-light mb-3 block">
                      Business Name
                    </Label>
                    <Input 
                      id="business-name"
                      placeholder="Your Business Name"
                      className="font-light"
                    />
                  </div>

                  <Button className="btn-lift">Save Voice Settings</Button>
                </div>
              </Card>
            </TabsContent>

            {/* Service Details */}
            <TabsContent value="service">
              <Card className="p-8 border border-border">
                <h2 className="font-heading text-2xl mb-6">Service Information</h2>
                
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="service-area" className="text-base font-light mb-3 block">
                      Service Area
                    </Label>
                    <Input 
                      id="service-area"
                      placeholder="e.g., Portland Metro Area"
                      className="font-light"
                    />
                  </div>

                  <div>
                    <Label htmlFor="service-types" className="text-base font-light mb-3 block">
                      Service Types (comma separated)
                    </Label>
                    <Input 
                      id="service-types"
                      placeholder="HVAC, Plumbing, Electrical, Emergency Services"
                      className="font-light"
                    />
                  </div>

                  <div>
                    <Label htmlFor="avg-job-duration" className="text-base font-light mb-3 block">
                      Average Job Duration
                    </Label>
                    <Select defaultValue="2">
                      <SelectTrigger id="avg-job-duration">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 hour</SelectItem>
                        <SelectItem value="2">2 hours</SelectItem>
                        <SelectItem value="3">3 hours</SelectItem>
                        <SelectItem value="4">4+ hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="emergency" className="text-base font-light mb-3 block">
                      Emergency Handling
                    </Label>
                    <Select defaultValue="priority">
                      <SelectTrigger id="emergency">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="priority">Prioritize immediately</SelectItem>
                        <SelectItem value="schedule">Add to schedule</SelectItem>
                        <SelectItem value="custom">Custom routing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button className="btn-lift">Save Service Details</Button>
                </div>
              </Card>
            </TabsContent>

            {/* Schedule Settings */}
            <TabsContent value="schedule">
              <Card className="p-8 border border-border">
                <h2 className="font-heading text-2xl mb-6">Availability</h2>
                
                <div className="space-y-6">
                  <div>
                    <Label className="text-base font-light mb-4 block">
                      Business Hours
                    </Label>
                    <div className="space-y-4">
                      {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day) => (
                        <div key={day} className="flex items-center gap-4">
                          <span className="w-28 text-sm font-light">{day}</span>
                          <Input 
                            type="time" 
                            defaultValue="09:00"
                            className="font-light w-32"
                          />
                          <span className="text-muted-foreground">to</span>
                          <Input 
                            type="time" 
                            defaultValue="17:00"
                            className="font-light w-32"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="booking-buffer" className="text-base font-light mb-3 block">
                      Booking Buffer Time
                    </Label>
                    <Select defaultValue="30">
                      <SelectTrigger id="booking-buffer">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground font-light mt-2">
                      Time buffer between appointments
                    </p>
                  </div>

                  <Button className="btn-lift">Save Schedule Settings</Button>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      
      </main>
      
      {/* Auth Modal */}
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
      
      {/* Contact Modal */}
      <ContactModal 
        isOpen={showContactModal} 
        onClose={() => setShowContactModal(false)} 
        organizedInfo={organizedInfo} 
      />
    </div>
  );
};

export default Settings;
