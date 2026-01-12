
import React, { useState } from 'react';
import { useAppStore } from '../../../store';
import { Slider } from '../../ui/Slider';
import { Toggle } from '../../ui/Toggle';
import { SegmentedControl } from '../../ui/SegmentedControl';
import { Accordion } from '../../ui/Accordion';
import { cn } from '../../../lib/utils';
import { StyleBrowserDialog } from '../../modals/StyleBrowserDialog';
import { 
  Box, Camera, Sun, Palette, Layers, Grid, Sparkle, Brush, Type, 
  ChevronsLeft, ChevronsRight, FileCode, Upload, Wand2, Paintbrush, Home, Cloud, 
  Trash2, Wrench, Expand, Maximize2, Video, MousePointer, Aperture, Settings,
  ArrowRight, Download, Play, CheckCircle2, AlertTriangle, XCircle, FileText,
  Minimize, MoreHorizontal, HelpCircle, Share2, MonitorPlay, Zap, Image as ImageIcon,
  Move, RotateCcw, Focus
} from 'lucide-react';
import { BUILT_IN_STYLES } from '../../../engine/promptEngine';

// --- Shared Components ---

interface VerticalCardProps {
  label: string;
  description?: string;
  selected: boolean;
  onClick: () => void;
}

const VerticalCard: React.FC<VerticalCardProps> = ({ label, description, selected, onClick }) => (
  <button 
    onClick={onClick}
    className={cn(
      "w-full text-left p-3 rounded-lg border transition-all mb-2 last:mb-0",
      selected 
        ? "bg-foreground text-background border-foreground shadow-md" 
        : "bg-surface-elevated border-border hover:border-foreground-muted hover:bg-surface-sunken text-foreground"
    )}
  >
    <div className="text-xs font-bold">{label}</div>
    {description && <div className={cn("text-[10px] mt-1", selected ? "text-white/70" : "text-foreground-muted")}>{description}</div>}
  </button>
);

const ColorPicker = ({ color, onChange, className }: { color?: string, onChange?: (c: string) => void, className?: string }) => (
  <div className={cn("w-6 h-6 rounded border border-border cursor-pointer shadow-sm relative overflow-hidden", className)}>
    <input 
        type="color" 
        value={color || '#ffffff'} 
        onChange={(e) => onChange && onChange && onChange(e.target.value)}
        className="absolute -top-2 -left-2 w-10 h-10 p-0 border-0 opacity-0 cursor-pointer"
    />
    <div className="w-full h-full" style={{ backgroundColor: color || '#ffffff' }} />
  </div>
);

const NumberInput = ({ label, value, onChange, min, max, step, unit }: { label?: string, value: number, onChange: (v: number) => void, min?: number, max?: number, step?: number, unit?: string }) => (
  <div className="flex items-center justify-between gap-2">
    {label && <label className="text-xs text-foreground-muted flex-1 truncate">{label}</label>}
    <div className="flex items-center gap-1">
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-14 h-7 text-[10px] bg-surface-sunken border border-border rounded px-1 text-right focus:border-accent outline-none"
      />
      {unit && <span className="text-[10px] text-foreground-muted w-3">{unit}</span>}
    </div>
  </div>
);

const StyleSelector = () => {
    const { state, dispatch } = useAppStore();
    const [isOpen, setIsOpen] = useState(false);
    const activeStyle = BUILT_IN_STYLES.find(s => s.id === state.activeStyleId) || BUILT_IN_STYLES[0];

    return (
        <>
            <StyleBrowserDialog 
                isOpen={isOpen} 
                onClose={() => setIsOpen(false)} 
                activeStyleId={state.activeStyleId} 
                onSelect={(id) => dispatch({ type: 'SET_STYLE', payload: id })} 
            />
            <div className="mb-4">
                <label className="text-xs text-foreground-muted mb-2 block font-bold uppercase tracking-wider">Style</label>
                <button 
                    onClick={() => setIsOpen(true)}
                    className="w-full flex items-center gap-3 p-2 bg-surface-elevated border border-border rounded-lg hover:border-foreground transition-all group"
                >
                    <div 
                        className="w-10 h-10 rounded bg-cover bg-center shrink-0 border border-border"
                        style={{ backgroundImage: `url(${activeStyle.previewUrl})` }} 
                    />
                    <div className="flex-1 text-left min-w-0">
                        <div className="text-xs font-bold truncate group-hover:text-accent transition-colors">{activeStyle.name}</div>
                        <div className="text-[10px] text-foreground-muted truncate">{activeStyle.category}</div>
                    </div>
                    <Settings size={14} className="text-foreground-muted" />
                </button>
            </div>
        </>
    );
};

