import React from 'react';
import { useAppStore } from '../../../store';
import { 
  Box, Camera, Sun, Palette, Trees, Image as ImageIcon, 
  Settings, Lock, Zap, Layers
} from 'lucide-react';
import { cn } from '../../../lib/utils';
import { Slider } from '../../ui/Slider';
import { Toggle } from '../../ui/Toggle';
import { SegmentedControl } from '../../ui/SegmentedControl';

// Tab configuration mapping
const TAB_CONFIG = [
  { id: 'geometry', icon: Box, label: 'Geometry' },
  { id: 'camera', icon: Camera, label: 'Camera' },
  { id: 'lighting', icon: Sun, label: 'Lighting' },
  { id: 'materials', icon: Palette, label: 'Materials' },
  { id: 'context', icon: Trees, label: 'Context' },
  { id: 'output', icon: ImageIcon, label: 'Output' },
];

const SectionTitle: React.FC<{ title: string; icon?: React.ElementType }> = ({ title, icon: Icon }) => (
  <div className="flex items-center gap-2 mb-3 text-foreground-secondary">
    {Icon && <Icon size={14} />}
    <h3 className="text-xs font-bold uppercase tracking-wider">{title}</h3>
  </div>
);

// --- Sub-Panels ---

const GeometrySettings = () => {
    const { state, dispatch } = useAppStore();
    const s = state.geometry;
    const update = (payload: Partial<typeof s>) => dispatch({ type: 'UPDATE_GEOMETRY', payload });

    return (
       <div className="space-y-6 animate-fade-in">
          <div>
             <SectionTitle title="Preservation" icon={Lock} />
             <div className="space-y-4">
                <Slider label="Geometry Preservation" value={s.geometryPreservation} min={0} max={100} onChange={(v) => update({ geometryPreservation: v })} />
                <Slider label="Perspective Adherence" value={s.perspectiveAdherence} min={0} max={100} onChange={(v) => update({ perspectiveAdherence: v })} />
                
                <div className="pt-2 space-y-1">
                   <Toggle label="Lock Geometry" checked={s.lockGeometry} onChange={(v) => update({ lockGeometry: v })} />
                   <Toggle label="Lock Perspective" checked={s.lockPerspective} onChange={(v) => update({ lockPerspective: v })} />
                   <Toggle label="Suppress Hallucinations" checked={s.suppressHallucinations} onChange={(v) => update({ suppressHallucinations: v })} />
                </div>
             </div>
          </div>
          
          <div className="border-t border-border-subtle pt-4">
             <SectionTitle title="Refinement" icon={Zap} />
             <div className="space-y-4">
                <div>
                   <label className="text-xs text-foreground-muted mb-2 block">Edge Definition</label>
                   <SegmentedControl 
                      value={s.edgeDefinition}
                      options={[{label: 'Soft', value: 'soft'}, {label: 'Adaptive', value: 'adaptive'}, {label: 'Sharp', value: 'sharp'}]}
                      onChange={(v) => update({ edgeDefinition: v })}
                   />
                </div>
                <Slider label="Edge Strength" value={s.edgeStrength} min={0} max={100} onChange={(v) => update({ edgeStrength: v })} />
                <Toggle label="Allow Minor Refinement" checked={s.allowMinorRefinement} onChange={(v) => update({ allowMinorRefinement: v })} />
             </div>
          </div>
       </div>
    );
};

