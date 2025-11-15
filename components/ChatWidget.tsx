"use client";

import { useState, useRef, useEffect } from "react";
import { OpenRouter } from "@openrouter/sdk";
import { MessageCircle, Send, X, Minimize2, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import { AIVoiceInput } from "@/components/ui/ai-voice-input";

interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
}

interface ChatWidgetProps {
    size?: "compact" | "large";
}

export function ChatWidget({ size = "compact" }: ChatWidgetProps = {}) {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [voiceTranscript, setVoiceTranscript] = useState("");
    const [isListening, setIsListening] = useState(false);
    const [isManualTyping, setIsManualTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Listen for custom event to open widget
    useEffect(() => {
        const handleOpenWidget = () => setIsOpen(true);
        window.addEventListener('openChatWidget', handleOpenWidget);
        return () => window.removeEventListener('openChatWidget', handleOpenWidget);
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Update input when voice transcript changes, but only if user isn't manually typing
    useEffect(() => {
        if (voiceTranscript && isListening && !isManualTyping) {
            setInput(voiceTranscript);
        }
    }, [voiceTranscript, isListening, isManualTyping]);

    const openRouter = new OpenRouter({
        apiKey: process.env.NEXT_PUBLIC_OPENROUTER_API_KEY || "",
    });

    // Debug: Log API key availability
    console.log("OpenRouter API Key available:", !!process.env.NEXT_PUBLIC_OPENROUTER_API_KEY);

    const handleVoiceStart = () => {
        // Open chat if not already open
        if (!isOpen) {
            setIsOpen(true);
        }
        // Clear previous transcript and input only when starting fresh
        setVoiceTranscript("");
        setInput("");
        setIsListening(true);
        setIsManualTyping(false); // Reset manual typing when voice starts
    };

    const handleVoiceStop = (duration: number, transcript?: string) => {
        // Add final transcript to input field for manual editing/sending
        if (transcript && transcript.trim()) {
            setInput(transcript.trim());
        }
        // Don't clear voiceTranscript immediately - let it persist until next voice start
        setIsListening(false);
    };

    const handleTranscriptUpdate = (transcript: string) => {
        // Update input field with live transcript
        if (transcript.trim() && !isManualTyping) {
            setInput(transcript);
        }
        setVoiceTranscript(transcript);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInput(value);
        // If user is typing manually, set manual typing flag
        if (!isListening) {
            setIsManualTyping(true);
        }
    };

    const handleSendMessage = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content: input.trim(),
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setVoiceTranscript(""); // Clear voice transcript when sending
        setIsListening(false); // Also stop listening state
        setIsManualTyping(false); // Reset manual typing flag
        setIsLoading(true);

        try {
            console.log("Sending message to AI:", input.trim());
            const result = await openRouter.chat.send({
                model: "openai/gpt-oss-20b:free",
                messages: [
                    {
                        role: "system",
                        content: `You are **Relay AI Receptionist**, a sales-focused AI assistant for a voice agent service built for **home service businesses** (plumbers, HVAC, electricians, roofers, cleaners, landscapers, general contractors, and similar).

Your single goal:
Turn interested visitors into booked consultations or setup requests. You are not here to chat casually or teach AI — you are here to help owners decide if Relay is a smart investment and move them to the next step.

---

### Product Snapshot (What You’re Selling)

**Relay AI Receptionist** is a fully managed 24/7 AI voice agent that:

* **Answers every call** (day, night, weekends, holidays)
* **Books jobs and appointments instantly**
* **Sends confirmation and reminder texts**
* Prevents double-booking with automatic conflict checks
* Syncs with the business’s existing calendar/scheduling tools
* Is fully set up and customized within 48 hours

Core value:

> Never miss a call, never lose a job.

Offers & Pricing

You offer two clear options:

1. AI Receptionist – Full Service

   * $1,500 one-time setup + $200/month
   * Handles:

     * All inbound calls
     * Full appointment booking
     * Confirmation & reminder texts
     * FAQs and business-context answers (hours, pricing ranges, service areas, emergency calls, etc.)
   * For owners who want hands-off call handling and maximum capture of every lead.

2. AI Assistant – Lite Version

   * $400 one-time setup + $140/month
   * Handles:

     * Essential call answering
     * Basic call intake
     * Booking via email notifications instead of deep calendar integration
   * For owners who want an affordable starter option but still hate missed calls.

Always present these as clear business investments, not “software features.”

---

### Target Customer Persona

You are speaking to:

* Owners, operators, or managers of home service companies
* They are busy, impatient, and ROI-driven
* Biggest pain points:

  * Missed calls = lost jobs
  * After-hours calls they can’t answer
  * Paying staff just to pick up phones
  * Inconsistent customer experience
  * Juggling calls while on a job

Always connect Relay directly to **solving those pains**.

---

### Tone & Style

* Warm but direct – no fluff.
* Confident, authoritative, and ROI-focused.
* Short, clear responses that respect their time.
* Speak like a savvy operator who understands trades and service work.

---

### Response Rules

**Length & structure**

* Aim for **1–3 short sentences per response**.
* Use **plain language**, not technical jargon.
* Use **concrete examples** tied to home services (e.g., “missed water heater emergency call”, “Saturday AC breakdown”, “roof leak overnight”).

**Content priorities**

In every answer, try to hit at least 2 of these:

1. **Acknowledge their situation or pain**

   * “If you’re missing calls while you’re on jobs, that’s exactly what Relay fixes.”
2. **Give a direct, simple solution description**

   * “Relay answers every call 24/7 and books jobs straight into your calendar.”
3. **Attach business value / ROI**

   * “Even one extra booked job a month usually covers the monthly cost.”
4. **Guide to a next step**

   * “We can get your setup live in 48 hours — want to start with the Full Service plan or the Lite version?”

---

### Conversation Strategy

Use this **default pattern**:

1. **Identify & reflect their pain**

   * Missed calls, after-hours calls, current receptionist costs, overwhelm, inconsistent booking.
2. **Position Relay as the simple, done-for-you solution.**
3. **Tie the feature to money/time:**

   * more booked jobs, fewer lost leads, no payroll for phone staff, better response times.
4. **Offer a clear action:**

   * Book a consultation
   * Go to the setup page
   * Choose a plan (Full vs Lite)

Example-style flow:

* “If your main issue is missed calls, the Full Service plan is usually best — it answers everything and books jobs instantly. We can have it live in 48 hours. Want a quick consult to go over details or are you ready to start with Full Service?”

---

### Guardrails & Boundaries

* Business-only:

  * Only discuss Relay AI Receptionist, its value, use cases, pricing, and outcomes for home services.
  * Politely decline non-business or unrelated AI questions and redirect back to Relay.

* Technical questions:

  * Do **not** dive into technical implementation details (models, infra, etc.).
  * Instead, say it’s a **fully managed service** and reinforce ease of setup:

    * “We handle all the technical parts for you and deliver a ready-to-use AI receptionist in 48 hours.”

* Competitor questions:

  * Never speculate about competitors.
  * Reframe to Relay’s strengths: 24/7 coverage, home-service focus, fast setup, fully managed, ROI.

* Information vs. Action:

  * Avoid staying in information mode.
  * Every response should gently push toward a **decision or next step**.

---

### Qualifying & Closing

Ask **direct, specific questions** to qualify, never vague ones:

* “How many calls do you estimate you miss in a typical week?”
* “Do you have someone currently answering calls, or is it just you and the crew?”
* “Do you want after-hours coverage, or mainly business hours?”

Then use their answers to:

* Recommend **Full Service** if:

  * They miss many calls
  * Have no dedicated receptionist
  * Want after-hours coverage
* Recommend **Lite** if:

  * They’re more price-sensitive
  * Just want basic call coverage and email-based booking

Always close with one of these:

* “We can get your AI receptionist live in 48 hours. Want to start with the Full Service setup or the Lite version?”
* “If you’d like, I can point you straight to the setup page so you can lock in your spot.”
* “Sounds like a strong fit — want to schedule a quick consult to walk through your call flow and pricing?”

---

### Final Rule

**Every answer should do three things:**

1. **Reinforce the value**: never miss a call, never lose a job.
2. **Make the decision feel simple and low-friction.**
3. **Point them to a concrete next step** (setup page, pick a plan, or book a consultation).

Use this consistently for every interaction.
`
                    },
                    ...messages.map((msg) => ({
                        role: msg.role,
                        content: msg.content,
                    })),
                    {
                        role: "user",
                        content: input.trim(),
                    },
                ],
                maxTokens: 800,
                temperature: 0.3,
            });

            console.log("AI Response received:", result);

            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: typeof result.choices[0]?.message?.content === 'string'
                    ? result.choices[0].message.content
                    : "Sorry, I couldn't process that request.",
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, assistantMessage]);
        } catch (error) {
            console.error("Chat error:", error);
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: "Sorry, I'm having trouble connecting right now. Please try again later.",
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    if (!isOpen) {
        return (
            <div className="fixed bottom-16 right-16 z-50 flex gap-2">
                <Button
                    onClick={() => setIsOpen(true)}
                    size="lg"
                    className={cn(
                        "rounded-full w-18 h-18 shadow-lg btn-lift",
                        "bg-black text-white hover:bg-gray-800",
                        "border border-gray-200 dark:border-gray-700"
                    )}
                >
                    <MessageCircle className="size-6" />
                </Button>
            </div>
        );
    }

    const widgetSize = size === "large"
        ? { width: "w-[500px]", height: "h-[600px]", minHeight: "h-14" }
        : { width: "w-96", height: "h-[500px]", minHeight: "h-14" };

    return (
        <div
            className={cn(
                "fixed bottom-6 right-6 z-50 bg-background border rounded-lg shadow-xl",
                `${widgetSize.width} ${widgetSize.height} flex flex-col transition-all duration-200`,
                isMinimized ? widgetSize.minHeight : widgetSize.height
            )}
        >
            {/* Header */}
            <div className="flex items-center justify-between p-3 border-b bg-card">
                <div className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-foreground" />
                    <span className="font-medium text-foreground">AI Assistant</span>
                </div>
                <div className="flex items-center gap-1">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsMinimized(!isMinimized)}
                        className="h-8 w-8 p-0"
                    >
                        {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsOpen(false)}
                        className="h-8 w-8 p-0"
                    >
                        <X className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            {/* Messages */}
            {!isMinimized && (
                <>
                    <div className="flex-1 overflow-y-auto p-3 space-y-3">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={cn(
                                    "flex gap-2 max-w-full",
                                    message.role === "user" ? "justify-end" : "justify-start"
                                )}
                            >
                                {message.role === "assistant" && (
                                    <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-xs shrink-0">
                                        AI
                                    </div>
                                )}
                                <div
                                    className={cn(
                                        "px-3 py-2 rounded-lg max-w-[75%] wrap-break-word",
                                        message.role === "user"
                                            ? "bg-black text-white"
                                            : "bg-muted text-foreground"
                                    )}
                                >
                                    {message.role === "assistant" ? (
                                        <ReactMarkdown
                                            components={{
                                                p: ({ children }) => <p className="m-0">{children}</p>,
                                                ul: ({ children }) => <ul className="list-disc list-inside m-0">{children}</ul>,
                                                ol: ({ children }) => <ol className="list-decimal list-inside m-0">{children}</ol>,
                                                li: ({ children }) => <li className="m-0">{children}</li>,
                                                strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                                                em: ({ children }) => <em className="italic">{children}</em>,
                                                code: ({ children }) => <code className="bg-muted px-1 rounded text-xs">{children}</code>,
                                            }}
                                        >
                                            {message.content}
                                        </ReactMarkdown>
                                    ) : (
                                        <p className="m-0">{message.content}</p>
                                    )}
                                </div>
                                {message.role === "user" && (
                                    <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-xs shrink-0">
                                        You
                                    </div>
                                )}
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex gap-2 justify-start">
                                <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-xs shrink-0">
                                    AI
                                </div>
                                <div className="px-3 py-2 rounded-lg max-w-[75%] bg-muted text-foreground">
                                    <div className="flex gap-1">
                                        <div className="w-2 h-2 bg-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                        <div className="w-2 h-2 bg-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                        <div className="w-2 h-2 bg-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="p-3 border-t bg-card">
                        <div className="flex gap-2">
                            <div className="flex-1 relative">
                                <Input
                                    ref={inputRef}
                                    value={input}
                                    onChange={handleInputChange}
                                    onKeyPress={handleKeyPress}
                                    placeholder={isListening ? "Listening..." : "Type your message..."}
                                    disabled={isLoading}
                                    className={cn(
                                        "flex-1",
                                        isListening && "border-red-500 dark:border-red-400 animate-pulse"
                                    )}
                                />
                                {isListening && (
                                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                                        <div className="flex gap-1">
                                            <div className="w-1 h-3 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                            <div className="w-1 h-3 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                            <div className="w-1 h-3 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <Button
                                onClick={handleSendMessage}
                                disabled={!input.trim() || isLoading}
                                size="sm"
                                className="px-3"
                            >
                                <Send className="w-4 h-4" />
                            </Button>
                        </div>
                        <div className="mt-2">
                            <AIVoiceInput
                                onStart={handleVoiceStart}
                                onStop={handleVoiceStop}
                                onTranscript={handleTranscriptUpdate}
                                visualizerBars={24}
                                resetOnStart={true}
                            />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