// --- FEATURE 1: 3D TO RENDER ---
const Render3DPanel = () => {
    const { state, dispatch } = useAppStore();
    const wf = state.workflow;
    const update = (p: any) => dispatch({ type: 'UPDATE_WORKFLOW', payload: p });

    // Mock state for internal panel controls
    const [transform, setTransform] = useState({ x: 0, y: 0, z: 0, scale: 100 });

    return (
        <div className="space-y-6">
            <div>
                <label className="text-xs text-foreground-muted mb-2 block font-bold uppercase tracking-wider">Generation Mode</label>
                <div className="space-y-1">
                    {[
                        { id: 'enhance', label: 'Enhance', desc: 'Improves lighting and textures while keeping geometry.' },
                        { id: 'stylize', label: 'Stylize', desc: 'Applies artistic styles to the base model.' },
                        { id: 'hybrid', label: 'Hybrid', desc: 'Balances structural accuracy with creative details.' },
                        { id: 'strict-realism', label: 'Strict Realism', desc: 'Photographic accuracy, minimal hallucination.' },
                        { id: 'concept-push', label: 'Concept Push', desc: 'High creativity, explores new forms.' },
                    ].map(m => (
                        <VerticalCard 
                            key={m.id} 
                            label={m.label} 
                            description={m.desc} 
                            selected={wf.renderMode === m.id} 
                            onClick={() => update({ renderMode: m.id as any })} 
                        />
                    ))}
                </div>
            </div>

            <StyleSelector />

            <Accordion items={[
                { id: 'geo', title: 'Geometry', content: (
                    <div className="space-y-3">
                        <div className="grid grid-cols-3 gap-2">
                            <NumberInput label="X" value={transform.x} onChange={(v) => setTransform({...transform, x: v})} />
                            <NumberInput label="Y" value={transform.y} onChange={(v) => setTransform({...transform, y: v})} />
                            <NumberInput label="Z" value={transform.z} onChange={(v) => setTransform({...transform, z: v})} />
                        </div>
                        <Slider label="Scale (%)" value={transform.scale} min={1} max={1000} onChange={(v) => setTransform({...transform, scale: v})} />
                        <div className="pt-2 border-t border-border-subtle space-y-1">
                            <Toggle label="Wireframe Overlay" checked={false} onChange={()=>{}} />
                            <Toggle label="Ground Plane" checked={true} onChange={()=>{}} />
                            <Toggle label="Auto-Center" checked={true} onChange={()=>{}} />
                        </div>
                    </div>
                )},
                { id: 'cam', title: 'Camera', content: (
                    <div className="space-y-4">
                        <Slider label="Field of View" value={50} min={15} max={120} onChange={()=>{}} />
                        <Slider label="Camera Height (m)" value={1.6} min={0.1} max={100} onChange={()=>{}} />
                        <SegmentedControl value="persp" options={[{label:'Perspective', value:'persp'}, {label:'Two-Point', value:'2pt'}, {label:'Ortho', value:'ortho'}]} onChange={()=>{}} />
                        <div className="space-y-1">
                            <Toggle label="Vertical Correction" checked={true} onChange={()=>{}} />
                            <Toggle label="Depth of Field" checked={false} onChange={()=>{}} />
                        </div>
                    </div>
                )},
                { id: 'lit', title: 'Lighting', content: (
                    <div className="space-y-4">
                        <Slider label="Sun Azimuth" value={135} min={0} max={360} onChange={()=>{}} />
                        <Slider label="Sun Altitude" value={45} min={0} max={90} onChange={()=>{}} />
                        <Slider label="Intensity" value={1.0} min={0} max={5} step={0.1} onChange={()=>{}} />
                        <div className="space-y-2">
                            <label className="text-xs text-foreground-muted">HDRI Environment</label>
                            <select className="w-full bg-surface-elevated border border-border rounded text-xs h-8 px-2"><option>Studio Soft</option><option>Urban Day</option><option>Forest</option><option>Night City</option></select>
                        </div>
                        <Toggle label="Cast Shadows" checked={true} onChange={()=>{}} />
                    </div>
                )},
                { id: 'mat', title: 'Materials', content: (
                    <div className="space-y-3">
                        <SegmentedControl value="orig" options={[{label:'Original', value:'orig'}, {label:'Clay', value:'clay'}, {label:'Override', value:'ovr'}]} onChange={()=>{}} />
                        <div className="p-2 bg-surface-sunken rounded border border-border-subtle text-xs text-foreground-muted">
                            <Toggle label="Keep Glass" checked={true} onChange={()=>{}} />
                            <Toggle label="Keep Emission" checked={true} onChange={()=>{}} />
                        </div>
                        <button className="w-full py-2 border border-dashed border-border rounded text-xs text-foreground-muted hover:bg-surface-elevated">+ Material Override</button>
                    </div>
                )},
                { id: 'ctx', title: 'Context', content: (
                    <div className="space-y-3">
                        <Slider label="Vegetation" value={0} min={0} max={100} onChange={()=>{}} />
                        <Slider label="Cars" value={0} min={0} max={100} onChange={()=>{}} />
                        <Slider label="People" value={0} min={0} max={100} onChange={()=>{}} />
                        <div className="pt-2 border-t border-border-subtle">
                            <label className="text-xs text-foreground-muted mb-1 block">Background</label>
                            <select className="w-full bg-surface-elevated border border-border rounded text-xs h-8 px-2"><option>Transparent</option><option>Sky Gradient</option><option>Cityscape</option><option>Nature</option></select>
                        </div>
                    </div>
                )},
                { id: 'out', title: 'Output', content: (
                    <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-2">
                            <NumberInput label="Width" value={1920} onChange={()=>{}} />
                            <NumberInput label="Height" value={1080} onChange={()=>{}} />
                        </div>
                        <select className="w-full bg-surface-elevated border border-border rounded text-xs h-8 px-2"><option>PNG - Lossless</option><option>JPG - High</option><option>EXR - Linear</option></select>
                        <Toggle label="Include Alpha" checked={true} onChange={()=>{}} />
                        <Toggle label="Denoise" checked={true} onChange={()=>{}} />
                    </div>
                )},
            ]} defaultValue="cam" />
        </div>
    );
};

