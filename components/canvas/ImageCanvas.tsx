
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useAppStore } from '../../../store';
import { UploadCloud, Columns, Minimize2, MoveHorizontal, Move, AlertCircle, Play, Pause, RefreshCw } from 'lucide-react';
import { cn } from '../../lib/utils';

export const ImageCanvas: React.FC = () => {
  const { state, dispatch } = useAppStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  
  const [isDragging, setIsDragging] = useState(false);
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [isPlaying, setIsPlaying] = useState(false);

  // --- Handlers ---

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        dispatch({ type: 'SET_IMAGE', payload: ev.target?.result as string });
        handleFitToScreen();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
       const reader = new FileReader();
      reader.onload = (ev) => {
        dispatch({ type: 'SET_IMAGE', payload: ev.target?.result as string });
        handleFitToScreen();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleZoom = (delta: number) => {
    const newZoom = Math.max(0.1, Math.min(8, state.canvas.zoom * (1 - delta * 0.1)));
    dispatch({ type: 'SET_CANVAS_ZOOM', payload: newZoom });
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
       e.preventDefault();
       handleZoom(e.deltaY * 0.01);
    } else {
       handleZoom(e.deltaY * 0.005);
    }
  };

  const startPan = (e: React.MouseEvent) => {
    if (!state.uploadedImage) return;
    setIsPanning(true);
    setPanStart({ x: e.clientX - state.canvas.pan.x, y: e.clientY - state.canvas.pan.y });
  };

  const updatePan = (e: React.MouseEvent) => {
    if (!isPanning) return;
    const newPan = { x: e.clientX - panStart.x, y: e.clientY - panStart.y };
    dispatch({ type: 'SET_CANVAS_PAN', payload: newPan });
  };

  const endPan = () => {
    setIsPanning(false);
  };

  const handleFitToScreen = useCallback(() => {
     if (containerRef.current) {
        dispatch({ type: 'SET_CANVAS_PAN', payload: { x: 0, y: 0 } });
        dispatch({ type: 'SET_CANVAS_ZOOM', payload: 0.8 }); 
     }
  }, [dispatch]);

  const isDualViewMode = ['render-3d', 'render-cad', 'render-sketch'].includes(state.mode);
  const showSplit = isDualViewMode && state.workflow.canvasSync;
  const isCompare = state.mode === 'upscale' || state.workflow.videoState?.compareMode;
  const isVideo = state.mode === 'video';

  const transformStyle = {
     transform: `translate(${state.canvas.pan.x}px, ${state.canvas.pan.y}px) scale(${state.canvas.zoom})`,
     transition: isPanning ? 'none' : 'transform 0.1s ease-out'
  };

  return (
    <div className="flex-1 bg-[#E5E5E5] relative overflow-hidden flex flex-col">
       {/* Canvas Toolbar */}
       <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-surface-elevated/90 backdrop-blur border border-border rounded-lg p-1 shadow-sm select-none">
          <button 
             className="flex items-center gap-1 px-2 py-1 text-xs font-medium hover:bg-surface-sunken rounded text-foreground-secondary active:scale-95 transition-transform" 
             title="Fit to Screen (Reset View)"
             onClick={handleFitToScreen}
          >
             <Minimize2 size={14} /> Fit
          </button>
          
          {isDualViewMode && (
             <>
               <div className="w-px h-4 bg-border" />
               <button 
                 className={cn(
                   "flex items-center gap-1 px-2 py-1 text-xs font-medium rounded transition-colors active:scale-95",
                   state.workflow.canvasSync ? "bg-accent text-white" : "hover:bg-surface-sunken text-foreground-secondary"
                 )}
                 onClick={() => dispatch({ type: 'UPDATE_WORKFLOW', payload: { canvasSync: !state.workflow.canvasSync } })}
                 title="Toggle Side-by-Side View"
               >
                  <Columns size={14} /> {state.workflow.canvasSync ? 'Split' : 'Single'}
               </button>
             </>
          )}
          
          {isCompare && (
             <>
               <div className="w-px h-4 bg-border" />
               <button 
                 className={cn(
                   "flex items-center gap-1 px-2 py-1 text-xs font-medium rounded transition-colors",
                   state.workflow.compareMode ? "bg-accent text-white" : "hover:bg-surface-sunken text-foreground-secondary"
                 )}
                 onClick={() => dispatch({ type: 'UPDATE_VIDEO_STATE', payload: { compareMode: !state.workflow.videoState.compareMode } })}
               >
                  <MoveHorizontal size={14} /> Compare
               </button>
             </>
          )}
       </div>

      <div 
         ref={containerRef}
         className={cn(
            "flex-1 relative flex items-center justify-center bg-checkerboard overflow-hidden",
            isPanning ? "cursor-grabbing" : "cursor-grab"
         )}
         onWheel={handleWheel}
         onMouseDown={startPan}
         onMouseMove={updatePan}
         onMouseUp={endPan}
         onMouseLeave={endPan}
      >
         {/* Grid Pattern Background */}
         <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
            style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }} 
         />

         {state.uploadedImage ? (
            <div className="w-full h-full flex items-center justify-center pointer-events-none">
               {showSplit ? (
                  // Split View
                  <div 
                     className="flex gap-1 bg-background border border-border p-1 shadow-2xl origin-center"
                     style={transformStyle}
                  >
                     <div className="relative bg-surface-sunken">
                        <span className="absolute top-2 left-2 text-[10px] font-bold uppercase tracking-wider text-foreground-muted bg-surface-elevated px-2 py-1 rounded shadow-sm z-10 pointer-events-auto">Original</span>
                        <img 
                           ref={imgRef}
                           src={state.uploadedImage} 
                           className="max-h-[80vh] object-contain block" 
                           draggable={false}
                        />
                     </div>
                     <div className="w-px bg-border-strong" />
                     <div className="relative bg-surface-elevated">
                        <span className="absolute top-2 left-2 text-[10px] font-bold uppercase tracking-wider text-accent bg-surface-elevated px-2 py-1 rounded shadow-sm border border-accent/20 z-10 pointer-events-auto">Preview</span>
                        <div className="absolute inset-0 flex items-center justify-center opacity-10">
                           <AlertCircle size={48} />
                        </div>
                        <img 
                           src={state.uploadedImage} 
                           className="max-h-[80vh] object-contain block opacity-50 grayscale blur-sm"
                           draggable={false}
                        />
                     </div>
                  </div>
               ) : (
                  // Single View or Video View
                  <div 
                     className="relative shadow-2xl origin-center group"
                     style={transformStyle}
                  >
                     {isVideo ? (
                        <div className="relative border-2 border-transparent group-hover:border-accent/50 transition-colors rounded-lg overflow-hidden bg-black">
                           <img 
                              ref={imgRef}
                              src={state.uploadedImage} 
                              alt="Video Frame" 
                              className="max-h-[85vh] max-w-[85vw] object-contain block select-none opacity-80"
                              draggable={false}
                           />
                           {/* Simulated Video UI Overlay */}
                           <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
                              <button 
                                onClick={(e) => { e.stopPropagation(); setIsPlaying(!isPlaying); }}
                                className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all text-white border border-white/40 shadow-xl"
                              >
                                {isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
                              </button>
                           </div>
                           <div className="absolute top-4 right-4 bg-black/60 backdrop-blur px-2 py-1 rounded text-[10px] font-mono text-white/80 pointer-events-none">
                              {state.workflow.videoState.resolution} • {state.workflow.videoState.fps} FPS
                           </div>
                        </div>
                     ) : (
                        <img 
                           ref={imgRef}
                           src={state.uploadedImage} 
                           alt="Workspace" 
                           className="max-h-[85vh] max-w-[85vw] object-contain block select-none"
                           draggable={false}
                        />
                     )}
                     
                     <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-auto">
                        <button 
                        onClick={(e) => { e.stopPropagation(); dispatch({ type: 'SET_IMAGE', payload: null }); }}
                        className="bg-black/50 text-white px-3 py-1.5 rounded-md text-xs backdrop-blur-sm hover:bg-black/70 shadow-sm"
                        >
                        Clear Image
                        </button>
                     </div>
                  </div>
               )}
            </div>
         ) : (
            <div 
               className={cn(
                  "w-[400px] h-[300px] border-2 border-dashed rounded-xl flex flex-col items-center justify-center gap-4 transition-all cursor-pointer bg-surface-elevated/50 backdrop-blur-sm relative z-10",
                  isDragging ? "border-accent bg-accent/5" : "border-border-strong hover:border-foreground/30"
               )}
               onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
               onDragLeave={() => setIsDragging(false)}
               onDrop={handleDrop}
               onClick={() => fileInputRef.current?.click()}
            >
               <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
               <div className="w-16 h-16 rounded-full bg-surface-sunken flex items-center justify-center">
                  <UploadCloud className="text-foreground-muted" size={32} />
               </div>
               <div className="text-center space-y-1">
                  <p className="font-medium text-foreground">Click or drop image</p>
                  <p className="text-xs text-foreground-muted">Support for PNG, JPG (Max 50MB)</p>
               </div>
            </div>
         )}
      </div>
      
      {/* Zoom Indicator Overlay */}
      <div className="absolute bottom-6 right-6 bg-black/70 backdrop-blur text-white px-3 py-1.5 rounded-full text-xs font-mono pointer-events-none z-20">
         {Math.round(state.canvas.zoom * 100)}%
      </div>
    </div>
  );
};
