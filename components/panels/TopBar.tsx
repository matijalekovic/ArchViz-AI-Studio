import React from 'react';
import { Undo, Redo, ZoomIn, ZoomOut, Menu, Share2 } from 'lucide-react';

export const TopBar: React.FC = () => {
  return (
    <header className="h-12 bg-surface-elevated border-b border-border flex items-center justify-between px-4 shrink-0 z-20">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-foreground rounded-sm flex items-center justify-center">
            <span className="text-surface-elevated font-bold text-xs">AV</span>
          </div>
          <span className="font-medium text-sm">ArchViz Studio</span>
        </div>
        <div className="h-4 w-px bg-border-strong mx-2" />
        <span className="text-sm text-foreground-secondary cursor-pointer hover:text-foreground">Untitled Project</span>
      </div>

      <div className="flex items-center gap-2">
        <button className="p-2 text-foreground-secondary hover:text-foreground hover:bg-surface-sunken rounded-md transition-colors">
          <Undo size={16} />
        </button>
        <button className="p-2 text-foreground-secondary hover:text-foreground hover:bg-surface-sunken rounded-md transition-colors">
          <Redo size={16} />
        </button>
        <div className="h-4 w-px bg-border-strong mx-2" />
        <button className="p-2 text-foreground-secondary hover:text-foreground hover:bg-surface-sunken rounded-md transition-colors">
          <ZoomOut size={16} />
        </button>
        <span className="text-xs font-mono w-12 text-center">100%</span>
        <button className="p-2 text-foreground-secondary hover:text-foreground hover:bg-surface-sunken rounded-md transition-colors">
          <ZoomIn size={16} />
        </button>
      </div>

      <div className="flex items-center gap-2">
        <button className="p-2 text-foreground-secondary hover:text-foreground hover:bg-surface-sunken rounded-md transition-colors flex items-center gap-2">
           <Share2 size={16} />
           <span className="text-xs font-medium">Share</span>
        </button>
        <button className="p-2 text-foreground-secondary hover:text-foreground hover:bg-surface-sunken rounded-md transition-colors">
          <Menu size={18} />
        </button>
      </div>
    </header>
  );
};