// --- FEATURE 2: CAD TO RENDER ---
const CadToRenderPanel = () => {
    return (
        <div className="space-y-6">
            <div>
                <label className="text-xs text-foreground-muted mb-2 block font-bold uppercase tracking-wider">View Type</label>
                <SegmentedControl value="exterior" options={[{label:'Ext', value:'exterior'}, {label:'Int', value:'interior'}, {label:'Aerial', value:'aerial'}, {label:'Street', value:'street'}]} onChange={()=>{}} />
            </div>

            <div>
                <label className="text-xs text-foreground-muted mb-2 block font-bold uppercase tracking-wider">Camera Angle</label>
                <div className="h-24 bg-surface-sunken border border-border rounded flex items-center justify-center text-foreground-muted text-xs hover:bg-surface-elevated cursor-pointer transition-colors">
                    <Focus size={24} className="opacity-50" />
                </div>
            </div>

            <div>
                <label className="text-xs text-foreground-muted mb-2 block font-bold uppercase tracking-wider">Spatial</label>
                <div className="space-y-3">
                    <Slider label="Ceiling Height" value={2.8} min={2} max={10} onChange={()=>{}} />
                    <Slider label="Floor Thickness" value={0.3} min={0.1} max={1} onChange={()=>{}} />
                    <Slider label="Wall Thickness" value={0.2} min={0.1} max={1} onChange={()=>{}} />
                    <Slider label="Interpretation" value={50} min={0} max={100} onChange={()=>{}} />
                </div>
            </div>

            <div>
                <label className="text-xs text-foreground-muted mb-2 block font-bold uppercase tracking-wider">Materials</label>
                <div className="space-y-1">
                    {['Walls', 'Floors', 'Ceilings', 'Windows', 'Doors'].map(el => (
                        <div key={el} className="flex justify-between items-center p-2 bg-surface-elevated border border-border rounded text-xs hover:border-foreground-muted cursor-pointer transition-all">
                            <span>{el}</span>
                            <span className="text-foreground-muted bg-surface-sunken px-1.5 py-0.5 rounded text-[10px]">Auto</span>
                        </div>
                    ))}
                    <button className="w-full py-1.5 text-[10px] border border-dashed border-border rounded text-foreground-muted hover:bg-surface-elevated transition-colors">+ Add Material Rule</button>
                </div>
            </div>

            <Accordion items={[
                { id: 'light', title: 'Lighting', content: (
                    <div className="space-y-3">
                        <Toggle label="Auto-Generate Interior Lights" checked={true} onChange={()=>{}} />
                        <Slider label="Sun Intensity" value={80} min={0} max={100} onChange={()=>{}} />
                        <Slider label="Ambient Light" value={40} min={0} max={100} onChange={()=>{}} />
                        <div className="flex justify-between text-xs pt-1">
                            <span className="text-foreground-muted">North Direction</span>
                            <input type="number" className="w-12 h-6 bg-surface-sunken border border-border rounded text-center" defaultValue={0} />
                        </div>
                    </div>
                )},
                { id: 'ctx', title: 'Context', content: (
                    <div className="space-y-3">
                        <Toggle label="Generate Site Context" checked={true} onChange={()=>{}} />
                        <Slider label="Neighboring Building Height" value={15} min={0} max={100} onChange={()=>{}} />
                        <Toggle label="Add Vegetation" checked={true} onChange={()=>{}} />
                        <Toggle label="Add Street Elements" checked={false} onChange={()=>{}} />
                    </div>
                )},
                { id: 'furn', title: 'Furniture', content: (
                    <div className="space-y-3">
                        <Toggle label="Auto-furnish" checked={true} onChange={()=>{}} />
                        <div className="pl-2 border-l-2 border-border-subtle space-y-2">
                            <Toggle label="By Room Type" checked={true} onChange={()=>{}} />
                            <select className="w-full bg-surface-sunken border border-border rounded text-xs h-7 px-1"><option>Modern</option><option>Classic</option><option>Scandinavian</option></select>
                            <Slider label="Density" value={60} min={0} max={100} onChange={()=>{}} />
                        </div>
                    </div>
                )},
                { id: 'out', title: 'Output', content: (
                    <div className="space-y-3">
                        <select className="w-full bg-surface-elevated border border-border rounded text-xs h-8 px-2"><option>High Quality (4K)</option><option>Standard (HD)</option><option>Draft</option></select>
                        <Toggle label="Denoise" checked={true} onChange={()=>{}} />
                        <Toggle label="Color Correction" checked={true} onChange={()=>{}} />
                    </div>
                )},
            ]} defaultValue="furn" />
        </div>
    );
};

