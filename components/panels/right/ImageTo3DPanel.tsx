
import React from 'react';
import { Toggle } from '../../ui/Toggle';
import { SegmentedControl } from '../../ui/SegmentedControl';
import { Slider } from '../../ui/Slider';

export const ImageTo3DPanel = () => {
    return (
        <div className="space-y-6">
            <div>
                <label className="text-xs text-foreground-muted mb-2 block font-bold uppercase tracking-wider">Quality</label>
                <SegmentedControl value="std" options={[{label:'Draft', value:'draft'}, {label:'Standard', value:'std'}, {label:'High', value:'high'}]} onChange={()=>{}} />
            </div>

            <div>
                <label className="text-xs text-foreground-muted mb-2 block font-bold uppercase tracking-wider">Geometry</label>
                <SegmentedControl value="arch" options={[{label:'Organic', value:'organic'}, {label:'Architectural', value:'arch'}]} onChange={()=>{}} />
                <div className="mt-3 space-y-3">
                    <Slider label="Edge Detection" value={50} min={0} max={100} onChange={()=>{}} />
                    <Toggle label="Fill Holes" checked={true} onChange={()=>{}} />
                </div>
            </div>

            <div>
                <label className="text-xs text-foreground-muted mb-2 block font-bold uppercase tracking-wider">Output Format</label>
                <div className="grid grid-cols-4 gap-1 mb-2">
                    {['OBJ', 'FBX', 'GLB', 'USD'].map(f => <button key={f} className="text-[10px] border rounded py-1.5 hover:bg-surface-elevated">{f}</button>)}
                </div>
                <Toggle label="Include Textures" checked={true} onChange={()=>{}} />
            </div>
        </div>
    );
};
