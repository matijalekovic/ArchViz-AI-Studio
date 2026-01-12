
import React, { useState } from 'react';
import { useAppStore } from '../../../store';
import { Slider } from '../../ui/Slider';
import { Toggle } from '../../ui/Toggle';
import { SegmentedControl } from '../../ui/SegmentedControl';
import { Accordion } from '../../ui/Accordion';
import { cn } from '../../../lib/utils';
import { 
  Box, Camera, Sun, Palette, Users, Shield, Sparkles, SlidersHorizontal, Target, Lightbulb,
  Eye, EyeOff, Video, Zap, Clock, RotateCcw, Move, ArrowUp, Circle, Maximize,
  Wrench, MousePointer, Image as ImageIcon, ClipboardCheck, Compass, Aperture, Cloud, Droplets, User, TreePine, Car, Armchair,
  Move3d, Focus, MousePointer2, Layers, Grid, Sparkle, Brush, Type, Crop, Expand, Trash2, MoveLeft, MoveRight,
  ChevronsLeft, ChevronsRight, FileCode, Printer, BoxSelect, Upload, RefreshCw, Wand2, Paintbrush, Home, Search, Download, FileText, FileSpreadsheet,
  CheckCircle2, AlertTriangle, XCircle, Play, MoreHorizontal, ChevronDown, LayoutList, Ruler, Grip, Music, Mic, Film,
  Scissors, MonitorPlay, Share2, HelpCircle, Settings, RotateCw, MapPin, Minimize2, Maximize2, Eraser, ArrowRight
} from 'lucide-react';
import { BUILT_IN_STYLES } from '../../../engine/promptEngine';

// --- Shared Helper Components ---

const ColorPicker = ({ color, onChange, className }: { color?: string, onChange?: (c: string) => void, className?: string }) => (
  <div className={cn("w-6 h-6 rounded border border-border cursor-pointer shadow-sm relative overflow-hidden", className)}>
    <input 
        type="color" 
        value={color || '#ffffff'} 
        onChange={(e) => onChange && onChange(e.target.value)}
        className="absolute -top-2 -left-2 w-10 h-10 p-0 border-0 opacity-0 cursor-pointer"
    />
    <div className="w-full h-full" style={{ backgroundColor: color || '#ffffff' }} />
  </div>
);

const NumberInput = ({ value, onChange, min, max, step, className, label }: any) => (
    <div className={cn("flex items-center gap-2", className)}>
        {label && <span className="text-[10px] text-foreground-muted">{label}</span>}
        <input 
            type="number" 
            value={value} 
            min={min} 
            max={max} 
            step={step}
            onChange={(e) => onChange(parseFloat(e.target.value))}
            className="w-14 h-6 text-[10px] bg-surface-sunken border border-border rounded px-1 focus:border-accent outline-none text-right"
        />
    </div>
);

const ActionButton = ({ icon: Icon, label, primary = false, onClick }: any) => (
    <button 
        onClick={onClick}
        className={cn(
            "w-full py-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95",
            primary 
                ? "bg-foreground text-background hover:bg-foreground/90" 
                : "bg-surface-elevated border border-border text-foreground hover:bg-surface-sunken"
        )}
    >
        {Icon && <Icon size={14} />}
        {label}
    </button>
);

