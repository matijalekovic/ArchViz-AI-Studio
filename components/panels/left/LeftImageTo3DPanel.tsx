
import React from 'react';
import { useAppStore } from '../../../store';
import { SectionHeader } from './SharedLeftComponents';
import { Image as ImageIcon, Trash2, Plus } from 'lucide-react';

export const LeftImageTo3DPanel = () => {
   const { state } = useAppStore();
   const wf = state.workflow;

   return (
      <div className="space-y-6">
         <div>
            <SectionHeader title="Input Images" />
            <div className="space-y-3">
               {wf.img3dInputs.map((input, idx) => (
                  <div key={input.id} className="relative group">
                     <div className="aspect-[4/3] bg-surface-elevated border border-border rounded-lg flex items-center justify-center overflow-hidden">
                        <ImageIcon size={24} className="text-foreground-muted opacity-20" />
                        <div className="absolute top-2 left-2 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded backdrop-blur-sm">
                           Img {idx + 1}
                        </div>
                        {input.isPrimary && (
                           <div className="absolute top-2 right-2 bg-accent text-white text-[10px] px-1.5 py-0.5 rounded shadow-sm">
                              Primary
                           </div>
                        )}
                     </div>
                  </div>
               ))}
               <button className="w-full py-8 border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center gap-2 text-foreground-muted hover:border-foreground-muted hover:bg-surface-sunken transition-all">
                  <Plus size={24} />
                  <span className="text-xs">Add Reference Image</span>
               </button>
            </div>
         </div>
      </div>
   );
};
