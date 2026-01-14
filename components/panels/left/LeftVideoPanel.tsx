
import React, { useRef } from 'react';
import { useAppStore } from '../../../store';
import { SectionHeader } from './SharedLeftComponents';
import { cn } from '../../../lib/utils';
import { Wand2, Camera, Layers, Film, Trash2, Plus } from 'lucide-react';
import { nanoid } from 'nanoid';

export const LeftVideoPanel = () => {
   const { state, dispatch } = useAppStore();
   const video = state.workflow.videoState;
   const updateVideo = (payload: Partial<typeof video>) => dispatch({ type: 'UPDATE_VIDEO_STATE', payload });
   const fileInputRef = useRef<HTMLInputElement>(null);

   const handleAddKeyframe = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
         const reader = new FileReader();
         reader.onload = (ev) => {
            if (ev.target?.result) {
               const newKeyframe = {
                  id: nanoid(),
                  url: ev.target.result as string,
                  duration: 2
               };
               updateVideo({ keyframes: [...video.keyframes, newKeyframe] });
            }
         };
         reader.readAsDataURL(e.target.files[0]);
      }
   };

   return (
      <div className="space-y-6">
         <div>
            <SectionHeader title="Video Mode" />
            <div className="space-y-2">
               {[
                  {id: 'image-animate', label: 'Image Animate', icon: Wand2},
                  {id: 'camera-path', label: 'Camera Path', icon: Camera},
                  {id: 'image-morph', label: 'Morph Sequence', icon: Layers},
                  {id: 'multi-shot', label: 'Multi-Shot', icon: Film},
               ].map(m => (
                  <button 
                     key={m.id}
                     onClick={() => updateVideo({ inputMode: m.id as any })}
                     className={cn(
                        "w-full flex items-center gap-3 p-3 rounded-lg border text-left transition-all",
                        video.inputMode === m.id 
                           ? "bg-surface-elevated border-foreground shadow-sm" 
                           : "bg-background-tertiary border-transparent hover:bg-surface-elevated hover:border-border"
                     )}
                  >
                     <div className={cn("p-2 rounded-full", video.inputMode === m.id ? "bg-foreground text-background" : "bg-surface-sunken text-foreground-muted")}>
                        <m.icon size={16} />
                     </div>
                     <div>
                        <div className="text-xs font-bold">{m.label}</div>
                        <div className="text-[10px] text-foreground-muted">
                           {m.id === 'image-animate' && "Add motion to still image"}
                           {m.id === 'camera-path' && "Flythrough from 3D/Image"}
                           {m.id === 'image-morph' && "Transition between views"}
                           {m.id === 'multi-shot' && "Assembly of clips"}
                        </div>
                     </div>
                  </button>
               ))}
            </div>
         </div>

         {video.inputMode !== 'image-animate' && (
            <div>
               <SectionHeader title="Input Sequence" />
               <div className="grid grid-cols-2 gap-2">
                  {video.keyframes.map((frame, i) => (
                     <div key={frame.id} className="relative group aspect-video bg-black rounded overflow-hidden border border-border">
                        <img src={frame.url} className="w-full h-full object-cover opacity-80" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 transition-opacity">
                           <button 
                              onClick={() => updateVideo({ keyframes: video.keyframes.filter(k => k.id !== frame.id) })}
                              className="p-1 bg-red-500/80 text-white rounded hover:bg-red-500"
                           >
                              <Trash2 size={12} />
                           </button>
                        </div>
                        <div className="absolute bottom-1 left-1 px-1 bg-black/50 text-[9px] text-white rounded">{i+1}</div>
                     </div>
                  ))}
                  <button 
                     onClick={() => fileInputRef.current?.click()}
                     className="aspect-video border-2 border-dashed border-border rounded flex flex-col items-center justify-center gap-1 hover:bg-surface-elevated hover:border-foreground-muted transition-colors text-foreground-muted"
                  >
                     <Plus size={16} />
                     <span className="text-[10px]">Add Frame</span>
                  </button>
               </div>
               <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleAddKeyframe} />
            </div>
         )}
      </div>
   );
};
