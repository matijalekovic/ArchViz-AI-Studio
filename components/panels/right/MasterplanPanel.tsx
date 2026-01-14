
import React from 'react';
import { Toggle } from '../../ui/Toggle';
import { SegmentedControl } from '../../ui/SegmentedControl';
import { Accordion } from '../../ui/Accordion';
import { Slider } from '../../ui/Slider';

export const MasterplanPanel = () => {
    return (
        <div className="space-y-6">
            <div>
                <label className="text-xs text-foreground-muted mb-2 block font-bold uppercase tracking-wider">Output Type</label>
                <div className="grid grid-cols-2 gap-2">
                    {['Photorealistic', 'Diagrammatic', 'Hybrid', 'Illustrative'].map(t => (
                        <button key={t} className="py-2 px-1 text-xs border rounded hover:bg-surface-elevated">{t}</button>
                    ))}
                </div>
            </div>

            <div>
                <label className="text-xs text-foreground-muted mb-2 block font-bold uppercase tracking-wider">View Angle</label>
                <div className="h-24 bg-surface-sunken border border-border rounded flex items-center justify-center text-foreground-muted text-xs">
                    [Hemisphere Picker]
                </div>
            </div>

            <div>
                <label className="text-xs text-foreground-muted mb-2 block font-bold uppercase tracking-wider">Buildings</label>
                <div className="space-y-3">
                    <select className="w-full bg-surface-elevated border border-border rounded text-xs h-8 px-2"><option>Contemporary Mixed</option><option>Residential</option><option>Office Park</option></select>
                    <div>
                        <span className="text-[10px] text-foreground-muted block mb-1">Height Interpretation</span>
                        <SegmentedControl value="uniform" options={[{label:'Uniform', value:'uniform'}, {label:'Color', value:'color'}, {label:'Random', value:'random'}]} onChange={()=>{}} />
                    </div>
                    <Slider label="Default Height" value={24} min={3} max={100} onChange={()=>{}} />
                </div>
            </div>

            <Accordion items={[
                { id: 'land', title: 'Landscape', content: (
                    <div className="space-y-3">
                        <Slider label="Tree Density" value={60} min={0} max={100} onChange={()=>{}} />
                        <Toggle label="Water Bodies" checked={true} onChange={()=>{}} />
                        <Toggle label="Parks & Plazas" checked={true} onChange={()=>{}} />
                    </div>
                )},
                { id: 'out', title: 'Output', content: (
                    <div className="space-y-3">
                        <select className="w-full bg-surface-elevated border border-border rounded text-xs h-8 px-2"><option>4K Ultra HD</option><option>8K Print</option><option>1080p Web</option></select>
                        <Toggle label="Export Layers" checked={false} onChange={()=>{}} />
                    </div>
                )},
            ]} />
        </div>
    );
};
