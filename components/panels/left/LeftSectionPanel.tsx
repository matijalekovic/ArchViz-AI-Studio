
import React from 'react';
import { useAppStore } from '../../../store';
import { SectionHeader } from './SharedLeftComponents';
import { SegmentedControl } from '../../ui/SegmentedControl';
import { Slider } from '../../ui/Slider';

export const LeftSectionPanel = () => {
   const { state, dispatch } = useAppStore();
   const wf = state.workflow;

   return (
      <div className="space-y-6">
         <div>
            <SectionHeader title="Cut Definition" />
            <div className="space-y-4">
               <div>
                  <label className="text-xs text-foreground-muted mb-2 block">Cut Type</label>
                  <SegmentedControl 
                     value={wf.sectionCut.type}
                     options={[{label: 'Vertical', value: 'vertical'}, {label: 'Horizontal', value: 'horizontal'}, {label: 'Diagonal', value: 'diagonal'}]}
                     onChange={(v) => dispatch({ type: 'UPDATE_WORKFLOW', payload: { sectionCut: { ...wf.sectionCut, type: v } } })}
                  />
               </div>
               
               <Slider label="Cut Plane Position" value={wf.sectionCut.plane} min={0} max={100} onChange={(v) => dispatch({ type: 'UPDATE_WORKFLOW', payload: { sectionCut: { ...wf.sectionCut, plane: v } } })} />
               <Slider label="View Depth" value={wf.sectionCut.depth} min={0} max={100} onChange={(v) => dispatch({ type: 'UPDATE_WORKFLOW', payload: { sectionCut: { ...wf.sectionCut, depth: v } } })} />
            </div>
         </div>
      </div>
   );
};
