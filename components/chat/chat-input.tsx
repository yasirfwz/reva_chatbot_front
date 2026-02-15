"use client";
import { useState, useRef, useEffect } from "react";
import { ArrowUp } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  disabled?: boolean;
}

export default function ChatInput({ onSendMessage, disabled }: ChatInputProps) {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize logic for the textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "inherit";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${Math.min(scrollHeight, 120)}px`;
    }
  }, [input]);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || disabled) return;

    onSendMessage(input.trim());
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`relative flex items-end gap-2 bg-slate-100 rounded-[1.5rem] p-2 transition-all duration-200 ${
        disabled
          ? "opacity-60 cursor-not-allowed"
          : "focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:bg-slate-200/50"
      }`}
    >
      <textarea
        ref={textareaRef}
        rows={1}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={
          disabled
            ? "Waiting for response..."
            : "Ask about properties, areas..."
        }
        disabled={disabled}
        className="flex-1 bg-transparent text-sm px-3 py-2 focus:outline-none text-slate-900 placeholder:text-slate-400 resize-none min-h-[40px] max-h-[120px] leading-relaxed"
      />

      <button
        type="submit"
        disabled={!input.trim() || disabled}
        className={`flex-shrink-0 bg-zinc-900 text-white p-2.5 rounded-full transition-all duration-300 shadow-md ${
          !input.trim() || disabled
            ? "opacity-20 scale-90"
            : "hover:bg-zinc-800 hover:scale-105 active:scale-95"
        }`}
      >
        <ArrowUp
          size={18}
          strokeWidth={3}
          className={disabled ? "animate-pulse" : ""}
        />
      </button>
    </form>
  );
}