// --- TAB 1: GENERATE (Text to Image) ---
const GeneratePanel = () => {
    const { state, dispatch } = useAppStore();
    const wf = state.workflow;
    const updateWf = (p: any) => dispatch({ type: 'UPDATE_WORKFLOW', payload: p });

    return (
        <div className="space-y-6">
            <div className="space-y-3">
                <textarea 
                    className="w-full h-32 bg-surface-sunken border border-border rounded-lg p-3 text-xs focus:border-accent outline-none resize-none custom-scrollbar"
                    placeholder="Describe your architectural vision..."
                    value={wf.textPrompt}
                    onChange={(e) => updateWf({ textPrompt: e.target.value })}
                />
                <div className="flex gap-2">
                    {['Interior', 'Exterior', 'Aerial'].map(t => (
                        <button key={t} className="flex-1 py-1.5 text-[10px] border border-border rounded hover:bg-surface-elevated transition-colors">{t}</button>
                    ))}
                </div>
            </div>

            <Accordion items={[
                { id: 'ref', title: 'Reference Image', content: (
                    <div className="space-y-3">
                        <div className="border-2 border-dashed border-border rounded-lg p-6 flex flex-col items-center justify-center gap-2 text-foreground-muted hover:bg-surface-sunken cursor-pointer transition-colors">
                            <Upload size={20} />
                            <span className="text-xs">Upload Reference</span>
                        </div>
                        <Slider label="Strength" value={50} min={0} max={100} onChange={()=>{}} />
                    </div>
                )},
                { id: 'settings', title: 'Image Settings', content: (
                    <div className="space-y-4">
                        <div>
                            <label className="text-xs text-foreground-muted mb-2 block">Aspect Ratio</label>
                            <SegmentedControl value="16:9" options={[{label:'16:9', value:'16:9'}, {label:'4:3', value:'4:3'}, {label:'1:1', value:'1:1'}, {label:'9:16', value:'9:16'}]} onChange={()=>{}} />
                        </div>
                        <div>
                            <label className="text-xs text-foreground-muted mb-2 block">Resolution</label>
                            <select className="w-full h-8 bg-surface-elevated border border-border rounded text-xs px-2"><option>Standard (1024)</option><option>High (2048)</option></select>
                        </div>
                    </div>
                )},
                { id: 'style', title: 'Style', content: (
                    <div className="space-y-4">
                        <select className="w-full h-8 bg-surface-elevated border border-border rounded text-xs px-2" value={state.activeStyleId} onChange={(e) => dispatch({ type: 'SET_STYLE', payload: e.target.value })}>
                            {BUILT_IN_STYLES.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                        </select>
                        <Slider label="Style Strength" value={80} min={0} max={100} onChange={()=>{}} />
                    </div>
                )}
            ]} defaultValue="ref" />

            <div className="pt-4 border-t border-border-subtle">
                <ActionButton icon={Sparkles} label="Generate Render" primary onClick={() => dispatch({type: 'SET_GENERATING', payload: true})} />
            </div>
        </div>
    );
};

// --- TAB 2: 3D TO RENDER ---
const Render3DPanel = () => {
    const { state, dispatch } = useAppStore();
    const updateGeo = (p: any) => dispatch({ type: 'UPDATE_GEOMETRY', payload: p });
    const updateCam = (p: any) => dispatch({ type: 'UPDATE_CAMERA', payload: p });
    const updateLight = (p: any) => dispatch({ type: 'UPDATE_LIGHTING', payload: p });

    return (
        <div className="space-y-6">
            <Accordion items={[
                { id: 'model', title: 'Model Settings', content: (
                    <div className="space-y-3">
                        <div className="flex items-center justify-between p-2 bg-surface-elevated border border-border rounded">
                            <span className="text-xs truncate max-w-[120px]">project_model.obj</span>
                            <span className="text-[10px] text-foreground-muted">24MB</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                            <NumberInput label="Pos X" value={0} onChange={()=>{}} />
                            <NumberInput label="Pos Y" value={0} onChange={()=>{}} />
                            <NumberInput label="Pos Z" value={0} onChange={()=>{}} />
                        </div>
                        <div className="flex gap-2 pt-2">
                            <Toggle label="Wireframe" checked={false} onChange={()=>{}} />
                            <Toggle label="Ground" checked={true} onChange={()=>{}} />
                        </div>
                    </div>
                )},
                { id: 'camera', title: 'Camera', content: (
                    <div className="space-y-4">
                        <select className="w-full h-8 bg-surface-elevated border border-border rounded text-xs px-2">
                            <option>Perspective</option><option>Top View</option><option>Front View</option>
                        </select>
                        <Slider label="FOV" value={state.camera.fov} min={15} max={120} onChange={(v) => updateCam({ fov: v })} />
                        <Slider label="Height" value={state.camera.cameraHeight} min={0} max={50} onChange={(v) => updateCam({ cameraHeight: v })} />
                        <Toggle label="Vertical Correction" checked={state.camera.verticalCorrection} onChange={(v) => updateCam({ verticalCorrection: v })} />
                    </div>
                )},
                { id: 'lighting', title: 'Lighting', content: (
                    <div className="space-y-4">
                        <Slider label="Sun Azimuth" value={state.lighting.sunAzimuth} min={0} max={360} onChange={(v) => updateLight({ sunAzimuth: v })} />
                        <Slider label="Sun Altitude" value={state.lighting.sunAltitude} min={0} max={90} onChange={(v) => updateLight({ sunAltitude: v })} />
                        <div className="flex items-center justify-between">
                            <span className="text-xs">HDRI Environment</span>
                            <Toggle label="" checked={true} onChange={()=>{}} />
                        </div>
                    </div>
                )},
                { id: 'materials', title: 'Materials', content: (
                    <div className="space-y-3">
                        <SegmentedControl value="none" options={[{label:'Original', value:'none'}, {label:'Clay', value:'clay'}, {label:'White', value:'white'}]} onChange={()=>{}} />
                        <button className="w-full py-2 border border-dashed border-border rounded text-xs text-foreground-muted hover:text-foreground">
                            + AI Material Replacement
                        </button>
                    </div>
                )},
                { id: 'render', title: 'Render Settings', content: (
                    <div className="space-y-4">
                        <select className="w-full h-8 bg-surface-elevated border border-border rounded text-xs px-2">
                            <option>Production (High)</option><option>Draft (Fast)</option>
                        </select>
                        <div className="grid grid-cols-2 gap-2">
                            <Toggle label="Denoise" checked={true} onChange={()=>{}} />
                            <Toggle label="Motion Blur" checked={false} onChange={()=>{}} />
                        </div>
                    </div>
                )}
            ]} defaultValue="model" />

            <div className="pt-4 border-t border-border-subtle grid grid-cols-2 gap-2">
                <ActionButton icon={Eye} label="Preview" onClick={()=>{}} />
                <ActionButton icon={Sparkles} label="Render" primary onClick={()=>{}} />
            </div>
        </div>
    );
};

// --- TAB 3: CAD TO RENDER ---
const RenderCADPanel = () => {
    return (
        <div className="space-y-6">
            <Accordion items={[
                { id: 'import', title: 'CAD Import', content: (
                    <div className="space-y-3">
                        <div className="flex items-center justify-between text-xs text-foreground-muted">
                            <span>Layers: 12</span><span>Entities: 450</span>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs">Unit Scale</label>
                            <SegmentedControl value="m" options={[{label:'m', value:'m'}, {label:'cm', value:'cm'}, {label:'mm', value:'mm'}, {label:'ft', value:'ft'}]} onChange={()=>{}} />
                        </div>
                        <Toggle label="Merge Layers" checked={true} onChange={()=>{}} />
                    </div>
                )},
                { id: 'layers', title: 'Layer Mapping', content: (
                    <div className="space-y-2 max-h-40 overflow-y-auto custom-scrollbar">
                        {['Walls', 'Windows', 'Doors', 'Furniture', 'Dims'].map(l => (
                            <div key={l} className="flex items-center gap-2 text-xs">
                                <input type="checkbox" defaultChecked />
                                <span className="flex-1">{l}</span>
                                <div className="w-3 h-3 rounded-full bg-foreground" />
                            </div>
                        ))}
                    </div>
                )},
                { id: '3d', title: '3D Generation', content: (
                    <div className="space-y-3">
                        <NumberInput label="Wall Height (m)" value={3.0} onChange={()=>{}} className="w-full justify-between" />
                        <NumberInput label="Sill Height (m)" value={0.9} onChange={()=>{}} className="w-full justify-between" />
                        <Toggle label="Gen. Furniture" checked={true} onChange={()=>{}} />
                        <Toggle label="Gen. Ceilings" checked={true} onChange={()=>{}} />
                    </div>
                )}
            ]} defaultValue="import" />
            
            <div className="pt-4 border-t border-border-subtle">
                <ActionButton icon={Box} label="Generate 3D" primary onClick={()=>{}} />
            </div>
        </div>
    );
};

// --- TAB 4: MASTERPLANS ---
const MasterplanPanel = () => {
    return (
        <div className="space-y-6">
            <Accordion items={[
                { id: 'buildings', title: 'Building Generation', content: (
                    <div className="space-y-3">
                        <div className="flex gap-2">
                            <button className="flex-1 py-1.5 text-[10px] border border-border rounded bg-surface-elevated">Auto-Detect</button>
                            <button className="flex-1 py-1.5 text-[10px] border border-border rounded bg-surface-elevated">Manual</button>
                        </div>
                        <Slider label="Height Var." value={30} min={0} max={100} onChange={()=>{}} />
                        <select className="w-full h-8 bg-surface-elevated border border-border rounded text-xs px-2"><option>Mixed Use</option><option>Residential</option></select>
                    </div>
                )},
                { id: 'infra', title: 'Infrastructure', content: (
                    <div className="space-y-2">
                        <Toggle label="Roads" checked={true} onChange={()=>{}} />
                        <Toggle label="Sidewalks" checked={true} onChange={()=>{}} />
                        <Toggle label="Street Lights" checked={false} onChange={()=>{}} />
                        <Toggle label="Cars" checked={true} onChange={()=>{}} />
                    </div>
                )},
                { id: 'landscape', title: 'Landscape', content: (
                    <div className="space-y-3">
                        <Slider label="Tree Density" value={60} min={0} max={100} onChange={()=>{}} />
                        <Toggle label="Green Spaces" checked={true} onChange={()=>{}} />
                        <Toggle label="Water Bodies" checked={false} onChange={()=>{}} />
                    </div>
                )},
                { id: 'render', title: 'Diagram Style', content: (
                    <div className="space-y-3">
                        <SegmentedControl value="photo" options={[{label:'Photo', value:'photo'}, {label:'Diagram', value:'diagram'}, {label:'Hybrid', value:'hybrid'}]} onChange={()=>{}} />
                        <Toggle label="Labels" checked={true} onChange={()=>{}} />
                        <Toggle label="Legend" checked={true} onChange={()=>{}} />
                    </div>
                )}
            ]} defaultValue="buildings" />

            <div className="pt-4 border-t border-border-subtle">
                <ActionButton icon={Map} label="Render Masterplan" primary onClick={()=>{}} />
            </div>
        </div>
    );
};

// --- TAB 5: VISUAL EDITOR (Complex) ---
const VisualEditorPanel = () => {
    const { state, dispatch } = useAppStore();
    const tool = state.workflow.activeTool;
    const updateWf = (p: any) => dispatch({ type: 'UPDATE_WORKFLOW', payload: p });

    // Sub-panels logic
    const renderToolPanel = () => {
        switch(tool) {
            case 'select': return (
                <div className="space-y-4">
                    <SegmentedControl value={state.workflow.visualSelection.mode} options={[{label:'Box', value:'rect'}, {label:'Brush', value:'brush'}, {label:'Poly', value:'polygon'}, {label:'AI', value:'ai'}]} onChange={(v) => updateWf({visualSelection: {...state.workflow.visualSelection, mode: v}})} />
                    {state.workflow.visualSelection.mode === 'brush' && (
                        <Slider label="Brush Size" value={state.workflow.visualSelection.brushSize} min={1} max={500} onChange={(v) => updateWf({visualSelection: {...state.workflow.visualSelection, brushSize: v}})} />
                    )}
                    <div className="grid grid-cols-2 gap-2">
                        <ActionButton label="Select All" onClick={()=>{}} />
                        <ActionButton label="Invert" onClick={()=>{}} />
                    </div>
                </div>
            );
            case 'material': return (
                <div className="space-y-4">
                    <div className="p-2 border border-border rounded bg-surface-sunken text-xs text-center text-foreground-muted">Select an area to replace material</div>
                    <div className="grid grid-cols-3 gap-2">
                        {[1,2,3,4,5,6].map(i => <div key={i} className="aspect-square bg-surface-elevated border border-border rounded hover:border-accent cursor-pointer"/>)}
                    </div>
                    <Slider label="Scale" value={100} min={1} max={500} onChange={()=>{}} />
                    <Slider label="Roughness" value={50} min={0} max={100} onChange={()=>{}} />
                    <ActionButton icon={Wand2} label="Generate Material" primary onClick={()=>{}} />
                </div>
            );
            case 'lighting': return (
                <div className="space-y-4">
                    <Toggle label="Global Mode" checked={true} onChange={()=>{}} />
                    <Slider label="Time of Day" value={14} min={0} max={24} onChange={()=>{}} />
                    <Slider label="Intensity" value={50} min={0} max={100} onChange={()=>{}} />
                    <Slider label="Temperature" value={6500} min={2000} max={10000} onChange={()=>{}} />
                    <ActionButton icon={Sun} label="Apply Lighting" primary onClick={()=>{}} />
                </div>
            );
            case 'object': return (
                <div className="space-y-4">
                    <SegmentedControl value="add" options={[{label:'Add', value:'add'}, {label:'Replace', value:'replace'}]} onChange={()=>{}} />
                    <input type="text" placeholder="Search objects..." className="w-full h-8 px-2 text-xs bg-surface-elevated border border-border rounded" />
                    <div className="grid grid-cols-2 gap-2">
                        <button className="py-2 border rounded hover:bg-surface-elevated text-xs">Furniture</button>
                        <button className="py-2 border rounded hover:bg-surface-elevated text-xs">Plants</button>
                    </div>
                    <Slider label="Scale" value={100} min={10} max={500} onChange={()=>{}} />
                    <Toggle label="Cast Shadow" checked={true} onChange={()=>{}} />
                </div>
            );
            case 'remove': return (
                <div className="space-y-4">
                    <SegmentedControl value="brush" options={[{label:'Brush', value:'brush'}, {label:'Area', value:'rect'}]} onChange={()=>{}} />
                    <Slider label="Brush Size" value={50} min={10} max={200} onChange={()=>{}} />
                    <div className="space-y-2">
                        <p className="text-xs font-bold text-foreground-muted">Quick Remove</p>
                        <div className="grid grid-cols-2 gap-2">
                            <button className="py-1.5 border rounded text-[10px] hover:bg-surface-elevated">People</button>
                            <button className="py-1.5 border rounded text-[10px] hover:bg-surface-elevated">Vehicles</button>
                        </div>
                    </div>
                    <ActionButton icon={Eraser} label="Remove Selected" primary onClick={()=>{}} />
                </div>
            );
            default: return <div className="text-center text-xs text-foreground-muted py-4">Select a tool from the sidebar</div>;
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2 pb-4 border-b border-border-subtle">
                <Wrench size={16} className="text-accent" />
                <span className="text-sm font-bold capitalize">{tool || 'Tool'} Properties</span>
            </div>
            {renderToolPanel()}
        </div>
    );
};

// --- TAB 6: MATERIAL VALIDATION ---
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
                    <ActionButton icon={Upload} label="Add Document" onClick={()=>{}} />
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
                <ActionButton icon={Play} label="Run Validation" primary onClick={()=>{}} />
                <div className="mt-2"><ActionButton icon={FileText} label="Export Report" onClick={()=>{}} /></div>
            </div>
        </div>
    );
};

