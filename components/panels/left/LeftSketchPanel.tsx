
import React from 'react';
import { useAppStore } from '../../../store';
import { SectionHeader } from './SharedLeftComponents';
import { SegmentedControl } from '../../ui/SegmentedControl';
import { Slider } from '../../ui/Slider';
import { Toggle } from '../../ui/Toggle';
import { Plus, Trash2 } from 'lucide-react';

export const LeftSketchPanel = () => {
   const { state, dispatch } = useAppStore();
   const wf = state.workflow;

   return (
      <div className="space-y-6">
         <div>
            <SectionHeader title="Sketch Analysis" />
            <div className="space-y-4">
               <div>
                  <label className="text-xs text-foreground-muted mb-2 block">Sketch Type</label>
                  <SegmentedControl 
                     value={wf.sketchType}
                     options={[{label: 'Exterior', value: 'exterior'}, {label: 'Interior', value: 'interior'}, {label: 'Detail', value: 'detail'}]}
                     onChange={(v) => dispatch({ type: 'UPDATE_WORKFLOW', payload: { sketchType: v } })}
                  />
               </div>
               
               <Slider label="Line Confidence" value={wf.sketchConfidence} min={0} max={100} onChange={(v) => dispatch({ type: 'UPDATE_WORKFLOW', payload: { sketchConfidence: v } })} />
               
               <div className="space-y-2 pt-2 border-t border-border-subtle">
                  <Toggle label="Clean Noise" checked={wf.sketchCleanup.clean} onChange={(v) => dispatch({ type: 'UPDATE_WORKFLOW', payload: { sketchCleanup: { ...wf.sketchCleanup, clean: v } } })} />
                  <Toggle label="Enhance Lines" checked={wf.sketchCleanup.lines} onChange={(v) => dispatch({ type: 'UPDATE_WORKFLOW', payload: { sketchCleanup: { ...wf.sketchCleanup, lines: v } } })} />
               </div>
            </div>
         </div>

         <div>
            <SectionHeader title="References" />
            <div className="grid grid-cols-3 gap-2 mb-2">
               <div className="aspect-square bg-surface-sunken rounded-lg border border-dashed border-border flex items-center justify-center hover:bg-surface-elevated cursor-pointer transition-colors text-foreground-muted hover:text-foreground">
                  <Plus size={20} />
               </div>
            </div>
         </div>
      </div>
   );
};
