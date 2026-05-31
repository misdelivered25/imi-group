import { useState } from "react";
import { Bot, X, Send, Sparkles } from "lucide-react";

export default function AIChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hello! I'm IMI Assistant. How can I help you grow your business today?" },
  ]);
  const [input, setInput] = useState("");

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages((m) => [...m, { from: "user", text: input }, { from: "bot", text: "Thanks! Our team will follow up shortly. You can also book a consultation directly." }]);
    setInput("");
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        aria-label="AI Assistant"
        className="fixed bottom-6 left-6 z-50 h-14 w-14 rounded-full bg-gradient-to-br from-primary to-primary-glow grid place-items-center glow-blue hover:scale-110 transition-smooth"
      >
        {open ? <X className="h-6 w-6 text-white" /> : <Bot className="h-7 w-7 text-white" />}
      </button>
      {open && (
        <div className="fixed bottom-24 left-6 z-50 w-[340px] max-w-[calc(100vw-3rem)] glass-gold rounded-2xl overflow-hidden animate-fade-up shadow-2xl">
          <div className="p-4 border-b border-border/60 flex items-center gap-2 bg-gradient-to-r from-primary/20 to-transparent">
            <Sparkles className="h-4 w-4 text-gold" />
            <div>
              <div className="text-sm font-semibold">IMI AI Assistant</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Powered by IMI Technologies</div>
            </div>
          </div>
          <div className="p-4 h-72 overflow-y-auto space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`text-sm px-3 py-2 rounded-xl max-w-[85%] ${m.from === "bot" ? "bg-muted/60" : "ml-auto bg-gradient-to-br from-primary to-primary-glow text-primary-foreground"}`}>
                {m.text}
              </div>
            ))}
          </div>
          <form onSubmit={send} className="p-3 border-t border-border/60 flex gap-2">
            <input value={input} onChange={(e)=>setInput(e.target.value)} placeholder="Ask anything..." className="flex-1 bg-input/60 rounded-full px-4 py-2 text-sm outline-none focus:ring-1 focus:ring-gold" />
            <button className="h-9 w-9 rounded-full bg-gold grid place-items-center text-background"><Send className="h-4 w-4" /></button>
          </form>
        </div>
      )}
    </>
  );
}