// --- TAB 7: EXPLODED VIEWS ---
const ExplodedPanel = () => {
    return (
        <div className="space-y-6">
            <Accordion items={[
                { id: 'comps', title: 'Components', content: (
                    <div className="space-y-2">
                        {['Roof', 'Structure', 'Facade', 'Floors'].map(c => (
                            <div key={c} className="flex items-center justify-between p-2 bg-surface-elevated border border-border rounded text-xs">
                                <span>{c}</span><Grip size={12} className="text-foreground-muted cursor-grab" />
                            </div>
                        ))}
                    </div>
                )},
                { id: 'settings', title: 'Explosion', content: (
                    <div className="space-y-4">
                        <SegmentedControl value="y" options={[{label:'Y-Axis', value:'y'}, {label:'Radial', value:'radial'}, {label:'Custom', value:'custom'}]} onChange={()=>{}} />
                        <Slider label="Separation" value={50} min={0} max={200} onChange={()=>{}} />
                        <Toggle label="Connectors" checked={true} onChange={()=>{}} />
                    </div>
                )},
                { id: 'style', title: 'Visual Style', content: (
                    <div className="space-y-3">
                        <SegmentedControl value="iso" options={[{label:'Iso', value:'iso'}, {label:'Persp', value:'persp'}]} onChange={()=>{}} />
                        <Toggle label="Shadows" checked={true} onChange={()=>{}} />
                        <Toggle label="Labels" checked={true} onChange={()=>{}} />
                    </div>
                )}
            ]} defaultValue="settings" />
            <div className="pt-4 border-t border-border-subtle grid grid-cols-2 gap-2">
                <ActionButton icon={Film} label="Animate" onClick={()=>{}} />
                <ActionButton icon={Download} label="Export" primary onClick={()=>{}} />
            </div>
        </div>
    );
};

