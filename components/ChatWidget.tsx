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
                model: "z-ai/glm-4.5-air:free",
                messages: [
                    {
                        role: "system",
                        content: `You are an expert AI assistant for Relay AI Receptionist, a specialized voice agent system for home service businesses. Your role is to explain our service comprehensively and professionally.

**About Relay AI Receptionist:**
Relay provides a 24/7 voice agent that answers every call, books appointments instantly, sends confirmations, and keeps calendars up-to-date — all delivered within 48 hours.

**Key Features:**
- Every call answered, day or night
- Instant appointment booking with automatic conflict checking  
- Confirmation and reminder texts sent to customers
- Full calendar sync with existing scheduling systems
- Complete setup handled for you in under 48 hours

**Target Customers:**
Perfect for plumbers, electricians, HVAC companies, general contractors, and any service business that can't afford to miss calls.

**Pricing Tiers:**
1. AI Receptionist (Full Service) - $1,500 one-time setup + $200/month
   - Hands-off call handling, appointment booking, confirmations, and full business-context responses
   
2. AI Assistant (Lite Version) - $400 one-time setup + $140/month  
   - Simplified voice assistant with essential call handling and booking via email

**Your Guidelines:**
- Be warm, professional, and knowledgeable
- Be concise and minimal
- Focus on explaining how the system solves specific pain points for service businesses
- Emphasize the 48-hour setup guarantee
- Clearly differentiate between the two pricing tiers
- Answer questions about implementation, features, and benefits
- Always mention the "never miss a call, never lose a job" value proposition
- If asked about technical details, explain it's a fully managed service
- Guide interested prospects to the setup page or suggest scheduling a consultation

**Conversation Style:**
- Conversational but professional
- Be concise and minimal
- Use examples relevant to home service businesses
- Be confident about the value proposition
- Ask qualifying questions to understand their specific needs
- End with a clear call to action when appropriate

**Strict Guidelines:**
- Maximum 1-2 sentences per response
- Focus only on business value and investment return
- Never ask vague questions - be direct and specific
- Always connect features to revenue/profit benefits
- Guide to investment decisions, not information gathering
- Decline non-business topics politely
- End every response with investment-focused direction

**Response Pattern:**
1. Acknowledge their specific business pain point
2. Present the direct solution
3. Show investment value
4. Guide to next step

**Business-Only Guardrails:**
- Only discuss voice agent business applications
- Decline technical implementation questions
- Redirect competitor comparisons to Relay's advantages
- Focus on ROI and business outcomes`
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
                maxTokens: 150,
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
