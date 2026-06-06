import { Link } from "react-router-dom";
import { Mail, MessageCircle, Instagram, Facebook, Globe } from "lucide-react";
import imiLogo from "@/assets/imi-logo.png.asset.json";


export default function Footer() {
  return (
    <footer className="mt-20 border-t border-border/60 bg-card/40 backdrop-blur">
      <div className="container mx-auto px-4 py-16 grid md:grid-cols-4 gap-10">
        <div>
          <div className="font-display text-xl font-bold">IMI <span className="text-gradient-gold">Technologies</span></div>
          <p className="mt-3 text-sm text-muted-foreground">Inquire. Motivate. Inspire.</p>
          <p className="mt-4 text-sm text-muted-foreground">Premium African technology company building websites, apps, AI, branding and media.</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gold uppercase tracking-wider">Quick Links</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {["About","Services","Portfolio","Projects","Pricing","Insights","Contact"].map(l=>(
              <li key={l}><Link to={`/${l.toLowerCase()}`} className="hover:text-gold transition-smooth">{l}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gold uppercase tracking-wider">Contact</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2"><MessageCircle className="h-4 w-4 text-gold" /> WhatsApp: 078 569 3657</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-gold" /> HGCPrivateLimited@gmail.com</li>
            <li className="flex items-center gap-2"><Globe className="h-4 w-4 text-gold" /> www.imitechnologies.co.zw</li>
            <li className="flex items-center gap-3 pt-2">
              <a href="https://instagram.com" aria-label="Instagram" className="hover:text-gold"><Instagram className="h-5 w-5" /></a>
              <a href="https://facebook.com" aria-label="Facebook" className="hover:text-gold"><Facebook className="h-5 w-5" /></a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gold uppercase tracking-wider">Newsletter</h4>
          <p className="mt-4 text-sm text-muted-foreground">Insights on AI, branding & growth in Africa.</p>
          <form onSubmit={(e)=>{e.preventDefault();}} className="mt-4 flex">
            <input type="email" required placeholder="you@email.com" className="flex-1 bg-input/60 border border-border rounded-l-md px-3 py-2 text-sm outline-none focus:border-gold" />
            <button className="rounded-r-md px-4 bg-gradient-to-r from-primary to-primary-glow text-primary-foreground text-sm font-medium">Join</button>
          </form>
        </div>
      </div>
      <div className="border-t border-border/60 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} IMI Technologies. Built in Africa for the world.
      </div>
    </footer>
  );
}
