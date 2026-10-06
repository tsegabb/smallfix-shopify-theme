import React from 'react';
import { ArrowRight } from 'lucide-react';

interface AnnouncementBarProps {
  show: boolean;
  text: string;
  onNavigateToCollection: () => void;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({
  show,
  text,
  onNavigateToCollection
}) => {
  if (!show) return null;

  return (
    <div className="bg-stone-950 text-stone-300 text-xs py-2 px-4 border-b border-stone-850 tracking-wider transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-center">
        <button
          onClick={onNavigateToCollection}
          className="hover:text-amber-300 transition-colors flex items-center gap-2 group cursor-pointer"
        >
          <span className="font-medium uppercase tracking-wider">{text}</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
