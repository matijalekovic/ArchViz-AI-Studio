
import React, { useState } from 'react';
import { useAppStore } from '../../../store';
import { SectionHeader } from './SharedLeftComponents';
import { Toggle } from '../../ui/Toggle';
import { cn } from '../../../lib/utils';
import { MapIcon } from 'lucide-react';
import { ZoneItem } from '../../../types';
import { nanoid } from 'nanoid';

export const LeftMasterplanPanel = () => {
    const { state, dispatch } = useAppStore();
    const wf = state.workflow;

    const [isAdding, setIsAdding] = useState(false);
    const [newZoneName, setNewZoneName] = useState('');
    const [newZoneColor, setNewZoneColor] = useState('#CCCCCC');

    const handleAddZone = () => {
        if (!newZoneName.trim()) return;
        const newZone: ZoneItem = {
            id: nanoid(),
            name: newZoneName,
            color: newZoneColor,
            type: 'mixed',
            selected: true
        };
        dispatch({ type: 'UPDATE_WORKFLOW', payload: { mpZones: [...wf.mpZones, newZone] } });
        setIsAdding(false);
        setNewZoneName('');
        setNewZoneColor('#CCCCCC');
    };

    const toggleZone = (id: string) => {
        const newZones = wf.mpZones.map(z => z.id === id ? { ...z, selected: !z.selected } : z);
        dispatch({ type: 'UPDATE_WORKFLOW', payload: { mpZones: newZones } });
    };
    
    return (
      <div className="space-y-6">
        <div>
           <SectionHeader title="Plan Type" />
           <div className="grid grid-cols-2 gap-2">
              {[
                {id: 'site', label: 'Site Plan'}, 
                {id: 'urban', label: 'Urban'}, 
                {id: 'zoning', label: 'Zoning'}, 
                {id: 'massing', label: 'Massing'}
              ].map(t => (
                 <button 
                   key={t.id}
                   onClick={() => dispatch({ type: 'UPDATE_WORKFLOW', payload: { mpPlanType: t.id as any } })}
                   className={cn(
                     "py-2 px-3 text-xs rounded border text-center transition-colors",
                     wf.mpPlanType === t.id ? "bg-foreground text-background border-foreground" : "bg-surface-elevated border-border hover:bg-surface-sunken"
                   )}
                 >
                   {t.label}
                 </button>
              ))}
           </div>
        </div>

        <div>
           <SectionHeader title="Zone Detection" />
           <div className="space-y-2">
              {wf.mpZones.map(zone => (
                 <div key={zone.id} className="flex items-center gap-2 p-2 bg-surface-elevated border border-border rounded">
                    <div className="w-4 h-4 rounded shadow-sm border border-black/10" style={{ backgroundColor: zone.color }} />
                    <span className="text-xs font-medium flex-1">{zone.name}</span>
                    <Toggle label="" checked={zone.selected} onChange={() => toggleZone(zone.id)} />
                 </div>
              ))}
              
              {isAdding ? (
                  <div className="p-2 bg-surface-elevated border border-border rounded animate-fade-in space-y-2">
                      <div className="flex items-center gap-2">
                          <input 
                              type="color" 
                              value={newZoneColor}
                              onChange={(e) => setNewZoneColor(e.target.value)}
                              className="w-6 h-6 p-0 border-0 cursor-pointer rounded" 
                          />
                          <input 
                              type="text" 
                              value={newZoneName}
                              onChange={(e) => setNewZoneName(e.target.value)}
                              placeholder="Name" 
                              className="flex-1 text-xs bg-surface-sunken border border-border rounded px-2 h-7"
                              onKeyDown={(e) => e.key === 'Enter' && handleAddZone()}
                          />
                      </div>
                      <div className="flex gap-2">
                          <button onClick={handleAddZone} className="flex-1 py-1 bg-foreground text-background text-[10px] rounded">Add</button>
                          <button onClick={() => setIsAdding(false)} className="flex-1 py-1 bg-surface-sunken text-foreground-secondary text-[10px] rounded">Cancel</button>
                      </div>
                  </div>
              ) : (
                  <button 
                    onClick={() => setIsAdding(true)}
                    className="w-full py-2 border border-dashed border-border text-xs text-foreground-muted rounded hover:bg-surface-elevated transition-colors"
                  >
                     + Add Zone
                  </button>
              )}
           </div>
        </div>

        <div>
           <SectionHeader title="Context Loading" />
           <div className="bg-surface-sunken p-3 rounded-lg space-y-3 border border-border-subtle">
              <button className="w-full flex items-center justify-center gap-2 py-2 bg-surface-elevated border border-border rounded text-xs font-medium hover:border-foreground transition-colors">
                 <MapIcon size={14} /> Load from Location
              </button>
              <div className="space-y-2 pt-2 border-t border-border-subtle">
                 <Toggle label="Surrounding Buildings" checked={wf.mpContext.loadBuildings} onChange={(v) => dispatch({ type: 'UPDATE_WORKFLOW', payload: { mpContext: { ...wf.mpContext, loadBuildings: v } } })} />
                 <Toggle label="Road Network" checked={wf.mpContext.loadRoads} onChange={(v) => dispatch({ type: 'UPDATE_WORKFLOW', payload: { mpContext: { ...wf.mpContext, loadRoads: v } } })} />
              </div>
           </div>
        </div>
      </div>
    );
};
