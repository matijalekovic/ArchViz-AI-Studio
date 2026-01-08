import React, { useEffect } from 'react';
import { AppProvider, useAppStore } from './store';
import { TopBar } from './components/panels/TopBar';
import { LeftSidebar } from './components/panels/left/LeftSidebar';
import { RightPanel } from './components/panels/right/RightPanel';
import { BottomPanel } from './components/panels/bottom/BottomPanel';
import { ImageCanvas } from './components/canvas/ImageCanvas';
import { FloatingGenerateButton } from './components/FloatingGenerateButton';
import { GenerationMode } from './types';

const ShortcutsListener: React.FC = () => {
  const { state, dispatch } = useAppStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if input is focused
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;

      // Cmd/Ctrl + Enter = Generate
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault();
        if (state.uploadedImage && !state.isGenerating) {
           const btn = document.querySelector('button[aria-label="generate-trigger"]') as HTMLButtonElement;
           if (btn) btn.click();
        }
      }

      // Cmd/Ctrl + S = Export
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault();
        alert('Export Triggered (Simulation)');
      }

      // Mode Switching (Cmd + 1-9)
      if (e.metaKey || e.ctrlKey) {
        const modes: GenerationMode[] = [
          'render-3d', 'render-cad', 'masterplan', 'visual-edit', 
          'exploded', 'section', 'render-sketch', 'upscale', 'img-to-cad', 'img-to-3d', 'video'
        ];
        const num = parseInt(e.key);
        if (num >= 1 && num <= 9 && modes[num - 1]) {
           dispatch({ type: 'SET_MODE', payload: modes[num - 1] });
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [state.uploadedImage, state.isGenerating, dispatch]);

  return null;
};

const Layout: React.FC = () => {
  return (
    <div className="h-screen flex flex-col bg-background text-foreground overflow-hidden font-sans selection:bg-accent selection:text-foreground">
      <TopBar />
      <ShortcutsListener />
      <div className="flex-1 flex overflow-hidden">
        <LeftSidebar />
        <div className="flex-1 flex flex-col min-w-0 relative">
          <ImageCanvas />
          <FloatingGenerateButton />
          <BottomPanel />
        </div>
        <RightPanel />
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <Layout />
    </AppProvider>
  );
}