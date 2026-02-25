'use client';
// components/ChatBubble.tsx

import { Zap, User } from 'lucide-react';
import { type ChatMessage } from '@/lib/memory';

interface Props {
  message: ChatMessage;
}

export default function ChatBubble({ message }: Props) {
  const isJarvis = message.role === 'jarvis';

  // Parse markdown-style bold
  function renderContent(text: string) {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="text-[#ff1a88] font-semibold">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('_(') && part.endsWith(')_')) {
        return <em key={i} className="text-gray-500 text-xs">{part.slice(2, -2)}</em>;
      }
      return part;
    });
  }

  return (
    <div className={`flex gap-3 message-in ${isJarvis ? '' : 'flex-row-reverse'}`}>
      {/* Avatar */}
      <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center
        ${isJarvis
          ? 'bg-[rgba(255,26,136,0.2)] text-[#ff1a88]'
          : 'bg-[rgba(139,0,255,0.2)] text-purple-400'
        }`}
      >
        {isJarvis ? <Zap size={14} /> : <User size={14} />}
      </div>

      {/* Bubble */}
      <div className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed
        ${isJarvis
          ? 'bg-[#1a1a3c] border border-[rgba(255,26,136,0.15)] text-gray-200 rounded-tl-sm'
          : 'bg-[rgba(139,0,255,0.2)] text-white rounded-tr-sm'
        }`}
      >
        {message.content.split('\n').map((line, i) => (
          <p key={i} className={i > 0 ? 'mt-1' : ''}>
            {renderContent(line)}
          </p>
        ))}

        {/* Timestamp */}
        <p className="text-[10px] text-gray-500 mt-1 text-right">
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </div>
  );
}
