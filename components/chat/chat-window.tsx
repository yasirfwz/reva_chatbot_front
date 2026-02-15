"use client";
import { useEffect, useRef } from "react";
import { Message } from "@/types/chat";
import { Minus, Trash2 } from "lucide-react";
import ChatInput from "./chat-input";

interface ChatWindowProps {
  messages: Message[];
  onSendMessage: (text: string) => void;
  onClose: () => void;
  onClear: () => void;
  isTyping?: boolean;
}

export default function ChatWindow({
  messages,
  onSendMessage,
  onClose,
  onClear,
  isTyping,
}: ChatWindowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isTyping]);

  return (
    <div className="fixed bottom-27 right-6 w-[420px] h-8/10 bg-white/95 backdrop-blur-xl rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-200/60 flex flex-col overflow-hidden z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Header */}
      <div className="px-6 py-3 flex justify-between items-center border-b border-slate-100 bg-white/50">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-white font-bold text-sm">
              RV
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
          </div>
          <div>
            <h3 className="font-bold text-slate-900 leading-none">REVA AI</h3>
            <p className="text-[10px] font-medium text-emerald-600 uppercase tracking-widest mt-1">
              Online Now
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={onClear}
            title="Clear Chat"
            className="p-2 hover:bg-red-50 hover:text-red-500 rounded-full text-slate-400 transition-all"
          >
            <Trash2 size={18} />
          </button>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors"
          >
            <Minus size={20} />
          </button>
        </div>
      </div>

      {/* Message Area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/30 scrollbar-thin scrollbar-thumb-slate-200"
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] px-4 py-3 text-sm leading-relaxed shadow-sm transition-all duration-200 ${
                msg.sender === "user"
                  ? "bg-zinc-900 text-zinc-50 rounded-[1.25rem] rounded-tr-none"
                  : "bg-white border border-slate-100 text-slate-800 rounded-[1.25rem] rounded-tl-none"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start animate-in fade-in duration-300">
            <div className="bg-white border border-slate-100 px-4 py-4 rounded-[1.25rem] rounded-tl-none shadow-sm">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-slate-100">
        <ChatInput onSendMessage={onSendMessage} disabled={isTyping} />
      </div>
    </div>
  );
}
