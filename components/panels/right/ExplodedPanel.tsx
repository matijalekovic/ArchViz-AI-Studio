
import React from 'react';
import { Toggle } from '../../ui/Toggle';
import { SegmentedControl } from '../../ui/SegmentedControl';
import { Accordion } from '../../ui/Accordion';
import { Slider } from '../../ui/Slider';
import { Play } from 'lucide-react';

export const ExplodedPanel = () => {
    return (
        <div className="space-y-6">
            <div>
                <label className="text-xs text-foreground-muted mb-2 block font-bold uppercase tracking-wider">View Type</label>
                <SegmentedControl value="axon" options={[{label:'Axonometric', value:'axon'}, {label:'Perspective', value:'persp'}]} onChange={()=>{}} />
            </div>
            <Slider label="Separation Distance" value={50} min={0} max={200} onChange={()=>{}} />
            
            <div>
                <label className="text-xs text-foreground-muted mb-2 block font-bold uppercase tracking-wider">Animation</label>
                <Toggle label="Enable Animation" checked={false} onChange={()=>{}} />
                <Slider label="Duration (s)" value={3} min={1} max={10} onChange={()=>{}} />
                <button className="w-full mt-2 py-2 border rounded flex items-center justify-center gap-2 text-xs hover:bg-surface-elevated"><Play size={12}/> Preview</button>
            </div>

            <Accordion items={[
                { id: 'out', title: 'Output', content: (
                    <div className="space-y-3">
                        <select className="w-full bg-surface-elevated border border-border rounded text-xs h-8 px-2"><option>4K Resolution</option><option>1080p</option></select>
                        <Toggle label="Transparent Background" checked={true} onChange={()=>{}} />
                    </div>
                )}
            ]} />
        </div>
    );
};