// --- TAB 8: RENDER TO SECTION ---
const SectionPanel = () => {
    return (
        <div className="space-y-6">
            <Accordion items={[
                { id: 'cut', title: 'Section Cut', content: (
                    <div className="space-y-4">
                        <SegmentedControl value="vert" options={[{label:'Vertical', value:'vert'}, {label:'Horizontal', value:'horiz'}]} onChange={()=>{}} />
                        <Slider label="Position" value={50} min={0} max={100} onChange={()=>{}} />
                        <Slider label="Depth" value={20} min={0} max={100} onChange={()=>{}} />
                    </div>
                )},
                { id: 'style', title: 'Line Style', content: (
                    <div className="space-y-4">
                        <Slider label="Cut Weight" value={3} min={1} max={10} onChange={()=>{}} />
                        <div className="space-y-2">
                            <label className="text-xs text-foreground-muted">Poche Style</label>
                            <div className="grid grid-cols-3 gap-2">
                                <button className="h-8 bg-black rounded border border-border"/>
                                <button className="h-8 bg-gray-400 rounded border border-border"/>
                                <button className="h-8 bg-[url('https://www.transparenttextures.com/patterns/diagonal-stripes.png')] bg-gray-200 rounded border border-border"/>
                            </div>
                        </div>
                    </div>
                )},
                { id: 'annot', title: 'Annotations', content: (
                    <div className="space-y-2">
                        <Toggle label="Dimensions" checked={true} onChange={()=>{}} />
                        <Toggle label="Levels" checked={true} onChange={()=>{}} />
                        <Toggle label="Room Names" checked={false} onChange={()=>{}} />
                    </div>
                )}
            ]} defaultValue="cut" />
            <div className="pt-4 border-t border-border-subtle">
                <ActionButton icon={FileCode} label="Export DWG/PDF" primary onClick={()=>{}} />
            </div>
        </div>
    );
};

