import { ReactNode } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export default function InfoModal({
  open, onOpenChange, title, eyebrow, children,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  title: string;
  eyebrow?: string;
  children: ReactNode;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-gold border-gold/30 max-w-2xl">
        <DialogHeader>
          {eyebrow && <div className="text-[10px] uppercase tracking-[0.3em] text-gold">{eyebrow}</div>}
          <DialogTitle className="font-display text-2xl md:text-3xl">{title}</DialogTitle>
          <DialogDescription asChild>
            <div className="text-muted-foreground mt-2 space-y-3">{children}</div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
