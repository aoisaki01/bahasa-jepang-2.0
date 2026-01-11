"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Languages, Volume2, Copy } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { characterProfile } from "@/lib/character";
import Image from "next/image";

export interface ChatToken {
    text: string;
    reading?: string;
    meaning?: string;
}

export interface ChatMessage {
    role: "user" | "assistant";
    content: string; // Fallback text
    structured?: {
        tokens: ChatToken[];
        translation: string;
    };
}

interface MessageBubbleProps {
    message: ChatMessage;
}

export function MessageBubble({ message }: MessageBubbleProps) {
    const isUser = message.role === "user";
    const [showTranslation, setShowTranslation] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
                "flex w-full mb-8",
                isUser ? "justify-end" : "justify-start"
            )}
        >
            {!isUser && (
                <div className="flex-shrink-0 mr-4 mt-1">
                    <div className="w-8 h-8 relative rounded-full overflow-hidden">
                        <Image
                            src={characterProfile.avatar}
                            alt="Yuriko"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            )}

            <div className={cn("flex flex-col max-w-[85%] sm:max-w-[75%]", isUser ? "items-end" : "items-start")}>
                {isUser && <div className="text-xs text-muted-foreground mb-1 mr-1">You</div>}
                {!isUser && <div className="text-xs text-muted-foreground mb-1 ml-1">{characterProfile.name}</div>}

                <div
                    className={cn(
                        "relative text-base leading-7 transition-all duration-300",
                        isUser
                            ? "bg-[#f0f4f9] dark:bg-[#1e1f20] text-foreground px-5 py-3 rounded-[20px] rounded-tr-sm"
                            : "pl-0"
                    )}
                >
                    {/* Main Content */}
                    <div className="font-ja min-h-[1.5em] flex flex-wrap items-end gap-x-[1px]">
                        {isUser ? (
                            <span>{message.content}</span>
                        ) : (
                            message.structured?.tokens?.map((token, idx) => {
                                if (token.reading) {
                                    return (
                                        <div key={idx} className="relative group/tooltip inline-block mx-0.5">
                                            <ruby className="bg-transparent transition-colors cursor-help">
                                                {token.text}
                                                <rt className="text-[0.6em] text-muted-foreground font-normal select-none">{token.reading}</rt>
                                            </ruby>
                                            {token.meaning && (
                                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover/tooltip:block z-50">
                                                    <div className="bg-black/80 backdrop-blur-sm text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap">
                                                        {token.meaning}
                                                        {/* Arrow */}
                                                        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] border-4 border-transparent border-t-black/80" />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                }
                                // Handle non-reading tokens that might still have meaning (unlikely for pure Gemini furigana but good to have)
                                if (token.meaning) {
                                    return (
                                        <span key={idx} className="relative group/tooltip inline-block mx-[0.5px] cursor-help border-b border-dotted border-muted-foreground/50">
                                            {token.text}
                                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover/tooltip:block z-50">
                                                <div className="bg-black/80 backdrop-blur-sm text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap">
                                                    {token.meaning}
                                                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] border-4 border-transparent border-t-black/80" />
                                                </div>
                                            </div>
                                        </span>
                                    );
                                }
                                return <span key={idx} className="mx-[0.5px]">{token.text}</span>;
                            }) || <span>{message.content}</span>
                        )}
                    </div>
                </div>

                {/* Translation (Assistant Only) */}
                {!isUser && message.structured && (
                    <div className="mt-3 w-full max-w-full">
                        <AnimatePresence>
                            {showTranslation && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0, y: -5 }}
                                    animate={{ opacity: 1, height: "auto", y: 0 }}
                                    exit={{ opacity: 0, height: 0, y: -5 }}
                                    className="text-muted-foreground text-sm mb-3 overflow-hidden pl-0 border-l-2 border-primary/50"
                                >
                                    <div className="pl-3 py-1">
                                        <p className="leading-snug">{message.structured.translation}</p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setShowTranslation(!showTranslation)}
                                className="text-xs flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors py-1 pl-0 pr-2 rounded"
                            >
                                <Languages className="w-3.5 h-3.5" />
                                {showTranslation ? "Hide translation" : "Show translation"}
                            </button>
                            <button
                                onClick={() => navigator.clipboard.writeText(message.content)}
                                className="text-xs flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors py-1 px-2 rounded"
                            >
                                <Copy className="w-3.5 h-3.5" />
                                Copy
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    );
}