// --- TAB 9: SKETCH TO RENDER ---
const SketchPanel = () => {
    return (
        <div className="space-y-6">
            <Accordion items={[
                { id: 'input', title: 'Sketch Processing', content: (
                    <div className="space-y-4">
                        <SegmentedControl value="persp" options={[{label:'Perspective', value:'persp'}, {label:'Plan', value:'plan'}, {label:'Section', value:'section'}]} onChange={()=>{}} />
                        <Toggle label="Cleanup Lines" checked={true} onChange={()=>{}} />
                        <Slider label="Fidelity" value={70} min={0} max={100} onChange={()=>{}} />
                    </div>
                )},
                { id: 'interp', title: 'Interpretation', content: (
                    <div className="space-y-3">
                        <select className="w-full h-8 bg-surface-elevated border border-border rounded text-xs px-2"><option>Modern Residential</option><option>Office Building</option></select>
                        <textarea className="w-full h-20 bg-surface-sunken border border-border rounded p-2 text-xs resize-none" placeholder="Additional prompt context..." />
                    </div>
                )},
                { id: 'style', title: 'Render Style', content: (
                    <div className="space-y-4">
                        <Toggle label="Preserve Lines" checked={true} onChange={()=>{}} />
                        <Slider label="Photorealism" value={80} min={0} max={100} onChange={()=>{}} />
                    </div>
                )}
            ]} defaultValue="input" />
            <div className="pt-4 border-t border-border-subtle">
                <ActionButton icon={Sparkles} label="Generate Render" primary onClick={()=>{}} />
            </div>
        </div>
    );
};

