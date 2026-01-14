
import React from 'react';
import { Toggle } from '../../ui/Toggle';
import { Slider } from '../../ui/Slider';

export const VideoPanel = () => {
    return (
        <div className="space-y-6">
            <div>
                <label className="text-xs text-foreground-muted mb-2 block font-bold uppercase tracking-wider">Duration</label>
                <div className="flex gap-2">
                    {['5s', '10s', '30s'].map(d => <button key={d} className="flex-1 py-2 text-xs border rounded hover:bg-surface-elevated">{d}</button>)}
                </div>
            </div>

            <div>
                <label className="text-xs text-foreground-muted mb-2 block font-bold uppercase tracking-wider">Motion</label>
                <select className="w-full bg-surface-elevated border border-border rounded text-xs h-8 px-2 mb-2"><option>Cinematic Slow</option><option>Dynamic</option></select>
                <Slider label="Smoothness" value={50} min={0} max={100} onChange={()=>{}} />
            </div>

            <div>
                <label className="text-xs text-foreground-muted mb-2 block font-bold uppercase tracking-wider">Effects</label>
                <Toggle label="Motion Blur" checked={true} onChange={()=>{}} />
                <Toggle label="Depth of Field" checked={true} onChange={()=>{}} />
            </div>

            <div>
                <label className="text-xs text-foreground-muted mb-2 block font-bold uppercase tracking-wider">Output</label>
                <div className="grid grid-cols-3 gap-1 mb-2">
                    {['HD', 'FHD', '4K'].map(r => <button key={r} className="text-[10px] border rounded py-1.5 hover:bg-surface-elevated">{r}</button>)}
                </div>
                <Slider label="Quality" value={80} min={0} max={100} onChange={()=>{}} />
            </div>
        </div>
    );
};
