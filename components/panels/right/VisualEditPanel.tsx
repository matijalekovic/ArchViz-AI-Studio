
import React from 'react';
import { useAppStore } from '../../../store';
import { Toggle } from '../../ui/Toggle';
import { SegmentedControl } from '../../ui/SegmentedControl';
import { Slider } from '../../ui/Slider';
import { Upload, Wrench } from 'lucide-react';

export const VisualEditPanel = () => {
    const { state } = useAppStore();
    const tool = state.workflow.activeTool;

    const renderToolOptions = () => {
        switch (tool) {
            case 'select': return (
                <div className="space-y-4">
                    <SegmentedControl value="rect" options={[{label:'Rect', value:'rect'}, {label:'Lasso', value:'lasso'}, {label:'AI', value:'ai'}]} onChange={()=>{}} />
                    <div className="grid grid-cols-2 gap-2">
                        {['Facade', 'Windows', 'Sky', 'Ground'].map(t => <button key={t} className="text-xs border rounded py-1 hover:bg-surface-elevated">{t}</button>)}
                    </div>
                    <Slider label="Feather" value={0} min={0} max={20} onChange={()=>{}} />
                </div>
            );
            // ... (Other cases extracted similarly)
            default: return <div className="p-4 text-xs text-center text-foreground-muted">Select a tool from the left toolbar.</div>;
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-border-subtle">
                <Wrench size={16} className="text-accent" />
                <h3 className="text-sm font-bold capitalize">{tool || 'Tool'} Options</h3>
            </div>
            {renderToolOptions()}
        </div>
    );
};
