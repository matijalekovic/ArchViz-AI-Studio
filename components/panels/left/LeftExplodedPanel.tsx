
import React from 'react';
import { useAppStore } from '../../../store';
import { SectionHeader } from './SharedLeftComponents';
import { Toggle } from '../../ui/Toggle';

export const LeftExplodedPanel = () => {
   const { state } = useAppStore();
   const wf = state.workflow;

   return (
      <div className="space-y-6">
         <div>
            <SectionHeader title="Component Setup" />
            <div className="space-y-3 mb-4">
               <button className="w-full py-2 bg-surface-elevated border border-dashed border-border rounded text-xs text-foreground-muted hover:text-foreground transition-colors">
                  Upload Source Model
               </button>
            </div>
            
            <SectionHeader title="Explosion Order" />
            <div className="space-y-2">
               {wf.explodedComponents.sort((a,b) => a.order - b.order).map((comp) => (
                  <div key={comp.id} className="flex items-center gap-2 p-2 bg-surface-elevated border border-border rounded cursor-grab active:cursor-grabbing hover:shadow-sm transition-all">
                     <div className="flex flex-col gap-0.5 text-foreground-muted cursor-grab">
                        <div className="w-3 h-0.5 bg-current rounded-full" />
                        <div className="w-3 h-0.5 bg-current rounded-full" />
                        <div className="w-3 h-0.5 bg-current rounded-full" />
                     </div>
                     <span className="text-xs font-medium flex-1">{comp.name}</span>
                     <Toggle label="" checked={comp.active} onChange={()=>{}} />
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
};
