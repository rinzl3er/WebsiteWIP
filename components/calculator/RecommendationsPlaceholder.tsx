"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function RecommendationsPlaceholder() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex gap-6 p-6 rounded-xl border border-border/20 bg-ink-soft/50 hover:bg-ink-soft transition-colors">
          <Skeleton className="w-12 h-12 rounded-full bg-border/20 shrink-0" />
          <div className="space-y-4 w-full pt-1">
            <Skeleton className="h-4 w-1/3 bg-border/20" />
            <Skeleton className="h-3 w-full bg-border/10" />
            <Skeleton className="h-3 w-4/5 bg-border/10" />
          </div>
        </div>
      ))}
    </div>
  );
}
