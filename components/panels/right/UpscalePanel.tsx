
import React from 'react';
import { Toggle } from '../../ui/Toggle';
import { SegmentedControl } from '../../ui/SegmentedControl';
import { Accordion } from '../../ui/Accordion';
import { Slider } from '../../ui/Slider';
import { AlertTriangle } from 'lucide-react';

export const UpscalePanel = () => {
    return (
        <div className="space-y-6">
            <div>
                <label className="text-xs text-foreground-muted mb-2 block font-bold uppercase tracking-wider">Scale Factor</label>
                <div className="flex gap-2 mb-2">
                    {['2x', '4x', '8x'].map(x => <button key={x} className="flex-1 py-3 border rounded text-sm font-bold hover:bg-surface-elevated">{x}</button>)}
                </div>
                <div className="mt-2 p-2 bg-yellow-50 text-yellow-700 text-[10px] rounded border border-yellow-200 flex gap-2">
                    <AlertTriangle size={12} /> Large upscales may take time.
                </div>
            </div>

            <div>
                <label className="text-xs text-foreground-muted mb-2 block font-bold uppercase tracking-wider">Enhancement</label>
                <SegmentedControl value="arch" options={[{label:'General', value:'gen'}, {label:'Architecture', value:'arch'}, {label:'Photo', value:'photo'}]} onChange={()=>{}} />
                <div className="mt-3 space-y-3">
                    <Slider label="Detail Gen" value={20} min={0} max={100} onChange={()=>{}} />
                    <Slider label="Noise Reduction" value={50} min={0} max={100} onChange={()=>{}} />
                </div>
            </div>

            <Accordion items={[
                { id: 'out', title: 'Output', content: (
                    <div className="space-y-3">
                        <select className="w-full bg-surface-elevated border border-border rounded text-xs h-8 px-2"><option>PNG</option><option>JPG</option><option>TIFF</option></select>
                        <Toggle label="Keep Metadata" checked={true} onChange={()=>{}} />
                    </div>
                )}
            ]} />
        </div>
    );
};
