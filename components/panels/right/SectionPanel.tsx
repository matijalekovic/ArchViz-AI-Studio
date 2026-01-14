
import React from 'react';
import { Toggle } from '../../ui/Toggle';
import { SegmentedControl } from '../../ui/SegmentedControl';
import { Accordion } from '../../ui/Accordion';
import { Slider } from '../../ui/Slider';
import { ColorPicker } from './SharedRightComponents';

export const SectionPanel = () => {
    return (
        <div className="space-y-6">
            <div>
                <label className="text-xs text-foreground-muted mb-2 block font-bold uppercase tracking-wider">Output Type</label>
                <SegmentedControl value="tech" options={[{label:'Technical', value:'tech'}, {label:'Rendered', value:'render'}, {label:'Hybrid', value:'hybrid'}]} onChange={()=>{}} />
            </div>

            <div>
                <label className="text-xs text-foreground-muted mb-2 block font-bold uppercase tracking-wider">Cut Style</label>
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xs">Poche Color</span>
                    <ColorPicker color="#000000" onChange={()=>{}} />
                </div>
                <Slider label="Beyond Visibility" value={50} min={0} max={100} onChange={()=>{}} />
            </div>

            <Accordion items={[
                { id: 'lines', title: 'Line Weights', content: (
                    <div className="space-y-3">
                        <Slider label="Cut Lines" value={4} min={1} max={10} onChange={()=>{}} />
                        <Slider label="View Lines" value={2} min={1} max={5} onChange={()=>{}} />
                    </div>
                )},
                { id: 'out', title: 'Output', content: (
                    <div className="space-y-3">
                        <select className="w-full bg-surface-elevated border border-border rounded text-xs h-8 px-2"><option>PDF (Vector)</option><option>DWG</option><option>PNG</option></select>
                    </div>
                )}
            ]} />
        </div>
    );
};