const CameraSettings = () => {
    const { state, dispatch } = useAppStore();
    const s = state.camera;
    const update = (payload: Partial<typeof s>) => dispatch({ type: 'UPDATE_CAMERA', payload });

    return (
       <div className="space-y-6 animate-fade-in">
          <div>
             <SectionTitle title="Projection" icon={Camera} />
             <div className="space-y-4">
                <SegmentedControl 
                   value={s.projection}
                   options={[
                      {label: 'Persp', value: 'perspective'}, 
                      {label: 'Axon', value: 'axonometric'},
                      {label: 'Iso', value: 'isometric'}
                   ]}
                   onChange={(v) => update({ projection: v })}
                />
                
                <SegmentedControl 
                   value={s.viewType}
                   options={[
                      {label: 'Eye', value: 'eye-level'}, 
                      {label: 'Aerial', value: 'aerial'},
                      {label: 'Worm', value: 'worm'}
                   ]}
                   onChange={(v) => update({ viewType: v })}
                />

                <Slider label="Field of View" value={s.fov} min={10} max={120} onChange={(v) => update({ fov: v })} />
             </div>
          </div>
          
          <div className="border-t border-border-subtle pt-4">
             <SectionTitle title="Composition" icon={Layers} />
             <div className="space-y-4">
                <Toggle label="Vertical Correction" checked={s.verticalCorrection} onChange={(v) => update({ verticalCorrection: v })} />
                {s.verticalCorrection && (
                    <Slider label="Strength" value={s.verticalCorrectionStrength} min={0} max={100} onChange={(v) => update({ verticalCorrectionStrength: v })} />
                )}
                <div className="h-px bg-border-subtle" />
                <Toggle label="Depth of Field" checked={s.depthOfField} onChange={(v) => update({ depthOfField: v })} />
                {s.depthOfField && (
                    <Slider label="Blur Strength" value={s.dofStrength} min={0} max={100} onChange={(v) => update({ dofStrength: v })} />
                )}
             </div>
          </div>
       </div>
    );
};

const LightingSettings = () => {
    const { state, dispatch } = useAppStore();
    const s = state.lighting;
    const update = (payload: Partial<typeof s>) => dispatch({ type: 'UPDATE_LIGHTING', payload });

    return (
       <div className="space-y-6 animate-fade-in">
          <div>
             <SectionTitle title="Environment" icon={Sun} />
             <div className="space-y-4">
                <div>
                   <label className="text-xs text-foreground-muted mb-2 block">Time of Day</label>
                   <select 
                      className="w-full h-8 bg-surface-elevated border border-border rounded text-xs px-2"
                      value={s.timeOfDay}
                      onChange={(e) => update({ timeOfDay: e.target.value as any })}
                   >
                      <option value="morning">Morning</option>
                      <option value="midday">Midday</option>
                      <option value="afternoon">Afternoon</option>
                      <option value="golden-hour">Golden Hour</option>
                      <option value="blue-hour">Blue Hour</option>
                      <option value="night">Night</option>
                   </select>
                </div>
                
                <Slider label="Sun Azimuth" value={s.sunAzimuth} min={0} max={360} onChange={(v) => update({ sunAzimuth: v })} />
                <Slider label="Sun Altitude" value={s.sunAltitude} min={0} max={90} onChange={(v) => update({ sunAltitude: v })} />
             </div>
          </div>
          
          <div className="border-t border-border-subtle pt-4">
             <SectionTitle title="Atmosphere" icon={Zap} />
             <div className="space-y-4">
                <div>
                   <label className="text-xs text-foreground-muted mb-2 block">Weather</label>
                   <SegmentedControl 
                      value={s.weather}
                      options={[
                         {label: 'Clear', value: 'clear'}, 
                         {label: 'Cloudy', value: 'cloudy'},
                         {label: 'Rain', value: 'rain'}
                      ]}
                      onChange={(v) => update({ weather: v })}
                   />
                </div>
                <Slider label="Cloud Cover" value={s.cloudCover} min={0} max={100} onChange={(v) => update({ cloudCover: v })} />
                <Toggle label="Fog / Haze" checked={s.fog} onChange={(v) => update({ fog: v })} />
             </div>
          </div>
       </div>
    );
};