// --- TAB 10: IMAGE UPSCALER ---
const UpscalePanel = () => {
    return (
        <div className="space-y-6">
            <div className="p-3 bg-surface-elevated border border-border rounded flex items-center justify-between">
                <div className="text-xs">
                    <div className="font-bold text-foreground">Source</div>
                    <div className="text-foreground-muted">1024 x 1024</div>
                </div>
                <ArrowRight size={14} className="text-foreground-muted" />
                <div className="text-xs text-right">
                    <div className="font-bold text-accent">4x Upscale</div>
                    <div className="text-foreground-muted">4096 x 4096</div>
                </div>
            </div>

            <Accordion items={[
                { id: 'settings', title: 'Upscale Settings', content: (
                    <div className="space-y-4">
                        <SegmentedControl value="4x" options={[{label:'2x', value:'2x'}, {label:'4x', value:'4x'}, {label:'8x', value:'8x'}]} onChange={()=>{}} />
                        <div className="space-y-2">
                            <label className="text-xs text-foreground-muted">Model</label>
                            <select className="w-full h-8 bg-surface-elevated border border-border rounded text-xs px-2"><option>Architecture Optimized</option><option>Standard</option></select>
                        </div>
                    </div>
                )},
                { id: 'enhance', title: 'Enhancement', content: (
                    <div className="space-y-4">
                        <Slider label="Denoise" value={50} min={0} max={100} onChange={()=>{}} />
                        <Slider label="Sharpen" value={30} min={0} max={100} onChange={()=>{}} />
                        <Slider label="Face Fix" value={0} min={0} max={100} onChange={()=>{}} />
                        <Toggle label="Fix Artifacts" checked={true} onChange={()=>{}} />
                    </div>
                )}
            ]} defaultValue="settings" />
            
            <div className="pt-4 border-t border-border-subtle">
                <ActionButton icon={Maximize} label="Upscale Now" primary onClick={()=>{}} />
            </div>
        </div>
    );
};

