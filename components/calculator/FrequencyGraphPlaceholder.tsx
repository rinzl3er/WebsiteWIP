"use client";

export function FrequencyGraphPlaceholder() {
  return (
    <div className="w-full h-48 sm:h-64 rounded-xl border border-border/20 bg-ink-soft/30 relative overflow-hidden flex flex-col items-center justify-center group">
      <div className="absolute inset-0 grid-lines opacity-10" />
      
      {/* Decorative gradient background */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
      
      <div className="relative flex flex-col items-center gap-6 text-muted-foreground/30 group-hover:text-primary/40 transition-colors duration-700">
        <svg viewBox="0 0 100 40" className="w-48 h-20 stroke-current fill-none stroke-[1.5]" strokeLinecap="round" strokeLinejoin="round">
          <path d="M0,20 Q20,10 40,20 T80,20 T100,20" className="opacity-50" />
          <path d="M0,25 Q30,5 50,25 T100,25" className="opacity-20" />
          <path d="M0,15 Q20,25 40,15 T80,15 T100,15" className="opacity-20" />
        </svg>
        <p className="text-xs font-mono uppercase tracking-widest bg-ink-soft/80 px-3 py-1 rounded">Graph generated after calculations</p>
      </div>
    </div>
  );
}