const MaterialsSettings = () => {
    const { state, dispatch } = useAppStore();
    const s = state.materials;
    const update = (payload: Partial<typeof s>) => dispatch({ type: 'UPDATE_MATERIALS', payload });

    return (
       <div className="space-y-6 animate-fade-in">
          <div>
             <SectionTitle title="Surface Qualities" icon={Palette} />
             <div className="space-y-4">
                <Slider label="Texture Sharpness" value={s.textureSharpness} min={0} max={100} onChange={(v) => update({ textureSharpness: v })} />
                <Slider label="Reflectivity Bias" value={s.reflectivityBias} min={-50} max={50} onChange={(v) => update({ reflectivityBias: v })} />
                <Slider label="Aging / Patina" value={s.agingLevel} min={0} max={100} onChange={(v) => update({ agingLevel: v })} />
             </div>
          </div>
          
          <div className="border-t border-border-subtle pt-4">
             <SectionTitle title="Material Emphasis" icon={Layers} />
             <div className="space-y-4">
                <Slider label="Concrete" value={s.concreteEmphasis} min={0} max={100} onChange={(v) => update({ concreteEmphasis: v })} />
                <Slider label="Glass" value={s.glassEmphasis} min={0} max={100} onChange={(v) => update({ glassEmphasis: v })} />
                <Slider label="Wood" value={s.woodEmphasis} min={0} max={100} onChange={(v) => update({ woodEmphasis: v })} />
                <Slider label="Metal" value={s.metalEmphasis} min={0} max={100} onChange={(v) => update({ metalEmphasis: v })} />
                <Slider label="Vegetation" value={s.stoneEmphasis} min={0} max={100} onChange={(v) => update({ stoneEmphasis: v })} />
             </div>
          </div>
       </div>
    );
};

const ContextSettings = () => {
    const { state, dispatch } = useAppStore();
    const s = state.context;
    const update = (payload: Partial<typeof s>) => dispatch({ type: 'UPDATE_CONTEXT', payload });

    return (
       <div className="space-y-6 animate-fade-in">
          <div>
             <SectionTitle title="Entourage" icon={Trees} />
             <div className="space-y-4">
                <div className="p-3 bg-surface-elevated rounded border border-border">
                   <Toggle label="Include People" checked={s.people} onChange={(v) => update({ people: v })} />
                   {s.people && (
                      <div className="mt-3 space-y-3 pl-2 border-l-2 border-border-subtle">
                         <SegmentedControl 
                            value={s.peopleDensity}
                            options={[{label: 'Sparse', value: 'sparse'}, {label: 'Busy', value: 'busy'}]}
                            onChange={(v) => update({ peopleDensity: v })}
                         />
                         <SegmentedControl 
                            value={s.peopleStyle}
                            options={[{label: 'Photo', value: 'photorealistic'}, {label: 'Silh.', value: 'silhouette'}]}
                            onChange={(v) => update({ peopleStyle: v })}
                         />
                      </div>
                   )}
                </div>
                
                <div className="p-3 bg-surface-elevated rounded border border-border">
                   <Toggle label="Vegetation" checked={s.vegetation} onChange={(v) => update({ vegetation: v })} />
                   {s.vegetation && (
                      <div className="mt-3 space-y-3 pl-2 border-l-2 border-border-subtle">
                         <Slider label="Density" value={s.vegetationDensity} min={0} max={100} onChange={(v) => update({ vegetationDensity: v })} />
                         <SegmentedControl 
                            value={s.season}
                            options={[
                               {label: 'Spr', value: 'spring'}, 
                               {label: 'Sum', value: 'summer'},
                               {label: 'Aut', value: 'autumn'},
                               {label: 'Win', value: 'winter'}
                            ]}
                            onChange={(v) => update({ season: v })}
                         />
                      </div>
                   )}
                </div>

                <div className="p-3 bg-surface-elevated rounded border border-border">
                   <Toggle label="Vehicles" checked={s.vehicles} onChange={(v) => update({ vehicles: v })} />
                   <Toggle label="Urban Furniture" checked={s.urbanFurniture} onChange={(v) => update({ urbanFurniture: v })} />
                </div>
             </div>
          </div>
       </div>
    );
};

