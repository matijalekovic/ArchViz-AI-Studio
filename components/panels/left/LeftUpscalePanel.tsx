
import React from 'react';
import { useAppStore } from '../../../store';
import { SectionHeader } from './SharedLeftComponents';
import { Image as ImageIcon, Check, RefreshCw, Trash2 } from 'lucide-react';

export const LeftUpscalePanel = () => {
   const { state } = useAppStore();
   const wf = state.workflow;

   return (
      <div className="space-y-6">
         <div>
            <SectionHeader title="Batch Queue" />
            <div className="space-y-2">
               {wf.upscaleBatch.map(item => (
                  <div key={item.id} className="flex items-center gap-3 p-2 bg-surface-elevated border border-border rounded">
                     <div className="w-8 h-8 bg-surface-sunken rounded flex items-center justify-center">
                        <ImageIcon size={14} className="text-foreground-muted" />
                     </div>
                     <div className="flex-1 min-w-0">
                        <div className="text-xs font-medium truncate">{item.name}</div>
                        <div className="text-[10px] text-foreground-muted capitalize flex items-center gap-1">
                           {item.status === 'done' && <Check size={10} className="text-green-500" />}
                           {item.status === 'processing' && <RefreshCw size={10} className="animate-spin text-blue-500" />}
                           {item.status}
                        </div>
                     </div>
                     {item.status === 'queued' && <button className="text-foreground-muted hover:text-red-500"><Trash2 size={14} /></button>}
                  </div>
               ))}
               <button className="w-full py-2 border border-dashed border-border text-xs text-foreground-muted rounded hover:bg-surface-elevated transition-colors">
                  + Add Images
               </button>
            </div>
         </div>
         
         <div className="bg-surface-sunken p-3 rounded-lg text-[10px] text-foreground-secondary leading-relaxed">
            <span className="font-bold">Note:</span> Upscaling large batches may take several minutes. You can continue working in other tabs while processing.
         </div>
      </div>
   );
};
