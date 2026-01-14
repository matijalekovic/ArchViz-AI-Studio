
import React from 'react';
import { SectionHeader } from './SharedLeftComponents';
import { cn } from '../../../lib/utils';
import { FileText, FileSpreadsheet, UploadCloud, MoreHorizontal } from 'lucide-react';
import { Toggle } from '../../ui/Toggle';

export const LeftValidationPanel = () => {
    // Mock Documents
    const documents = [
       { id: '1', name: 'Terminal_Materials.pdf', type: 'pdf', items: 26, status: 'synced', date: 'Today, 10:23 AM' },
       { id: '2', name: 'Cargo_Materials.pdf', type: 'pdf', items: 12, status: 'synced', date: 'Yesterday, 4:15 PM' },
       { id: '3', name: 'MQT_BoQ.xlsx', type: 'xls', items: 89, status: 'synced', date: 'Jan 8, 2024' },
    ];

    return (
      <div className="space-y-6">
        <div>
           <SectionHeader title="Project Documents" />
           <div className="space-y-2 mb-4">
              {documents.map(doc => (
                 <div key={doc.id} className="p-2.5 bg-surface-elevated border border-border rounded-lg group hover:border-foreground-muted transition-colors relative">
                    <div className="flex items-start gap-3">
                       <div className={cn(
                          "w-8 h-8 rounded flex items-center justify-center text-xs font-bold uppercase",
                          doc.type === 'pdf' ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"
                       )}>
                          {doc.type === 'pdf' ? <FileText size={14} /> : <FileSpreadsheet size={14} />}
                       </div>
                       <div className="flex-1 min-w-0">
                          <div className="text-xs font-medium truncate text-foreground">{doc.name}</div>
                          <div className="text-[10px] text-foreground-muted flex items-center gap-1.5 mt-0.5">
                             <span>{doc.items} items</span>
                             <span className="w-0.5 h-0.5 rounded-full bg-border-strong" />
                             <span>{doc.date}</span>
                          </div>
                       </div>
                       <button className="text-foreground-muted hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                          <MoreHorizontal size={14} />
                       </button>
                    </div>
                    {/* Status Indicator */}
                    <div className="absolute top-2 right-2">
                       <div className="w-1.5 h-1.5 rounded-full bg-green-500 ring-2 ring-white" title="Synced" />
                    </div>
                 </div>
              ))}
           </div>

           <button className="w-full py-3 border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center gap-1 text-foreground-muted hover:text-foreground hover:bg-surface-elevated hover:border-foreground-muted transition-all">
              <UploadCloud size={20} className="mb-1" />
              <span className="text-xs font-medium">Upload Document</span>
              <span className="text-[9px] text-foreground-muted/80">PDF, Excel, CSV</span>
           </button>
        </div>

        <div>
           <SectionHeader title="Validation Scope" />
           <div className="bg-surface-sunken p-3 rounded-lg space-y-3 border border-border-subtle">
              <label className="flex items-center gap-2 cursor-pointer group">
                 <Toggle label="" checked={true} onChange={()=>{}} />
                 <div className="flex-1">
                    <div className="text-xs font-medium group-hover:text-foreground">Cross-Reference BoQ</div>
                    <div className="text-[10px] text-foreground-muted">Compare against Bill of Quantities</div>
                 </div>
              </label>
              <div className="h-px bg-border-subtle" />
              <label className="flex items-center gap-2 cursor-pointer group">
                 <Toggle label="" checked={true} onChange={()=>{}} />
                 <div className="flex-1">
                    <div className="text-xs font-medium group-hover:text-foreground">Tech. Specification</div>
                    <div className="text-[10px] text-foreground-muted">Validate norms & standards</div>
                 </div>
              </label>
           </div>
        </div>
      </div>
    );
};