const OutputSettings = () => {
    const { state, dispatch } = useAppStore();
    const s = state.output;
    const update = (payload: Partial<typeof s>) => dispatch({ type: 'UPDATE_OUTPUT', payload });

    return (
       <div className="space-y-6 animate-fade-in">
          <div>
             <SectionTitle title="Resolution & Format" icon={ImageIcon} />
             <div className="space-y-4">
                <SegmentedControl 
                   value={s.resolution}
                   options={[
                      {label: '2K', value: '2k'}, 
                      {label: '4K', value: '4k'},
                      {label: '8K', value: '8k'}
                   ]}
                   onChange={(v) => update({ resolution: v })}
                />
                
                <SegmentedControl 
                   value={s.aspectRatio}
                   options={[
                      {label: '16:9', value: '16:9'}, 
                      {label: '4:3', value: '4:3'},
                      {label: '1:1', value: '1:1'},
                      {label: '9:16', value: '9:16'}
                   ]}
                   onChange={(v) => update({ aspectRatio: v })}
                />
                
                <div className="flex gap-2">
                   <button 
                      className={cn("flex-1 py-2 text-xs border rounded", s.format === 'png' ? "bg-foreground text-background" : "bg-surface-elevated text-foreground-muted")}
                      onClick={() => update({ format: 'png' })}
                   >
                      PNG
                   </button>
                   <button 
                      className={cn("flex-1 py-2 text-xs border rounded", s.format === 'jpg' ? "bg-foreground text-background" : "bg-surface-elevated text-foreground-muted")}
                      onClick={() => update({ format: 'jpg' })}
                   >
                      JPG
                   </button>
                </div>
             </div>
          </div>
          
          <div className="border-t border-border-subtle pt-4">
             <SectionTitle title="Generation Config" icon={Settings} />
             <div className="space-y-4">
                <div>
                   <label className="text-xs text-foreground-muted mb-2 block">Seed</label>
                   <div className="flex gap-2">
                      <input 
                         type="number" 
                         value={s.seed} 
                         onChange={(e) => update({ seed: parseInt(e.target.value) })}
                         className="flex-1 h-8 bg-surface-elevated border border-border rounded px-2 text-xs font-mono"
                      />
                      <Toggle label="Lock" checked={s.seedLocked} onChange={(v) => update({ seedLocked: v })} />
                   </div>
                </div>
                <Toggle label="Embed Metadata" checked={s.embedMetadata} onChange={(v) => update({ embedMetadata: v })} />
             </div>
          </div>
       </div>
    );
};

// --- Main Component ---

export const RightPanel: React.FC = () => {
  const { state, dispatch } = useAppStore();
  const { rightPanelOpen, activeRightTab } = state;

  if (!rightPanelOpen) {
    return (
      <div className="w-10 border-l border-border bg-background-tertiary flex flex-col items-center py-4 gap-4 z-20">
        <button 
          onClick={() => dispatch({ type: 'TOGGLE_RIGHT_PANEL' })}
          className="p-2 text-foreground-muted hover:text-foreground hover:bg-surface-sunken rounded-md transition-all"
        >
          <Settings size={20} />
        </button>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeRightTab) {
      case 'geometry': return <GeometrySettings />;
      case 'camera': return <CameraSettings />;
      case 'lighting': return <LightingSettings />;
      case 'materials': return <MaterialsSettings />;
      case 'context': return <ContextSettings />;
      case 'output': return <OutputSettings />;
      default: return <GeometrySettings />;
    }
  };

  return (
    <div 
        className={cn(
            "border-l border-border bg-background-tertiary flex flex-col transition-all duration-300 z-20 h-full",
            // Using a style or fixed width class as safer approach than dynamic class for JIT
            `w-[320px]`
        )}
        style={{ width: state.rightPanelWidth ? `${state.rightPanelWidth}px` : undefined }}
    >
      {/* Header Tabs */}
      <div className="flex items-center overflow-x-auto no-scrollbar border-b border-border bg-surface-elevated shrink-0">
        {TAB_CONFIG.map(tab => (
           <button
             key={tab.id}
             onClick={() => dispatch({ type: 'SET_ACTIVE_TAB', payload: tab.id })}
             className={cn(
               "flex flex-col items-center justify-center min-w-[60px] h-14 px-2 border-b-2 transition-colors",
               activeRightTab === tab.id 
                 ? "border-foreground text-foreground bg-surface-sunken" 
                 : "border-transparent text-foreground-muted hover:text-foreground hover:bg-surface-sunken/50"
             )}
             title={tab.label}
           >
             <tab.icon size={18} strokeWidth={1.5} className="mb-1" />
             <span className="text-[9px] font-medium uppercase tracking-tight">{tab.label}</span>
           </button>
        ))}
        {/* Toggle Panel Button */}
        <button 
            onClick={() => dispatch({ type: 'TOGGLE_RIGHT_PANEL' })}
            className="ml-auto mr-2 p-1.5 text-foreground-muted hover:text-foreground rounded hover:bg-surface-sunken transition-colors"
        >
            <Settings size={16} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-5 custom-scrollbar">
         {renderContent()}
      </div>
    </div>
  );
};
