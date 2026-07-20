"use client";

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine } from "recharts";
import { FrequencyBands, BANDS } from "@/features/acoustics/lib/acoustic-math";

interface FrequencyGraphProps {
  rt60: Record<FrequencyBands, number>;
  targetRT60: number;
  hasInput: boolean;
}

export function FrequencyGraph({ rt60, targetRT60, hasInput }: FrequencyGraphProps) {
  const data = BANDS.map((band) => ({
    frequency: `${band} Hz`,
    rt60: hasInput ? Number(rt60[band].toFixed(2)) : 0,
  }));

  // Calculate a reasonable Y-axis maximum based on the data, with a minimum of 2 seconds
  const maxDataValue = hasInput ? Math.max(...Object.values(rt60)) : 0;
  const yAxisMax = Math.max(2, Math.ceil(maxDataValue * 1.2));

  return (
    <div className="h-[300px] w-full mt-8">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.5} vertical={false} />
          <XAxis 
            dataKey="frequency" 
            stroke="var(--muted-foreground)" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false} 
            dy={10} 
          />
          <YAxis 
            stroke="var(--muted-foreground)" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false} 
            dx={-10} 
            domain={[0, yAxisMax]}
            tickFormatter={(val) => `${val}s`}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: "var(--background)", 
              borderColor: "var(--border)",
              borderRadius: "8px",
              boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)"
            }}
            itemStyle={{ color: "var(--foreground)" }}
            formatter={(value: unknown) => [`${Number(value).toFixed(2)} sec`, "RT60"]}
            labelStyle={{ color: "var(--muted-foreground)", marginBottom: "4px" }}
          />
          {hasInput && (
            <ReferenceLine 
              y={targetRT60} 
              stroke="var(--primary)" 
              strokeDasharray="4 4" 
              label={{ 
                position: 'insideTopLeft', 
                value: 'Target RT60', 
                fill: 'var(--primary)',
                fontSize: 12,
                offset: 10
              }} 
            />
          )}
          <Line 
            type="monotone" 
            dataKey="rt60" 
            stroke="var(--primary)" 
            strokeWidth={3}
            dot={{ r: 4, strokeWidth: 2, fill: "var(--background)" }}
            activeDot={{ r: 6, strokeWidth: 0, fill: "var(--primary)" }}
            animationDuration={1000}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
