
import React from 'react';
import { CheckCircle2, Upload, Play } from 'lucide-react';
import { Toggle } from '../../ui/Toggle';

export const ValidationPanel = () => {
    return (
        <div className="space-y-6">
            <div>
                <h4 className="text-xs font-bold text-foreground-muted uppercase tracking-wider mb-3">Documents</h4>
                <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-surface-elevated border border-border rounded">
                        <span className="text-xs">Specs.pdf</span><CheckCircle2 size={12} className="text-green-500"/>
                    </div>
                    <button className="w-full py-1.5 flex items-center justify-center gap-2 border border-dashed border-border rounded text-xs text-foreground-muted hover:text-foreground">
                        <Upload size={12} /> Add Document
                    </button>
                </div>
            </div>
            <div>
                <h4 className="text-xs font-bold text-foreground-muted uppercase tracking-wider mb-3">Checks</h4>
                <div className="space-y-2">
                    <Toggle label="Dimensions" checked={true} onChange={()=>{}} />
                    <Toggle label="Product Refs" checked={true} onChange={()=>{}} />
                    <Toggle label="Quantities" checked={true} onChange={()=>{}} />
                </div>
            </div>
            <div className="pt-4 border-t border-border-subtle">
                <button className="w-full py-2 bg-foreground text-background rounded text-xs font-bold flex items-center justify-center gap-2">
                    <Play size={12} fill="currentColor"/> Run Validation
                </button>
            </div>
        </div>
    );
};
