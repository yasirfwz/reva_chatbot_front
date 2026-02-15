"use client";
import { useState } from "react";
import { MessageSquare, ChevronDown } from "lucide-react";
import ChatWindow from "./chat-window";
import { Message } from "@/types/chat";
import { sendChatMessage } from "@/lib/chat";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Welcome! I'm your Real Estate assistant. Looking for a home or just browsing?",
      sender: "bot",
    },
  ]);

  const handleSendMessage = async (text: string) => {
    // 1. Add User Message immediately
    const userMsg: Message = {
      id: Date.now().toString(),
      text,
      sender: "user",
    };
    setMessages((prev) => [...prev, userMsg]);

    // 2. Start loading state
    setIsTyping(true);

    // 3. Call Backend
    const botResponseText = await sendChatMessage(text);

    // 4. Add Bot Message and stop loading
    const botMsg: Message = {
      id: (Date.now() + 1).toString(),
      text: botResponseText,
      sender: "bot",
    };

    setMessages((prev) => [...prev, botMsg]);
    setIsTyping(false);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: "initial",
        text: "Chat cleared. How can I help you start your search?",
        sender: "bot",
      },
    ]);
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-4">
      {isOpen && (
        <ChatWindow
          messages={messages}
          onSendMessage={handleSendMessage}
          onClose={() => setIsOpen(false)}
          onClear={handleClearChat}
          isTyping={isTyping}
        />
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-zinc-900 text-white w-16 h-16 rounded-full shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300"
      >
        {isOpen ? <ChevronDown size={32} /> : <MessageSquare size={28} />}
      </button>
    </div>
  );
}