// --- TAB 11: IMAGE TO CAD ---
const ImageToCadPanel = () => {
    return (
        <div className="space-y-6">
            <Accordion items={[
                { id: 'detect', title: 'Detection', content: (
                    <div className="space-y-4">
                        <SegmentedControl value="plan" options={[{label:'Plan', value:'plan'}, {label:'Section', value:'sect'}, {label:'Elevation', value:'elev'}]} onChange={()=>{}} />
                        <div className="grid grid-cols-2 gap-2">
                            <Toggle label="Walls" checked={true} onChange={()=>{}} />
                            <Toggle label="Windows" checked={true} onChange={()=>{}} />
                            <Toggle label="Doors" checked={true} onChange={()=>{}} />
                            <Toggle label="Furniture" checked={false} onChange={()=>{}} />
                        </div>
                    </div>
                )},
                { id: 'lines', title: 'Line Work', content: (
                    <div className="space-y-4">
                        <Slider label="Simplification" value={20} min={0} max={100} onChange={()=>{}} />
                        <Slider label="Corner Snap" value={80} min={0} max={100} onChange={()=>{}} />
                        <Toggle label="Layering" checked={true} onChange={()=>{}} />
                    </div>
                )},
                { id: 'scale', title: 'Scale & Grid', content: (
                    <div className="space-y-3">
                        <button className="w-full py-2 bg-surface-elevated border border-border rounded text-xs flex items-center justify-center gap-2"><Ruler size={14} /> Set Reference Scale</button>
                        <Toggle label="Show Grid" checked={true} onChange={()=>{}} />
                    </div>
                )}
            ]} defaultValue="detect" />
            
            <div className="pt-4 border-t border-border-subtle">
                <ActionButton icon={FileCode} label="Export CAD" primary onClick={()=>{}} />
            </div>
        </div>
    );
};

// --- TAB 12: IMAGE TO 3D ---
const ImageTo3DPanel = () => {
    return (
        <div className="space-y-6">
            <Accordion items={[
                { id: 'input', title: 'Input Mode', content: (
                    <div className="space-y-3">
                        <SegmentedControl value="single" options={[{label:'Single Image', value:'single'}, {label:'Multi-View', value:'multi'}]} onChange={()=>{}} />
                        <div className="grid grid-cols-2 gap-2">
                            <div className="aspect-square bg-surface-elevated border border-border rounded flex items-center justify-center text-xs text-foreground-muted">Front</div>
                            <div className="aspect-square bg-surface-sunken border border-border rounded flex items-center justify-center text-xs text-foreground-muted opacity-50">+ Side</div>
                        </div>
                    </div>
                )},
                { id: 'process', title: 'Generation', content: (
                    <div className="space-y-4">
                        <select className="w-full h-8 bg-surface-elevated border border-border rounded text-xs px-2"><option>Building Exterior</option><option>Interior Room</option></select>
                        <Slider label="Mesh Detail" value={70} min={0} max={100} onChange={()=>{}} />
                        <Toggle label="Generate PBR Maps" checked={true} onChange={()=>{}} />
                    </div>
                )}
            ]} defaultValue="input" />
            <div className="pt-4 border-t border-border-subtle">
                <ActionButton icon={Box} label="Generate Model" primary onClick={()=>{}} />
            </div>
        </div>
    );
};

