
import React, { useState } from 'react';
import { useAppStore } from '../../../store';
import { StyleBrowserDialog } from '../../modals/StyleBrowserDialog';
import { SegmentedControl } from '../../ui/SegmentedControl';
import { SectionHeader, StyleGrid } from './SharedLeftComponents';
import { cn } from '../../../lib/utils';

export const LeftRender3DPanel = () => {
    const { state, dispatch } = useAppStore();
    const [isBrowserOpen, setIsBrowserOpen] = useState(false);
    const wf = state.workflow;
    
    const updateWf = (payload: Partial<typeof wf>) => dispatch({ type: 'UPDATE_WORKFLOW', payload });
  
    return (
      <div className="space-y-6">
        <StyleBrowserDialog 
           isOpen={isBrowserOpen} 
           onClose={() => setIsBrowserOpen(false)} 
           activeStyleId={state.activeStyleId}
           onSelect={(id) => dispatch({ type: 'SET_STYLE', payload: id })}
        />

        <div>
          <SectionHeader title="Source Analysis" />
          <div className="space-y-3">
            <div>
              <label className="text-xs text-foreground-muted mb-1 block">Source Type</label>
              <select 
                className="w-full h-8 bg-surface-elevated border border-border rounded text-xs px-2 text-foreground focus:outline-none focus:border-accent"
                value={wf.sourceType}
                onChange={(e) => updateWf({ sourceType: e.target.value as any })}
              >
                <option value="rhino">Rhino</option>
                <option value="revit">Revit</option>
                <option value="sketchup">SketchUp</option>
                <option value="blender">Blender</option>
                <option value="3dsmax">3ds Max</option>
                <option value="archicad">ArchiCAD</option>
                <option value="cinema4d">Cinema 4D</option>
                <option value="clay">Clay Render</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
               <label className="text-xs text-foreground-muted mb-1 block">View Type</label>
               <SegmentedControl 
                 value={wf.viewType}
                 onChange={(v) => updateWf({ viewType: v })}
                 options={[{label:'Exterior', value:'exterior'}, {label:'Interior', value:'interior'}, {label:'Aerial', value:'aerial'}]}
               />
            </div>
          </div>
        </div>
  
        <div>
          <div className="flex items-center justify-between mb-2">
             <SectionHeader title="Style" />
             <span className="text-[9px] text-foreground-muted font-mono">{state.activeStyleId.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')}</span>
          </div>
          <StyleGrid 
            activeId={state.activeStyleId} 
            onSelect={(id) => dispatch({ type: 'SET_STYLE', payload: id })} 
            onBrowse={() => setIsBrowserOpen(true)}
          />
        </div>

        <div>
          <SectionHeader title="Detected Elements" />
          <div className="space-y-1">
            {wf.detectedElements.map(el => (
               <div 
                 key={el.id} 
                 onClick={() => {
                   const newElements = wf.detectedElements.map(e => e.id === el.id ? { ...e, selected: !e.selected } : e);
                   updateWf({ detectedElements: newElements });
                 }}
                 className={cn(
                   "flex items-center justify-between p-2 rounded text-xs cursor-pointer border transition-colors",
                   el.selected ? "bg-surface-elevated border-border" : "bg-transparent border-transparent opacity-50 hover:bg-surface-sunken"
                 )}
               >
                  <div className="flex items-center gap-2">
                     <div className={cn("w-2 h-2 rounded-full", el.confidence > 0.8 ? "bg-green-500" : "bg-yellow-500")} />
                     <span>{el.name}</span>
                  </div>
                  <div className={cn("w-3 h-3 rounded border flex items-center justify-center", el.selected ? "bg-foreground border-foreground" : "border-border-strong")}>
                    {el.selected && <div className="w-1.5 h-1.5 bg-background rounded-sm" />}
                  </div>
               </div>
            ))}
          </div>
        </div>
      </div>
    );
};
