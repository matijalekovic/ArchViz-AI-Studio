
import React from 'react';
import { useAppStore } from '../../../store';
import { 
  Box, FileCode, Grid, Eraser, Layers, RectangleVertical, Pencil, Maximize2, Cuboid, Video, CheckCircle2, Settings, ChevronRight, HelpCircle, Sparkle, Wrench, Brush
} from 'lucide-react';
import { cn } from '../../../lib/utils';
import { Render3DPanel } from './Render3DPanel';
import { CadToRenderPanel } from './CadToRenderPanel';
import { MasterplanPanel } from './MasterplanPanel';
import { VisualEditPanel } from './VisualEditPanel';
import { ExplodedPanel } from './ExplodedPanel';
import { SectionPanel } from './SectionPanel';
import { SketchPanel } from './SketchPanel';
import { UpscalePanel } from './UpscalePanel';
import { ImageToCadPanel } from './ImageToCadPanel';
import { ImageTo3DPanel } from './ImageTo3DPanel';
import { VideoPanel } from './VideoPanel';
import { ValidationPanel } from './ValidationPanel';

export const RightPanel: React.FC = () => {
  const { state, dispatch } = useAppStore();
  const { rightPanelOpen, rightPanelWidth, mode } = state;

  if (mode === 'generate-text') return null;

  if (!rightPanelOpen) {
    return (
      <div className="w-12 bg-background-tertiary border-l border-border relative flex flex-col items-center py-4 gap-4">
        <button 
          onClick={() => dispatch({ type: 'TOGGLE_RIGHT_PANEL' })}
          className="p-2 text-foreground-muted hover:text-foreground hover:bg-surface-sunken rounded-md transition-all"
          title="Expand Panel"
        >
          <ChevronRight size={20} className="rotate-180" />
        </button>
        <div className="flex-1 flex items-center justify-center">
            <span 
              className="text-xs font-bold text-foreground-muted uppercase tracking-widest whitespace-nowrap transform rotate-180" 
              style={{ writingMode: 'vertical-rl' }}
            >
              Settings
            </span>
        </div>
      </div>
    );
  }

  let panelContent: React.ReactNode = null;
  let panelTitle = "Settings";
  let PanelIcon = Settings;

  switch (mode) {
      case 'generate-text': panelTitle = "Image Generation"; PanelIcon = Sparkle; panelContent = null; break;
      case 'render-3d': panelTitle = "3D to Render"; PanelIcon = Box; panelContent = <Render3DPanel />; break;
      case 'render-cad': panelTitle = "CAD to Render"; PanelIcon = FileCode; panelContent = <CadToRenderPanel />; break;
      case 'masterplan': panelTitle = "Masterplan"; PanelIcon = Grid; panelContent = <MasterplanPanel />; break;
      case 'visual-edit': panelTitle = "Visual Editor"; PanelIcon = Wrench; panelContent = <VisualEditPanel />; break;
      case 'exploded': panelTitle = "Exploded View"; PanelIcon = Layers; panelContent = <ExplodedPanel />; break;
      case 'section': panelTitle = "Render to Section"; PanelIcon = RectangleVertical; panelContent = <SectionPanel />; break;
      case 'render-sketch': panelTitle = "Sketch to Render"; PanelIcon = Brush; panelContent = <SketchPanel />; break;
      case 'upscale': panelTitle = "Upscaler"; PanelIcon = Maximize2; panelContent = <UpscalePanel />; break;
      case 'img-to-cad': panelTitle = "Image to CAD"; PanelIcon = FileCode; panelContent = <ImageToCadPanel />; break;
      case 'img-to-3d': panelTitle = "Image to 3D"; PanelIcon = Cuboid; panelContent = <ImageTo3DPanel />; break;
      case 'video': panelTitle = "Video Studio"; PanelIcon = Video; panelContent = <VideoPanel />; break;
      case 'material-validation': panelTitle = "Validation"; PanelIcon = CheckCircle2; panelContent = <ValidationPanel />; break;
      default: panelTitle = "Settings"; panelContent = <div className="p-4 text-center text-xs text-foreground-muted">Select a workflow</div>;
  }

  return (
    <div 
      className={cn(
        "bg-background-tertiary border-l border-border flex flex-col overflow-hidden transition-all relative z-10",
        rightPanelWidth ? `w-[${rightPanelWidth}px]` : "w-[320px]"
      )}
    >
      <div className="shrink-0 p-5 pb-3 bg-background-tertiary border-b border-border-subtle flex justify-between items-center">
          <div className="flex items-center gap-2">
              <PanelIcon size={16} className="text-foreground-secondary"/>
              <h2 className="text-sm font-bold tracking-tight text-foreground">{panelTitle}</h2>
          </div>
          <div className="flex items-center gap-1">
            <button className="text-foreground-muted hover:text-foreground p-1"><HelpCircle size={14}/></button>
            <button 
                onClick={() => dispatch({ type: 'TOGGLE_RIGHT_PANEL' })}
                className="text-foreground-muted hover:text-foreground hover:bg-surface-sunken p-1 rounded-md transition-colors"
            >
                <ChevronRight size={16} />
            </button>
          </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-5">
         {panelContent}
      </div>
    </div>
  );
};
