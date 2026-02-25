'use client';
import { useEffect, useState } from 'react';
import { relationship, LEVEL_CONFIG } from '@/lib/relationship';

export default function RelationshipBar() {
  const [data, setData] = useState({ level: 1 as 1|2|3|4|5, totalInteractions: 0 });

  useEffect(() => { setData(relationship.get()); }, []);

  const config = LEVEL_CONFIG[data.level];
  const thresholds = [5, 25, 100, 500];
  const next = data.level < 5 ? thresholds[data.level - 1] : null;
  const progress = next ? Math.min((data.totalInteractions / next) * 100, 100) : 100;

  return (
    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs">
      <span>{config.emoji}</span>
      <span className="text-white/60">{config.name}</span>
      {next && (
        <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-pink-500 rounded-full transition-all" style={{ width: `${progress}%` }} />
        </div>
      )}
    </div>
  );
}
