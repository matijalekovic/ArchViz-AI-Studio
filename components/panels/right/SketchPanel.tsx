
import React from 'react';
import { Toggle } from '../../ui/Toggle';
import { SegmentedControl } from '../../ui/SegmentedControl';
import { Accordion } from '../../ui/Accordion';
import { Slider } from '../../ui/Slider';
import { NumberInput } from './SharedRightComponents';

export const SketchPanel = () => {
    return (
        <div className="space-y-6">
            <div>
                <label className="text-xs text-foreground-muted mb-2 block font-bold uppercase tracking-wider">Interpretation</label>
                <div className="flex justify-between text-[10px] text-foreground-muted mb-1"><span>Faithful</span><span>Creative</span></div>
                <Slider value={50} min={0} max={100} onChange={()=>{}} />
            </div>

            <Accordion items={[
                { id: 'mat', title: 'Materials', content: (
                    <div className="space-y-3">
                        <select className="w-full bg-surface-elevated border border-border rounded text-xs h-8 px-2"><option>Concrete & Glass</option><option>Wood & Brick</option></select>
                        <Slider label="Texture Scale" value={100} min={10} max={200} onChange={()=>{}} />
                    </div>
                )},
                { id: 'ctx', title: 'Context', content: (
                    <div className="space-y-3">
                        <SegmentedControl value="urban" options={[{label:'Urban', value:'urban'}, {label:'Nature', value:'nature'}]} onChange={()=>{}} />
                        <Toggle label="Add Surroundings" checked={true} onChange={()=>{}} />
                    </div>
                )},
                { id: 'out', title: 'Output', content: (
                    <div className="space-y-3">
                        <NumberInput label="Variations" value={4} min={1} max={8} onChange={()=>{}} />
                        <select className="w-full bg-surface-elevated border border-border rounded text-xs h-8 px-2"><option>High Resolution</option><option>Standard</option></select>
                    </div>
                )},
            ]} />
        </div>
    );
};