// --- TAB 13: VIDEO STUDIO ---
const VideoPanel = () => {
    return (
        <div className="space-y-6">
            <Accordion items={[
                { id: 'project', title: 'Project Settings', content: (
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-2">
                            <div className="space-y-1"><label className="text-[10px] text-foreground-muted">Res</label><select className="w-full h-7 bg-surface-elevated border border-border rounded text-xs"><option>1080p</option><option>4K</option></select></div>
                            <div className="space-y-1"><label className="text-[10px] text-foreground-muted">FPS</label><select className="w-full h-7 bg-surface-elevated border border-border rounded text-xs"><option>30</option><option>60</option></select></div>
                        </div>
                        <NumberInput label="Duration (s)" value={10} onChange={()=>{}} className="w-full justify-between" />
                    </div>
                )},
                { id: 'camera', title: 'Camera Animation', content: (
                    <div className="space-y-4">
                        <SegmentedControl value="orbit" options={[{label:'Orbit', value:'orbit'}, {label:'Fly', value:'fly'}, {label:'Path', value:'path'}]} onChange={()=>{}} />
                        <Slider label="Speed" value={50} min={0} max={100} onChange={()=>{}} />
                        <Toggle label="Motion Blur" checked={true} onChange={()=>{}} />
                        <Toggle label="Ease In/Out" checked={true} onChange={()=>{}} />
                    </div>
                )},
                { id: 'effects', title: 'Effects', content: (
                    <div className="space-y-2">
                        <Toggle label="Color Grade" checked={true} onChange={()=>{}} />
                        <Toggle label="Vignette" checked={false} onChange={()=>{}} />
                        <Toggle label="Film Grain" checked={false} onChange={()=>{}} />
                    </div>
                )},
                { id: 'audio', title: 'Audio', content: (
                    <div className="space-y-3">
                        <button className="w-full py-2 bg-surface-elevated border border-border rounded text-xs flex items-center justify-center gap-2"><Music size={14}/> Add Background Music</button>
                        <button className="w-full py-2 bg-surface-elevated border border-border rounded text-xs flex items-center justify-center gap-2"><Mic size={14}/> Record Voiceover</button>
                    </div>
                )}
            ]} defaultValue="camera" />
            <div className="pt-4 border-t border-border-subtle">
                <ActionButton icon={Film} label="Render Video" primary onClick={()=>{}} />
            </div>
        </div>
    );
};

// --- Main Router Component ---

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
      case 'generate-text': panelTitle = "Image Generation"; PanelIcon = Sparkles; panelContent = <GeneratePanel />; break;
      case 'render-3d': panelTitle = "3D to Render"; PanelIcon = Box; panelContent = <Render3DPanel />; break;
      case 'render-cad': panelTitle = "CAD to Render"; PanelIcon = FileCode; panelContent = <RenderCADPanel />; break;
      case 'masterplan': panelTitle = "Masterplan"; PanelIcon = MapPin; panelContent = <MasterplanPanel />; break;
      case 'visual-edit': panelTitle = "Visual Editor"; PanelIcon = Wrench; panelContent = <VisualEditorPanel />; break;
      case 'material-validation': panelTitle = "Validation"; PanelIcon = ClipboardCheck; panelContent = <ValidationPanel />; break;
      case 'exploded': panelTitle = "Exploded View"; PanelIcon = Layers; panelContent = <ExplodedPanel />; break;
      case 'section': panelTitle = "Render to Section"; PanelIcon = Scissors; panelContent = <SectionPanel />; break;
      case 'render-sketch': panelTitle = "Sketch to Render"; PanelIcon = Brush; panelContent = <SketchPanel />; break;
      case 'upscale': panelTitle = "Upscaler"; PanelIcon = Maximize2; panelContent = <UpscalePanel />; break;
      case 'img-to-cad': panelTitle = "Image to CAD"; PanelIcon = FileCode; panelContent = <ImageToCadPanel />; break;
      case 'img-to-3d': panelTitle = "Image to 3D"; PanelIcon = Box; panelContent = <ImageTo3DPanel />; break;
      case 'video': panelTitle = "Video Studio"; PanelIcon = Video; panelContent = <VideoPanel />; break;
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
      
      {/* Footer / Context Tips */}
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
