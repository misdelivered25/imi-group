import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/263785693657"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 grid place-items-center shadow-[0_0_30px_hsl(150_70%_40%/0.6)] animate-float hover:scale-110 transition-smooth"
    >
      <MessageCircle className="h-7 w-7 text-white" />
    </a>
  );
}
