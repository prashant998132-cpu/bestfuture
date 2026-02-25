'use client';
// components/LinkCard.tsx

import { useState, useEffect } from 'react';
import { ExternalLink, Star, EyeOff, TrendingUp } from 'lucide-react';
import { type AILink } from '@/lib/links';
import { linkMemory, type LinkPreference } from '@/lib/memory';

interface Props {
  link: AILink;
  isHighlighted?: boolean;
}

const FREE_TYPE_LABELS = {
  free: { label: 'Free', className: 'badge-free' },
  freemium: { label: 'Freemium', className: 'badge-freemium' },
  limited: { label: 'Limited Free', className: 'badge-limited' },
  credits: { label: 'Free Credits', className: 'badge-credits' },
};

export default function LinkCard({ link, isHighlighted }: Props) {
  const [pref, setPref] = useState<LinkPreference>(() => linkMemory.get(link.id));

  // Refresh on external changes
  useEffect(() => {
    setPref(linkMemory.get(link.id));
  }, [link.id]);

  function handleOpen(e: React.MouseEvent) {
    e.preventDefault();
    linkMemory.recordUsage(link.id);
    setPref(linkMemory.get(link.id));
    window.open(link.url, '_blank', 'noopener,noreferrer');
  }

  function handleFavorite(e: React.MouseEvent) {
    e.stopPropagation();
    const newVal = linkMemory.toggleFavorite(link.id);
    setPref(prev => ({ ...prev, isFavorite: newVal }));
  }

  function handleHide(e: React.MouseEvent) {
    e.stopPropagation();
    linkMemory.toggleHidden(link.id);
    // Parent will re-filter
  }

  const freeInfo = FREE_TYPE_LABELS[link.freeType];

  return (
    <div
      className={`
        jarvis-card p-3 cursor-pointer group relative transition-all
        ${isHighlighted ? 'border-[#ff1a88] shadow-[0_0_15px_rgba(255,26,136,0.3)] scale-[1.01]' : ''}
        ${pref.isFavorite ? 'border-[rgba(255,200,0,0.3)]' : ''}
      `}
      onClick={handleOpen}
    >
      {/* Highlighted badge */}
      {isHighlighted && (
        <div className="absolute -top-1 -right-1 bg-[#ff1a88] text-white text-[9px] px-1.5 py-0.5 rounded-full font-bold">
          ✨ Best
        </div>
      )}

      <div className="flex items-start gap-2.5">
        {/* Icon */}
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center text-base flex-shrink-0"
          style={{ backgroundColor: `${link.color}20` }}
        >
          {link.icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-1">
            <span className="font-semibold text-sm text-white truncate">{link.name}</span>
            <ExternalLink size={12} className="text-gray-500 group-hover:text-[#ff1a88] transition-colors flex-shrink-0" />
          </div>

          <p className="text-[11px] text-gray-400 mt-0.5 line-clamp-1">{link.description}</p>

          {/* Bottom row */}
          <div className="flex items-center justify-between mt-1.5">
            {/* Free type badge */}
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${freeInfo.className}`}>
              {freeInfo.label}
            </span>

            {/* Actions + Usage */}
            <div className="flex items-center gap-1.5">
              {pref.usageCount > 0 && (
                <span className="text-[10px] text-gray-500 flex items-center gap-0.5">
                  <TrendingUp size={9} />
                  {pref.usageCount}
                </span>
              )}

              <button
                onClick={handleFavorite}
                className={`p-0.5 transition-colors ${pref.isFavorite ? 'text-yellow-400' : 'text-gray-600 hover:text-yellow-400'}`}
                title={pref.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                <Star size={13} fill={pref.isFavorite ? 'currentColor' : 'none'} />
              </button>

              <button
                onClick={handleHide}
                className="p-0.5 text-gray-600 hover:text-gray-400 transition-colors opacity-0 group-hover:opacity-100"
                title="Hide this tool"
              >
                <EyeOff size={13} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