// --- FEATURE 3: MASTERPLANS ---
const MasterplanPanel = () => {
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
                    <select className="w-full bg-surface-elevated border border-border rounded text-xs h-8 px-2"><option>Flat Roof</option><option>Gabled</option><option>Green Roof</option></select>
                </div>
            </div>

            <Accordion items={[
                { id: 'land', title: 'Landscape', content: (
                    <div className="space-y-3">
                        <Slider label="Tree Density" value={60} min={0} max={100} onChange={()=>{}} />
                        <Toggle label="Water Bodies" checked={true} onChange={()=>{}} />
                        <Toggle label="Parks & Plazas" checked={true} onChange={()=>{}} />
                        <select className="w-full bg-surface-elevated border border-border rounded text-xs h-8 px-2"><option>Temperate</option><option>Tropical</option><option>Arid</option></select>
                    </div>
                )},
                { id: 'infra', title: 'Infrastructure', content: (
                    <div className="space-y-3">
                        <Toggle label="Roads" checked={true} onChange={()=>{}} />
                        <Slider label="Traffic Density" value={30} min={0} max={100} onChange={()=>{}} />
                        <Toggle label="Pedestrian Paths" checked={true} onChange={()=>{}} />
                        <Toggle label="Street Lights" checked={false} onChange={()=>{}} />
                    </div>
                )},
                { id: 'atm', title: 'Atmosphere', content: (
                    <div className="space-y-3">
                        <Slider label="Haze / Depth" value={20} min={0} max={100} onChange={()=>{}} />
                        <Slider label="Cloud Cover" value={40} min={0} max={100} onChange={()=>{}} />
                        <select className="w-full bg-surface-elevated border border-border rounded text-xs h-8 px-2"><option>Clear Day</option><option>Golden Hour</option><option>Overcast</option></select>
                    </div>
                )},
                { id: 'annot', title: 'Annotations', content: (
                    <div className="space-y-2">
                        <Toggle label="Show Labels" checked={true} onChange={()=>{}} />
                        <Toggle label="Show Diagrams" checked={false} onChange={()=>{}} />
                        <Toggle label="Scale Bar" checked={true} onChange={()=>{}} />
                        <Toggle label="North Arrow" checked={true} onChange={()=>{}} />
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

// --- FEATURE 4: VISUAL EDITING SUITE ---
const VisualEditPanel = () => {
    const { state, dispatch } = useAppStore();
    const tool = state.workflow.activeTool;

    const renderToolOptions = () => {
        switch (tool) {
            case 'select': return (
                <div className="space-y-4">
                    <SegmentedControl value="rect" options={[{label:'Rect', value:'rect'}, {label:'Lasso', value:'lasso'}, {label:'AI', value:'ai'}]} onChange={()=>{}} />
                    <div className="grid grid-cols-2 gap-2">
                        {['Facade', 'Windows', 'Sky', 'Ground'].map(t => <button key={t} className="text-xs border rounded py-1 hover:bg-surface-elevated">{t}</button>)}
                    </div>
                    <Slider label="Feather" value={0} min={0} max={20} onChange={()=>{}} />
                    <div className="flex gap-2">
                        <button className="flex-1 py-1 text-xs border rounded bg-surface-elevated">Add</button>
                        <button className="flex-1 py-1 text-xs border rounded hover:bg-surface-elevated">Sub</button>
                        <button className="flex-1 py-1 text-xs border rounded hover:bg-surface-elevated">Inv</button>
                    </div>
                </div>
            );
            case 'material': return (
                <div className="space-y-4">
                    <div className="text-xs text-center p-2 bg-surface-sunken rounded border border-border">Current Selection: Wall</div>
                    <div className="grid grid-cols-3 gap-2">
                        {[1,2,3,4,5,6].map(i => <div key={i} className="aspect-square bg-surface-elevated border border-border rounded cursor-pointer hover:border-foreground"/>)}
                    </div>
                    <button className="w-full py-2 text-xs border rounded flex items-center justify-center gap-2"><Upload size={12}/> Custom Texture</button>
                    <Slider label="Intensity" value={80} min={0} max={100} onChange={()=>{}} />
                    <Toggle label="Preserve Lighting" checked={true} onChange={()=>{}} />
                    <div className="grid grid-cols-2 gap-2"><button className="py-2 border rounded">Preview</button><button className="py-2 bg-foreground text-background rounded">Apply</button></div>
                </div>
            );
            case 'lighting': return (
                <div className="space-y-4">
                    <SegmentedControl value="global" options={[{label:'Global Relight', value:'global'}, {label:'Local', value:'local'}]} onChange={()=>{}} />
                    <Slider label="Time of Day" value={14} min={0} max={24} onChange={()=>{}} />
                    <div className="h-20 bg-surface-sunken rounded flex items-center justify-center text-xs">[Compass]</div>
                    <Slider label="Brightness" value={50} min={0} max={100} onChange={()=>{}} />
                    <Slider label="Shadows" value={50} min={0} max={100} onChange={()=>{}} />
                    <Slider label="Highlights" value={50} min={0} max={100} onChange={()=>{}} />
                    <div className="grid grid-cols-2 gap-2"><button className="py-2 border rounded">Preview</button><button className="py-2 bg-foreground text-background rounded">Apply</button></div>
                </div>
            );
            case 'object': return (
                <div className="space-y-4">
                    <select className="w-full h-8 text-xs bg-surface-elevated border border-border rounded px-2"><option>Furniture</option><option>Vegetation</option><option>People</option></select>
                    <div className="grid grid-cols-3 gap-2">
                        {[1,2,3,4,5,6].map(i => <div key={i} className="aspect-square bg-surface-elevated border border-border rounded cursor-pointer hover:border-foreground"/>)}
                    </div>
                    <Slider label="Scale" value={1} min={0.1} max={5} step={0.1} onChange={()=>{}} />
                    <Toggle label="Auto-scale" checked={true} onChange={()=>{}} />
                    <Toggle label="Match Lighting" checked={true} onChange={()=>{}} />
                    <button className="w-full py-2 bg-foreground text-background rounded text-xs font-bold">Place Object</button>
                </div>
            );
            case 'sky': return (
                <div className="space-y-4">
                    <Toggle label="Auto-detect Sky" checked={true} onChange={()=>{}} />
                    <div className="grid grid-cols-2 gap-2">
                        {['Clear', 'Cloudy', 'Sunset', 'Night'].map(s => <button key={s} className="py-2 text-xs border rounded hover:bg-surface-elevated">{s}</button>)}
                    </div>
                    <button className="w-full py-2 text-xs border rounded flex items-center justify-center gap-2"><Upload size={12}/> Custom Sky</button>
                    <Slider label="Horizon Blend" value={50} min={0} max={100} onChange={()=>{}} />
                    <Toggle label="Update Reflections" checked={true} onChange={()=>{}} />
                    <div className="grid grid-cols-2 gap-2"><button className="py-2 border rounded">Preview</button><button className="py-2 bg-foreground text-background rounded">Apply</button></div>
                </div>
            );
            case 'adjust': return (
                <div className="space-y-4">
                    <div>
                        <div className="text-[10px] font-bold uppercase text-foreground-muted mb-1">Tone</div>
                        <Slider label="Exposure" value={0} min={-100} max={100} onChange={()=>{}} />
                        <Slider label="Contrast" value={0} min={-100} max={100} onChange={()=>{}} />
                        <Slider label="Highlights" value={0} min={-100} max={100} onChange={()=>{}} />
                        <Slider label="Shadows" value={0} min={-100} max={100} onChange={()=>{}} />
                    </div>
                    <div>
                        <div className="text-[10px] font-bold uppercase text-foreground-muted mb-1">Color</div>
                        <Slider label="Temp" value={0} min={-100} max={100} onChange={()=>{}} />
                        <Slider label="Sat" value={0} min={-100} max={100} onChange={()=>{}} />
                    </div>
                    <div className="grid grid-cols-4 gap-1">
                        {['Nat', 'Viv', 'Mat', 'B&W'].map(p => <button key={p} className="text-[10px] border rounded py-1 hover:bg-surface-elevated">{p}</button>)}
                    </div>
                    <div className="grid grid-cols-2 gap-2"><button className="py-2 border rounded text-xs">Reset</button><button className="py-2 bg-foreground text-background rounded text-xs">Apply</button></div>
                </div>
            );
            default: return <div className="p-4 text-xs text-center text-foreground-muted">Select a tool from the left toolbar.</div>;
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-border-subtle">
                <Wrench size={16} className="text-accent" />
                <h3 className="text-sm font-bold capitalize">{tool || 'Tool'} Options</h3>
            </div>
            {renderToolOptions()}
        </div>
    );
};

// --- FEATURE 5: EXPLODED VIEWS ---
const ExplodedPanel = () => {
    return (
        <div className="space-y-6">
            <div>
                <label className="text-xs text-foreground-muted mb-2 block font-bold uppercase tracking-wider">View Type</label>
                <SegmentedControl value="axon" options={[{label:'Axonometric', value:'axon'}, {label:'Perspective', value:'persp'}]} onChange={()=>{}} />
            </div>
            <div>
                <label className="text-xs text-foreground-muted mb-2 block font-bold uppercase tracking-wider">Direction</label>
                <div className="h-20 bg-surface-sunken border border-border rounded flex items-center justify-center text-xs">[3D Direction Picker]</div>
            </div>
            <Slider label="Separation Distance" value={50} min={0} max={200} onChange={()=>{}} />
            
            <div>
                <label className="text-xs text-foreground-muted mb-2 block font-bold uppercase tracking-wider">Visual Style</label>
                <select className="w-full bg-surface-elevated border border-border rounded text-xs h-8 px-2 mb-2"><option>Diagrammatic</option><option>Photorealistic</option><option>Technical</option></select>
                <SegmentedControl value="sys" options={[{label:'Realistic Color', value:'real'}, {label:'By System', value:'sys'}]} onChange={()=>{}} />
                <div className="mt-2 space-y-1">
                    <Toggle label="Labels" checked={true} onChange={()=>{}} />
                    <Toggle label="Leader Lines" checked={true} onChange={()=>{}} />
                </div>
            </div>

            <div>
                <label className="text-xs text-foreground-muted mb-2 block font-bold uppercase tracking-wider">Animation</label>
                <Toggle label="Enable Animation" checked={false} onChange={()=>{}} />
                <SegmentedControl value="exp" options={[{label:'Assembly', value:'assembly'}, {label:'Explosion', value:'exp'}]} onChange={()=>{}} />
                <Slider label="Duration (s)" value={3} min={1} max={10} onChange={()=>{}} />
                <div className="flex gap-2 mt-2">
                    <button className="flex-1 py-1 text-xs border rounded bg-surface-elevated">GIF</button>
                    <button className="flex-1 py-1 text-xs border rounded hover:bg-surface-elevated">MP4</button>
                </div>
                <button className="w-full mt-2 py-2 border rounded flex items-center justify-center gap-2 text-xs hover:bg-surface-elevated"><Play size={12}/> Preview</button>
            </div>

            <Accordion items={[
                { id: 'out', title: 'Output', content: (
                    <div className="space-y-3">
                        <select className="w-full bg-surface-elevated border border-border rounded text-xs h-8 px-2"><option>4K Resolution</option><option>1080p</option></select>
                        <Toggle label="Transparent Background" checked={true} onChange={()=>{}} />
                    </div>
                )}
            ]} />
        </div>
    );
};

// --- FEATURE 6: RENDER TO SECTION ---
const SectionPanel = () => {
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
                    <ColorPicker color="#000000" />
                </div>
                <div className="grid grid-cols-4 gap-2 mb-3">
                    {['Solid', 'Diag', 'Cross', 'Conc'].map(p => <button key={p} className="h-8 border rounded bg-surface-elevated text-[10px]">{p}</button>)}
                </div>
                <select className="w-full bg-surface-elevated border border-border rounded text-xs h-8 px-2 mb-2"><option>Heavy Cut Line</option><option>Medium</option></select>
                <Slider label="Beyond Visibility" value={50} min={0} max={100} onChange={()=>{}} />
            </div>

            <Accordion items={[
                { id: 'lines', title: 'Line Weights', content: (
                    <div className="space-y-3">
                        <Slider label="Cut Lines" value={4} min={1} max={10} onChange={()=>{}} />
                        <Slider label="View Lines" value={2} min={1} max={5} onChange={()=>{}} />
                        <Slider label="Grid Lines" value={1} min={0} max={2} onChange={()=>{}} />
                    </div>
                )}
            ]} />

            <div>
                <label className="text-xs text-foreground-muted mb-2 block font-bold uppercase tracking-wider">Annotations</label>
                <div className="space-y-1">
                    <Toggle label="Dimensions" checked={true} onChange={()=>{}} />
                    <Toggle label="Level Markers" checked={true} onChange={()=>{}} />
                    <Toggle label="Material Tags" checked={false} onChange={()=>{}} />
                </div>
            </div>

            <Accordion items={[
                { id: 'out', title: 'Output', content: (
                    <div className="space-y-3">
                        <select className="w-full bg-surface-elevated border border-border rounded text-xs h-8 px-2"><option>1:50</option><option>1:100</option><option>1:200</option></select>
                        <select className="w-full bg-surface-elevated border border-border rounded text-xs h-8 px-2"><option>PDF (Vector)</option><option>DWG</option><option>PNG</option></select>
                    </div>
                )}
            ]} />
        </div>
    );
};

// --- FEATURE 7: SKETCH TO RENDER ---
const SketchPanel = () => {
    return (
        <div className="space-y-6">
            <div>
                <label className="text-xs text-foreground-muted mb-2 block font-bold uppercase tracking-wider">Interpretation</label>
                <div className="flex justify-between text-[10px] text-foreground-muted mb-1"><span>Faithful</span><span>Creative</span></div>
                <Slider value={50} min={0} max={100} onChange={()=>{}} />
            </div>

            <StyleSelector />

            <Accordion items={[
                { id: 'mat', title: 'Materials', content: (
                    <div className="space-y-3">
                        <select className="w-full bg-surface-elevated border border-border rounded text-xs h-8 px-2"><option>Concrete & Glass</option><option>Wood & Brick</option><option>White Stucco</option></select>
                        <Slider label="Texture Scale" value={100} min={10} max={200} onChange={()=>{}} />
                    </div>
                )},
                { id: 'lit', title: 'Lighting', content: (
                    <div className="space-y-3">
                        <Toggle label="Match Sketch Shadows" checked={true} onChange={()=>{}} />
                        <Slider label="Light Direction" value={45} min={0} max={360} onChange={()=>{}} />
                        <Slider label="Warmth" value={50} min={0} max={100} onChange={()=>{}} />
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

// --- FEATURE 8: UPSCALING ---
const UpscalePanel = () => {
    return (
        <div className="space-y-6">
            <div>
                <label className="text-xs text-foreground-muted mb-2 block font-bold uppercase tracking-wider">Scale Factor</label>
                <div className="flex gap-2 mb-2">
                    {['2x', '4x', '8x'].map(x => <button key={x} className="flex-1 py-3 border rounded text-sm font-bold hover:bg-surface-elevated">{x}</button>)}
                </div>
                <div className="flex justify-between text-[10px] text-foreground-muted">
                    <span>In: 1024x1024</span>
                    <span>Out: 4096x4096</span>
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
                    <Slider label="Sharpening" value={30} min={0} max={100} onChange={()=>{}} />
                </div>
            </div>

            <div>
                <label className="text-xs text-foreground-muted mb-2 block font-bold uppercase tracking-wider">Color</label>
                <Toggle label="Color Enhancement" checked={true} onChange={()=>{}} />
                <Slider label="Saturation" value={0} min={-50} max={50} onChange={()=>{}} />
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

// --- FEATURE 9: IMAGE TO CAD ---
const ImageToCadPanel = () => {
    return (
        <div className="space-y-6">
            <div>
                <label className="text-xs text-foreground-muted mb-2 block font-bold uppercase tracking-wider">Output Type</label>
                <SegmentedControl value="plan" options={[{label:'Elevation', value:'elev'}, {label:'Plan', value:'plan'}, {label:'Detail', value:'detail'}]} onChange={()=>{}} />
            </div>

            <div>
                <label className="text-xs text-foreground-muted mb-2 block font-bold uppercase tracking-wider">Line Settings</label>
                <div className="space-y-3">
                    <Slider label="Sensitivity" value={50} min={0} max={100} onChange={()=>{}} />
                    <Slider label="Simplification" value={20} min={0} max={100} onChange={()=>{}} />
                    <Toggle label="Connect Gaps" checked={true} onChange={()=>{}} />
                    <div className="flex justify-between items-center text-xs"><span>Gap Tolerance</span><input className="w-12 h-6 bg-surface-sunken border border-border rounded text-center" defaultValue="5px"/></div>
                </div>
            </div>

            <div>
                <label className="text-xs text-foreground-muted mb-2 block font-bold uppercase tracking-wider">Layers</label>
                <div className="space-y-1">
                    {['Walls', 'Windows', 'Details', 'Hidden Lines'].map(l => (
                        <div key={l} className="flex justify-between items-center p-1.5 bg-surface-elevated border border-border rounded text-xs">
                            <span className="flex items-center gap-2"><div className="w-2 h-2 bg-black rounded-full"/> {l}</span>
                            <Settings size={12} className="text-foreground-muted" />
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <label className="text-xs text-foreground-muted mb-2 block font-bold uppercase tracking-wider">Scale</label>
                <div className="flex gap-2">
                    <input className="flex-1 h-8 bg-surface-sunken border border-border rounded px-2 text-xs" placeholder="1:100" />
                    <button className="px-3 border rounded hover:bg-surface-elevated"><Wrench size={12}/></button>
                </div>
            </div>

            <div>
                <label className="text-xs text-foreground-muted mb-2 block font-bold uppercase tracking-wider">Output Format</label>
                <div className="grid grid-cols-4 gap-1 mb-2">
                    {['DXF', 'DWG', 'SVG', 'PDF'].map(f => <button key={f} className="text-[10px] border rounded py-1.5 hover:bg-surface-elevated">{f}</button>)}
                </div>
                <Toggle label="Separate Layers" checked={true} onChange={()=>{}} />
                <Toggle label="Line Weights" checked={true} onChange={()=>{}} />
            </div>
        </div>
    );
};

// --- FEATURE 10: IMAGE TO 3D MODEL ---
const ImageTo3DPanel = () => {
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
                    <Toggle label="Smooth Normals" checked={false} onChange={()=>{}} />
                </div>
            </div>

            <div>
                <label className="text-xs text-foreground-muted mb-2 block font-bold uppercase tracking-wider">Textures</label>
                <select className="w-full bg-surface-elevated border border-border rounded text-xs h-8 px-2"><option>2K Resolution</option><option>4K Resolution</option></select>
            </div>

            <div>
                <label className="text-xs text-foreground-muted mb-2 block font-bold uppercase tracking-wider">Output Format</label>
                <div className="grid grid-cols-4 gap-1 mb-2">
                    {['OBJ', 'FBX', 'GLB', 'USD'].map(f => <button key={f} className="text-[10px] border rounded py-1.5 hover:bg-surface-elevated">{f}</button>)}
                </div>
                <Toggle label="Include Textures" checked={true} onChange={()=>{}} />
                <Toggle label="Include Materials" checked={true} onChange={()=>{}} />
            </div>
        </div>
    );
};

// --- FEATURE 11: AI VIDEO PRODUCTION ---
const VideoPanel = () => {
    return (
        <div className="space-y-6">
            <div>
                <label className="text-xs text-foreground-muted mb-2 block font-bold uppercase tracking-wider">Duration</label>
                <div className="flex gap-2">
                    {['5s', '10s', '30s'].map(d => <button key={d} className="flex-1 py-2 text-xs border rounded hover:bg-surface-elevated">{d}</button>)}
                </div>
            </div>

            <div>
                <label className="text-xs text-foreground-muted mb-2 block font-bold uppercase tracking-wider">Frame Rate</label>
                <div className="flex gap-2">
                    {['24', '30', '60'].map(f => <button key={f} className="flex-1 py-2 text-xs border rounded hover:bg-surface-elevated">{f}</button>)}
                </div>
            </div>

            <div>
                <label className="text-xs text-foreground-muted mb-2 block font-bold uppercase tracking-wider">Motion</label>
                <select className="w-full bg-surface-elevated border border-border rounded text-xs h-8 px-2 mb-2"><option>Cinematic Slow</option><option>Dynamic</option></select>
                <Slider label="Smoothness" value={50} min={0} max={100} onChange={()=>{}} />
            </div>

            <div>
                <label className="text-xs text-foreground-muted mb-2 block font-bold uppercase tracking-wider">Camera</label>
                <select className="w-full bg-surface-elevated border border-border rounded text-xs h-8 px-2 mb-2"><option>Orbit</option><option>Flythrough</option><option>Pan</option></select>
                <div className="p-2 border border-border rounded bg-surface-sunken text-xs text-center text-foreground-muted">[Camera Behavior Controls]</div>
            </div>

            <div>
                <label className="text-xs text-foreground-muted mb-2 block font-bold uppercase tracking-wider">Effects</label>
                <Toggle label="Motion Blur" checked={true} onChange={()=>{}} />
                <Toggle label="Depth of Field" checked={true} onChange={()=>{}} />
                <select className="w-full bg-surface-elevated border border-border rounded text-xs h-8 px-2 mt-2"><option>Neutral Grade</option><option>Film</option></select>
            </div>

            <div>
                <label className="text-xs text-foreground-muted mb-2 block font-bold uppercase tracking-wider">Audio</label>
                <Toggle label="Music" checked={false} onChange={()=>{}} />
                <select className="w-full bg-surface-elevated border border-border rounded text-xs h-8 px-2 mt-1"><option>Ambient Arch</option><option>Corporate</option></select>
            </div>

            <div>
                <label className="text-xs text-foreground-muted mb-2 block font-bold uppercase tracking-wider">Output</label>
                <div className="grid grid-cols-3 gap-1 mb-2">
                    {['HD', 'FHD', '4K'].map(r => <button key={r} className="text-[10px] border rounded py-1.5 hover:bg-surface-elevated">{r}</button>)}
                </div>
                <div className="grid grid-cols-2 gap-2 mb-2">
                    {['MP4', 'MOV'].map(f => <button key={f} className="text-[10px] border rounded py-1.5 hover:bg-surface-elevated">{f}</button>)}
                </div>
                <Slider label="Quality" value={80} min={0} max={100} onChange={()=>{}} />
                <div className="text-[10px] text-foreground-muted mt-1">Est. Size: 45MB • Time: ~2m</div>
            </div>
        </div>
    );
};

// --- Material Validation (Preserved) ---
const ValidationPanel = () => {
    return (
        <div className="space-y-6">
            <div>
                <h4 className="text-xs font-bold text-foreground-muted uppercase tracking-wider mb-3">Documents</h4>
                <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-surface-elevated border border-border rounded">
                        <span className="text-xs">Specs.pdf</span><CheckCircle2 size={12} className="text-green-500"/>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-surface-elevated border border-border rounded">
                        <span className="text-xs">BoQ.xlsx</span><CheckCircle2 size={12} className="text-green-500"/>
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

// --- GENERATE TEXT PANEL (Placeholder) ---
const GeneratePanel = () => {
    const { state } = useAppStore();
    return (
        <div className="space-y-6">
            <StyleSelector />
            <Accordion items={[
                { id: 'sets', title: 'Image Settings', content: (
                    <div className="space-y-4">
                        <SegmentedControl value="16:9" options={[{label:'16:9', value:'16:9'}, {label:'4:3', value:'4:3'}, {label:'1:1', value:'1:1'}, {label:'9:16', value:'9:16'}]} onChange={()=>{}} />
                        <select className="w-full bg-surface-elevated border border-border rounded text-xs h-8 px-2"><option>Standard</option><option>High Res</option></select>
                    </div>
                )},
            ]} defaultValue="sets" />
        </div>
    );
};

// --- MAIN RIGHT PANEL ---

export const RightPanel: React.FC = () => {
  const { state, dispatch } = useAppStore();
  const { rightPanelOpen, rightPanelWidth, mode } = state;

  if (!rightPanelOpen) {
    return (
      <div className="w-12 bg-background-tertiary border-l border-border relative flex flex-col items-center py-4 gap-4">
        <button 
          onClick={() => dispatch({ type: 'TOGGLE_RIGHT_PANEL' })}
          className="p-2 text-foreground-muted hover:text-foreground hover:bg-surface-sunken rounded-md transition-all"
          title="Expand Panel"
        >
          <ChevronsLeft size={20} />
        </button>
        <div className="flex-1 flex items-center justify-center">
            <span 
              className="text-xs font-bold text-foreground-muted uppercase tracking-widest whitespace-nowrap transform rotate-180" 
              style={{ writingMode: 'vertical-rl' }}
            >
              Settings
            </span>
        </div>
      </div>
    );
  }

  let panelContent: React.ReactNode = null;
  let panelTitle = "Settings";
  let PanelIcon = Settings;

  switch (mode) {
      case 'generate-text': panelTitle = "Image Generation"; PanelIcon = Sparkle; panelContent = <GeneratePanel />; break;
      case 'render-3d': panelTitle = "3D to Render"; PanelIcon = Box; panelContent = <Render3DPanel />; break;
      case 'render-cad': panelTitle = "CAD to Render"; PanelIcon = FileCode; panelContent = <CadToRenderPanel />; break;
      case 'masterplan': panelTitle = "Masterplan"; PanelIcon = Grid; panelContent = <MasterplanPanel />; break;
      case 'visual-edit': panelTitle = "Visual Editor"; PanelIcon = Wrench; panelContent = <VisualEditPanel />; break;
      case 'exploded': panelTitle = "Exploded View"; PanelIcon = Layers; panelContent = <ExplodedPanel />; break;
      case 'section': panelTitle = "Render to Section"; PanelIcon = FileCode; panelContent = <SectionPanel />; break; // Icon approx
      case 'render-sketch': panelTitle = "Sketch to Render"; PanelIcon = Brush; panelContent = <SketchPanel />; break;
      case 'upscale': panelTitle = "Upscaler"; PanelIcon = Maximize2; panelContent = <UpscalePanel />; break;
      case 'img-to-cad': panelTitle = "Image to CAD"; PanelIcon = FileCode; panelContent = <ImageToCadPanel />; break;
      case 'img-to-3d': panelTitle = "Image to 3D"; PanelIcon = Box; panelContent = <ImageTo3DPanel />; break;
      case 'video': panelTitle = "Video Studio"; PanelIcon = Video; panelContent = <VideoPanel />; break;
      case 'material-validation': panelTitle = "Validation"; PanelIcon = CheckCircle2; panelContent = <ValidationPanel />; break;
      default: panelTitle = "Settings"; panelContent = <div className="p-4 text-center text-xs text-foreground-muted">Select a workflow</div>;
  }

  return (
    <div 
      className={cn(
        "bg-background-tertiary border-l border-border flex flex-col overflow-hidden transition-all relative z-10",
        rightPanelWidth ? `w-[${rightPanelWidth}px]` : "w-[320px]"
      )}
    >
      <div className="shrink-0 p-5 pb-3 bg-background-tertiary border-b border-border-subtle flex justify-between items-center">
          <div className="flex items-center gap-2">
              <PanelIcon size={16} className="text-foreground-secondary"/>
              <h2 className="text-sm font-bold tracking-tight text-foreground">{panelTitle}</h2>
          </div>
          <div className="flex items-center gap-1">
            <button className="text-foreground-muted hover:text-foreground p-1"><HelpCircle size={14}/></button>
            <button 
                onClick={() => dispatch({ type: 'TOGGLE_RIGHT_PANEL' })}
                className="text-foreground-muted hover:text-foreground hover:bg-surface-sunken p-1 rounded-md transition-colors"
            >
                <ChevronsRight size={16} />
            </button>
          </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-5">
         {panelContent}
      </div>
      
      <div className="shrink-0 p-3 border-t border-border-subtle bg-surface-sunken text-[10px] text-foreground-muted">
         <div className="flex items-center gap-2 mb-1">
            <Share2 size={12} /> <span>Press <span className="font-mono bg-background border rounded px-1">Space</span> to pan</span>
         </div>
         <div className="flex items-center gap-2">
            <MonitorPlay size={12} /> <span><span className="font-mono bg-background border rounded px-1">Ctrl+Z</span> to undo</span>
         </div>
      </div>
    </div>
  );
};
