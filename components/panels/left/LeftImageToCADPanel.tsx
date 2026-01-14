
import React from 'react';
import { useAppStore } from '../../../store';
import { SectionHeader } from './SharedLeftComponents';
import { SegmentedControl } from '../../ui/SegmentedControl';

export const LeftImageToCADPanel = () => {
   const { state, dispatch } = useAppStore();
   const wf = state.workflow;

   return (
      <div className="space-y-6">
         <div>
            <SectionHeader title="Image Setup" />
            <div className="space-y-4">
               <div>
                  <label className="text-xs text-foreground-muted mb-2 block">Image Type</label>
                  <SegmentedControl 
                     value={wf.imgToCadType}
                     options={[{label: 'Photo', value: 'photo'}, {label: 'Render', value: 'render'}]}
                     onChange={(v) => dispatch({ type: 'UPDATE_WORKFLOW', payload: { imgToCadType: v } })}
                  />
               </div>
               
               <div className="flex items-center justify-between p-2 bg-surface-elevated border border-border rounded">
                  <span className="text-xs">Perspective Correction</span>
                  <div className="flex gap-2 text-[10px]">
                     <button className="px-2 py-1 bg-surface-sunken rounded hover:bg-background-tertiary">Auto</button>
                     <button className="px-2 py-1 text-foreground-muted hover:text-foreground">Manual</button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};
