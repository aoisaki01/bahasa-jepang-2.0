"use client";

import { useState, useRef, useEffect } from "react";
import { MessageBubble, ChatMessage } from "./MessageBubble";
import { Button } from "@/components/ui/button";
import { Send, Sparkles, RefreshCcw, Loader2, Moon, Sun } from "lucide-react";
import Link from "next/link";
import { characterProfile } from "@/lib/character";
import { cn } from "@/lib/utils";

export default function ChatInterface() {
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isDarkMode, setIsDarkMode] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Initialize theme
    useEffect(() => {
        // Check local storage or system preference
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "light") {
            setIsDarkMode(false);
            document.documentElement.classList.remove("dark");
        } else {
            setIsDarkMode(true);
            document.documentElement.classList.add("dark");
        }
    }, []);

    const toggleTheme = () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);
        if (newMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    };

    // Initial mock message
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            role: "assistant",
            content: "Halo! Namaku Yuriko. Ayo belajar Bahasa Jepang bersama!",
            structured: {
                tokens: [
                    { text: "こんにちは", reading: "Konnichiwa", meaning: "Halo / Selamat Siang" },
                    { text: "！", reading: "" },
                    { text: "私", reading: "わたし", meaning: "Saya" },
                    { text: "の", reading: "" },
                    { text: "名前", reading: "なまえ", meaning: "Nama" },
                    { text: "は" },
                    { text: "百合子", reading: "ゆりこ", meaning: "Yuriko" },
                    { text: "です" },
                    { text: "！" }
                ],
                translation: "Halo! Namaku Yuriko. Senang bertemu denganmu!"
            }
        }
    ]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading, error]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMsg: ChatMessage = { role: "user", content: input };
        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    messages: [...messages.map(m => ({
                        role: m.role,
                        content: m.structured?.tokens.map(t => t.text).join("") || m.content
                    })), { role: 'user', content: input }]
                })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
            }

            const result = await response.json();

            const assistantMsg: ChatMessage = {
                role: "assistant",
                content: result.original_text || "Error processing response",
                structured: {
                    tokens: result.furigana_text || [],
                    translation: result.translation || "No translation available"
                }
            };

            setMessages(prev => [...prev, assistantMsg]);
        } catch (err: any) {
            console.error("Chat error:", err);
            setError(err.message || "Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleRetry = () => {
        setError(null);
    };

    return (
        <div className="flex flex-col h-[100dvh] bg-background text-foreground transition-colors duration-500">
            {/* Minimal Header */}
            <header className="flex items-center justify-between px-4 py-3 border-b sm:border-none sticky top-0 bg-background/80 backdrop-blur-md z-20">
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground hover:bg-muted" asChild>
                        <Link href="/">
                            <span className="text-xl">←</span>
                        </Link>
                    </Button>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                        <span className="font-medium text-lg text-foreground">{characterProfile.name}</span>
                        <span className="text-muted-foreground text-sm">1.5 Flash</span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        onClick={toggleTheme}
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground hover:text-foreground rounded-full"
                    >
                        {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    </Button>
                </div>
            </header>

            {/* Messages Area - Centered but Wider */}
            <div className="flex-1 overflow-y-auto scroll-smooth custom-scrollbar relative">
                <div className="w-full max-w-5xl mx-auto p-4 sm:py-8">
                    {/* Welcome / Empty State */}
                    {messages.length === 0 && (
                        <div className="flex flex-col items-center justify-center h-[50vh] text-center space-y-4">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-400 p-[2px]">
                                <div className="w-full h-full rounded-full overflow-hidden bg-background relative">
                                    <img src={characterProfile.avatar} alt="Avatar" className="w-full h-full object-cover" />
                                </div>
                            </div>
                            <h1 className="text-2xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-400">
                                Hello, Student
                            </h1>
                            <p className="text-muted-foreground max-w-md">
                                I'm Yuriko. How can I help you learn Japanese today?
                            </p>
                        </div>
                    )}

                    {messages.map((msg, idx) => (
                        <MessageBubble key={idx} message={msg} />
                    ))}

                    {isLoading && (
                        <div className="flex items-center gap-3 ml-0 sm:ml-0 mt-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <div className="w-8 h-8 rounded-full overflow-hidden shrink-0">
                                <img src={characterProfile.avatar} alt="Avatar" className="w-full h-full object-cover animate-pulse" />
                            </div>
                            <div className="flex items-center gap-1">
                                <span className="w-1.5 h-1.5 bg-foreground/50 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                <span className="w-1.5 h-1.5 bg-foreground/50 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                <span className="w-1.5 h-1.5 bg-foreground/50 rounded-full animate-bounce"></span>
                            </div>
                        </div>
                    )}

                    {error && (
                        <div className="flex flex-col items-start p-4 mt-4 bg-destructive/10 text-destructive border border-destructive/20 rounded-xl">
                            <p className="text-sm font-medium mb-2">{error}</p>
                            <Button onClick={handleRetry} variant="outline" size="sm" className="bg-background hover:bg-muted border-destructive/30 text-destructive">
                                <RefreshCcw className="w-3 h-3 mr-2" />
                                Try Again
                            </Button>
                        </div>
                    )}

                    <div ref={messagesEndRef} className="h-4" />
                </div>
            </div>

            {/* Input Area - Floating Pill */}
            <div className="p-4 bg-background z-20">
                <div className="w-full max-w-4xl mx-auto">
                    <form onSubmit={handleSubmit} className="relative group">
                        <div className="relative flex items-end gap-2 bg-[#f0f4f9] dark:bg-[#1e1f20] rounded-[28px] px-2 py-2 transition-all focus-within:ring-2 ring-blue-500/20">
                            <Button
                                type="button"
                                size="icon"
                                variant="ghost"
                                className="h-10 w-10 rounded-full text-muted-foreground hover:bg-background/50 ml-1 shrink-0"
                            >
                                <span className="text-xl">+</span>
                            </Button>

                            <input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask Yuriko..."
                                className="flex-1 bg-transparent border-0 focus:ring-0 text-base py-3 px-2 min-h-[48px] max-h-[200px] text-foreground placeholder:text-muted-foreground focus:outline-none"
                                disabled={isLoading}
                            />

                            <Button
                                type="submit"
                                size="icon"
                                disabled={!input.trim() || isLoading}
                                className={cn(
                                    "h-10 w-10 rounded-full shrink-0 transition-all duration-200",
                                    input.trim()
                                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                                        : "bg-transparent text-muted-foreground hover:bg-background/50"
                                )}
                            >
                                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                            </Button>
                        </div>
                        <div className="text-center mt-2">
                            <p className="text-[10px] text-muted-foreground">
                                Gemini can make mistakes, so double-check it.
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
