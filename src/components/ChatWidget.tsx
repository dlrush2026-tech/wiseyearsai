import { useState } from "react";
import { MessageSquare, X, Send, Bot, Check } from "lucide-react";

interface ChatWidgetProps {
  onOpenBooking: () => void;
}

export function ChatWidget({ onOpenBooking }: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Array<{ sender: "bot" | "user"; text: string }>>([
    {
      sender: "bot",
      text: "Hello! Welcome to Wise Years Ai. How can Dee assist your team with practical AI training or consulting today?",
    },
  ]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input;
    setMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Thank you for reaching out! Dee specializes in gentle, hands-on AI training for mature adults and organizational teams. Would you like to schedule a quick 15-minute consulting consultation?",
        },
      ]);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Chat Bubble Button matching screenshot badge */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="relative flex items-center justify-center w-14 h-14 rounded-full bg-gold hover:bg-gold-hover text-black shadow-xl transition-transform hover:scale-105 active:scale-95 cursor-pointer border-2 border-white/80"
          aria-label="Open chat"
        >
          <MessageSquare className="w-6 h-6 fill-black/20 text-black stroke-[2.2]" />
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-[#141414] border border-gold"></span>
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-[340px] sm:w-[380px] h-[480px] rounded-xl bg-[#1e1e1e] text-white border border-white/20 shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-150">
          {/* Header */}
          <div className="bg-[#141414] px-4 py-3 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gold/20 border border-gold flex items-center justify-center">
                <Bot className="w-4 h-4 text-gold" />
              </div>
              <div>
                <h4 className="text-sm font-semibold font-serif text-white">
                  Insightful Assistant
                </h4>
                <p className="text-[10px] text-green-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span> Online • Dee Rush
                  IT
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-md text-gray-400 hover:text-white hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#181818]/60 text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-lg px-3.5 py-2.5 leading-relaxed ${
                    m.sender === "user"
                      ? "bg-gold text-black font-medium"
                      : "bg-[#282828] text-gray-200 border border-white/5"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Action */}
          <div className="px-4 py-2 bg-[#1c1c1c] border-t border-white/5 flex gap-2">
            <button
              onClick={onOpenBooking}
              className="w-full text-center py-1.5 px-2 bg-gold/15 hover:bg-gold/25 border border-gold/40 text-gold rounded text-[11px] font-semibold tracking-wide transition-colors"
            >
              Book Consultation Directly →
            </button>
          </div>

          {/* Input Form */}
          <form
            onSubmit={handleSend}
            className="p-3 bg-[#141414] border-t border-white/10 flex gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question about AI training..."
              className="flex-1 bg-black/40 text-xs text-white border border-white/20 rounded px-3 py-2 placeholder-gray-500 focus:outline-none focus:border-gold"
            />
            <button
              type="submit"
              className="p-2 bg-gold hover:bg-gold-hover text-black rounded transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
