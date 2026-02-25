'use client';
import { useState, useEffect, useRef } from 'react';
import { Command } from 'lucide-react';

interface Props { onCommand: (cmd: string) => void; }

const COMMANDS = [
  { key: '/image',     label: 'Image Tools',    emoji: '🖼️' },
  { key: '/video',     label: 'Video Tools',     emoji: '🎬' },
  { key: '/code',      label: 'Code Tools',      emoji: '💻' },
  { key: '/design',    label: 'Design Tools',    emoji: '🎨' },
  { key: '/favorites', label: 'My Favorites',    emoji: '⭐' },
  { key: '/clear',     label: 'Clear Chat',      emoji: '🗑️' },
  { key: '/level',     label: 'My JARVIS Level', emoji: '💞' },
  { key: '/export',    label: 'Export Chat',     emoji: '📥' },
];

export default function CommandPalette({ onCommand }: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.key === 'k' && e.ctrlKey) || e.key === '/') { e.preventDefault(); setOpen(o => !o); setQuery(''); }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 50); }, [open]);

  const filtered = COMMANDS.filter(c =>
    c.label.toLowerCase().includes(query.toLowerCase()) || c.key.includes(query.toLowerCase())
  );

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 bg-black/60 backdrop-blur-sm"
         onClick={() => setOpen(false)}>
      <div className="w-full max-w-md bg-[#0d0d1f] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
           onClick={e => e.stopPropagation()}>
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
          <Command size={16} className="text-pink-400" />
          <input ref={inputRef} value={query} onChange={e => setQuery(e.target.value)}
            placeholder="Type a command..."
            className="flex-1 bg-transparent text-white outline-none text-sm placeholder:text-white/30" />
        </div>
        <div className="py-2 max-h-64 overflow-y-auto">
          {filtered.map(cmd => (
            <button key={cmd.key} onClick={() => { onCommand(cmd.key); setOpen(false); }}
              className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-white/5 text-left transition-colors">
              <span>{cmd.emoji}</span>
              <span className="text-white/80 text-sm">{cmd.label}</span>
              <span className="ml-auto text-white/30 text-xs font-mono">{cmd.key}</span>
            </button>
          ))}
        </div>
        <div className="px-4 py-2 border-t border-white/10 text-xs text-white/30 flex gap-4">
          <span>↵ select</span><span>esc close</span><span>ctrl+k toggle</span>
        </div>
      </div>
    </div>
  );
}
