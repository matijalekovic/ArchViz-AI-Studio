
import React, { useState } from 'react';
import { useAppStore } from '../../../store';
import { Toggle } from '../../ui/Toggle';
import { SegmentedControl } from '../../ui/SegmentedControl';
import { Accordion } from '../../ui/Accordion';
import { 
  Lock, Sun, Box, Plane, ArrowRight, Grid, User, Droplets, Wind, Sparkle, 
  Camera, Globe, Film, Car, Trees, Eye
} from 'lucide-react';
import { SectionDesc, SliderControl, VerticalCard, SunPositionWidget } from './SharedRightComponents';
import { cn } from '../../../lib/utils';

export const Render3DPanel = () => {
    const { state, dispatch } = useAppStore();
    const wf = state.workflow;
    const updateWf = (p: any) => dispatch({ type: 'UPDATE_WORKFLOW', payload: p });

    const [settings, setSettings] = useState({
      geometry: {
        edgeMode: 'medium', 
        strictPreservation: true,
        geometryFreedom: 50,
      },
      lighting: {
        sun: { enabled: true, azimuth: 135, elevation: 45, intensity: 80, colorTemp: 5500, softness: 35 },
        shadows: { enabled: true, intensity: 75, softness: 40, color: '#1a237e' },
        ambient: { intensity: 40, occlusion: 50 },
        preset: 'custom'
      },
      camera: {
        preset: 'eye-level',
        lens: 35, 
        fov: 63,
        autoCorrect: true,
        dof: { enabled: false, aperture: 2.8, focusDist: 5 }
      },
      materials: {
        category: 'Concrete',
        reflectivity: 50,
        roughness: 50,
        weathering: { enabled: false, intensity: 30 }
      },
      atmosphere: {
        mood: 'natural',
        fog: { enabled: false, density: 20 },
        bloom: { enabled: true, intensity: 30 },
        temp: 0
      },
      scenery: {
        people: { enabled: false, count: 20 },
        trees: { enabled: true, count: 50 },
        cars: { enabled: false, count: 10 },
        preset: 'residential'
      },
      render: {
        resolution: '1080p',
        format: 'png',
        quality: 'production'
      }
    });

    const updateSection = (section: keyof typeof settings, updates: any) => {
      setSettings(prev => ({ ...prev, [section]: { ...prev[section], ...updates } }));
    };

    return (
        <div className="space-y-6">
            {/* Generation Mode */}
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
                            onClick={() => updateWf({ renderMode: m.id as any })} 
                        />
                    ))}
                </div>
            </div>

            <Accordion items={[
                // 1. GEOMETRY
                { id: 'geometry', title: 'Geometry', content: (
                    <div>
                       <SectionDesc>Preserve architectural precision and structure.</SectionDesc>
                       
                       <div className="mb-4">
                          <label className="text-xs font-medium text-foreground mb-1.5 block">Edge Mode</label>
                          <SegmentedControl 
                             value={settings.geometry.edgeMode}
                             options={[
                                {label: 'Soft', value: 'soft'}, 
                                {label: 'Medium', value: 'medium'}, 
                                {label: 'Sharp', value: 'sharp'}
                             ]}
                             onChange={(v) => updateSection('geometry', { edgeMode: v })}
                          />
                       </div>

                       <div className="pt-3 border-t border-border-subtle mt-3">
                          <div className="flex items-center justify-between mb-2">
                             <span className="text-xs font-bold text-foreground-secondary flex items-center gap-1.5"><Lock size={12}/> Preservation</span>
                          </div>
                          
                          <div className="space-y-4">
                             <Toggle 
                                label="Strict Geometry Preservation" 
                                checked={settings.geometry.strictPreservation} 
                                onChange={(v) => updateSection('geometry', { strictPreservation: v })} 
                             />
                             
                             {!settings.geometry.strictPreservation && (
                                <div className="animate-fade-in pl-2 border-l-2 border-border-subtle">
                                   <SliderControl 
                                      label="Geometry Alteration" 
                                      value={settings.geometry.geometryFreedom} 
                                      min={0} 
                                      max={100} 
                                      step={1} 
                                      unit="%" 
                                      onChange={(v) => updateSection('geometry', { geometryFreedom: v })} 
                                   />
                                   <p className="text-[9px] text-foreground-muted mt-1 leading-normal">
                                      Higher values allow the model to deviate from the original geometry.
                                   </p>
                                </div>
                             )}
                          </div>
                       </div>
                    </div>
                )},

                // 2. LIGHTING
                { id: 'lighting', title: 'Lighting', content: (
                    <div>
                       <SectionDesc>Natural and artificial illumination control.</SectionDesc>
                       
                       <div className="flex justify-between items-center mb-2">
                          <span className="text-xs font-bold flex items-center gap-1.5"><Sun size={12} className="text-accent"/> Sun Position</span>
                          <Toggle label="" checked={settings.lighting.sun.enabled} onChange={(v) => updateSection('lighting', { sun: { ...settings.lighting.sun, enabled: v } })} />
                       </div>
                       
                       {settings.lighting.sun.enabled && (
                          <div className="animate-fade-in">
                             <SunPositionWidget 
                                azimuth={settings.lighting.sun.azimuth} 
                                elevation={settings.lighting.sun.elevation}
                                onChange={(az, el) => updateSection('lighting', { sun: { ...settings.lighting.sun, azimuth: az, elevation: el } })}
                             />
                             
                             <SliderControl label="Intensity" value={settings.lighting.sun.intensity} min={0} max={200} step={1} unit="%" onChange={(v) => updateSection('lighting', { sun: { ...settings.lighting.sun, intensity: v } })} />
                             
                             <div className="mb-4">
                                <div className="flex justify-between items-baseline mb-2">
                                   <label className="text-xs font-medium text-foreground">Color Temp</label>
                                   <span className="text-[10px] font-mono text-foreground-muted">{settings.lighting.sun.colorTemp}K</span>
                                </div>
                                <div className="h-4 w-full relative">
                                   <div className="absolute inset-0 rounded-full overflow-hidden ring-1 ring-border" style={{ background: 'linear-gradient(90deg, #ff6b35, #ffd4a3, #ffffff, #9dc4ff)' }} />
                                   <input 
                                      type="range" 
                                      min={2000} max={12000} step={100} 
                                      value={settings.lighting.sun.colorTemp} 
                                      onChange={(e) => updateSection('lighting', { sun: { ...settings.lighting.sun, colorTemp: parseInt(e.target.value) } })}
                                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                                   />
                                   {/* Thumb Indicator */}
                                   <div 
                                      className="absolute top-0 bottom-0 w-1 bg-black/50 pointer-events-none"
                                      style={{ left: `${((settings.lighting.sun.colorTemp - 2000) / 10000) * 100}%` }}
                                   />
                                </div>
                             </div>
                          </div>
                       )}

                       <div className="border-t border-border-subtle pt-3 mt-3">
                          <div className="flex justify-between items-center mb-2">
                             <span className="text-xs font-bold text-foreground-secondary">Shadows</span>
                             <Toggle label="" checked={settings.lighting.shadows.enabled} onChange={(v) => updateSection('lighting', { shadows: { ...settings.lighting.shadows, enabled: v } })} />
                          </div>
                          {settings.lighting.shadows.enabled && (
                             <div className="space-y-3">
                                <SliderControl label="Opacity" value={settings.lighting.shadows.intensity} min={0} max={100} step={1} unit="%" onChange={(v) => updateSection('lighting', { shadows: { ...settings.lighting.shadows, intensity: v } })} />
                                <SliderControl label="Softness" value={settings.lighting.shadows.softness} min={0} max={100} step={1} unit="%" onChange={(v) => updateSection('lighting', { shadows: { ...settings.lighting.shadows, softness: v } })} />
                             </div>
                          )}
                       </div>

                       <div className="mt-4 grid grid-cols-3 gap-2">
                          {['Golden', 'Noon', 'Blue', 'Overcast', 'Night'].map(p => (
                             <button 
                                key={p}
                                className="px-2 py-1.5 text-[9px] font-bold border border-border rounded hover:bg-surface-elevated hover:text-foreground text-foreground-muted transition-colors"
                                onClick={() => updateSection('lighting', { preset: p.toLowerCase() })}
                             >
                                {p}
                             </button>
                          ))}
                       </div>
                    </div>
                )},

                // 3. CAMERA
                { id: 'camera', title: 'Camera', content: (
                    <div>
                       <SectionDesc>Composition and perspective settings.</SectionDesc>
                       
                       <div className="grid grid-cols-3 gap-2 mb-4">
                          {[
                             {id: 'eye-level', label: 'Eye Level', icon: User},
                             {id: 'elevated', label: 'Elevated', icon: Box},
                             {id: 'birds-eye', label: 'Bird\'s Eye', icon: Plane},
                             {id: 'worms-eye', label: 'Worm\'s Eye', icon: ArrowRight},
                             {id: 'corner', label: 'Corner', icon: Box},
                             {id: 'straight', label: 'Straight', icon: Grid},
                          ].map(p => (
                             <button
                                key={p.id}
                                onClick={() => updateSection('camera', { preset: p.id })}
                                className={cn(
                                   "flex flex-col items-center justify-center p-2 rounded border transition-all h-14",
                                   settings.camera.preset === p.id 
                                      ? "bg-foreground text-background border-foreground shadow-sm" 
                                      : "bg-surface-elevated border-border text-foreground-muted hover:border-foreground-muted"
                                )}
                             >
                                <p.icon size={14} className="mb-1" />
                                <span className="text-[9px] font-medium">{p.label}</span>
                             </button>
                          ))}
                       </div>

                       <div className="mb-4">
                          <label className="text-xs font-medium text-foreground mb-1.5 block">Lens (Focal Length)</label>
                          <div className="flex gap-1 bg-surface-sunken p-1 rounded-md">
                             {[12, 16, 24, 35, 50, 85].map(mm => (
                                <button
                                   key={mm}
                                   onClick={() => updateSection('camera', { lens: mm, fov: Math.round(2 * Math.atan(36/(2*mm)) * (180/Math.PI)) })}
                                   className={cn(
                                      "flex-1 py-1 text-[9px] font-mono rounded transition-colors",
                                      settings.camera.lens === mm ? "bg-white shadow-sm text-foreground font-bold" : "text-foreground-muted hover:text-foreground"
                                   )}
                                >
                                   {mm}
                                </button>
                             ))}
                          </div>
                       </div>

                       <SliderControl label="Field of View" value={settings.camera.fov} min={10} max={120} step={1} unit="°" onChange={(v) => updateSection('camera', { fov: v })} />
                       
                       <div className="space-y-1 pt-2 border-t border-border-subtle">
                          <Toggle label="Auto-Correct Perspective" checked={settings.camera.autoCorrect} onChange={(v) => updateSection('camera', { autoCorrect: v })} />
                          <Toggle label="Depth of Field" checked={settings.camera.dof.enabled} onChange={(v) => updateSection('camera', { dof: { ...settings.camera.dof, enabled: v } })} />
                          
                          {settings.camera.dof.enabled && (
                             <div className="pl-2 border-l-2 border-border-subtle mt-2 space-y-2 animate-fade-in">
                                <SliderControl label="Aperture" value={settings.camera.dof.aperture} min={1.4} max={22} step={0.1} unit="f/" onChange={(v) => updateSection('camera', { dof: { ...settings.camera.dof, aperture: v } })} />
                                <SliderControl label="Focus Dist" value={settings.camera.dof.focusDist} min={0.5} max={50} step={0.5} unit="m" onChange={(v) => updateSection('camera', { dof: { ...settings.camera.dof, focusDist: v } })} />
                             </div>
                          )}
                       </div>
                    </div>
                )},

                // 4. MATERIALS
                { id: 'materials', title: 'Materials', content: (
                    <div>
                       <SectionDesc>Surface appearance and weathering.</SectionDesc>
                       
                       <div className="mb-4">
                          <label className="text-xs font-medium text-foreground mb-1.5 block">Category Override</label>
                          <select 
                             className="w-full bg-surface-elevated border border-border rounded text-xs h-8 px-2"
                             value={settings.materials.category}
                             onChange={(e) => updateSection('materials', { category: e.target.value })}
                          >
                             {['Concrete', 'Wood', 'Metal', 'Glass', 'Stone', 'Brick', 'Tile', 'Fabric', 'Paint', 'Flooring'].map(c => (
                                <option key={c} value={c}>{c}</option>
                             ))}
                          </select>
                       </div>

                       <SliderControl label="Global Reflectivity" value={settings.materials.reflectivity} min={0} max={100} step={1} unit="%" onChange={(v) => updateSection('materials', { reflectivity: v })} />
                       <SliderControl label="Surface Roughness" value={settings.materials.roughness} min={0} max={100} step={1} unit="%" onChange={(v) => updateSection('materials', { roughness: v })} />
                       
                       <div className="pt-2 border-t border-border-subtle mt-3">
                          <div className="flex justify-between items-center mb-2">
                             <span className="text-xs font-bold text-foreground-secondary flex items-center gap-1.5"><Droplets size={12}/> Weathering</span>
                             <Toggle label="" checked={settings.materials.weathering.enabled} onChange={(v) => updateSection('materials', { weathering: { ...settings.materials.weathering, enabled: v } })} />
                          </div>
                          
                          {settings.materials.weathering.enabled && (
                             <div className="space-y-3 animate-fade-in">
                                <SliderControl label="Intensity" value={settings.materials.weathering.intensity} min={0} max={100} step={1} unit="%" onChange={(v) => updateSection('materials', { weathering: { ...settings.materials.weathering, intensity: v } })} />
                                <div className="grid grid-cols-2 gap-2">
                                   {['Dirt', 'Moss', 'Rust', 'Cracks'].map(w => (
                                      <button key={w} className="px-2 py-1.5 border border-border rounded text-[10px] text-foreground-muted hover:text-foreground hover:bg-surface-elevated transition-colors">{w}</button>
                                   ))}
                                </div>
                             </div>
                          )}
                       </div>
                    </div>
                )},

                // 5. ATMOSPHERE
                { id: 'atmosphere', title: 'Atmosphere', content: (
                    <div>
                       <SectionDesc>Mood, tone, and environmental effects.</SectionDesc>
                       
                       <div className="grid grid-cols-3 gap-2 mb-4">
                          {[
                             {id: 'warm', label: 'Warm'}, {id: 'cool', label: 'Cool'}, {id: 'dramatic', label: 'Dramatic'},
                             {id: 'soft', label: 'Soft'}, {id: 'moody', label: 'Moody'}, {id: 'luxury', label: 'Luxury'}
                          ].map(m => (
                             <button 
                                key={m.id}
                                className={cn(
                                   "py-2 px-1 text-[10px] font-bold border rounded transition-all",
                                   settings.atmosphere.mood.includes(m.id) 
                                      ? "bg-surface-sunken text-foreground border-foreground/50" 
                                      : "bg-surface-elevated text-foreground-muted border-border hover:border-foreground-muted"
                                )}
                                onClick={() => updateSection('atmosphere', { mood: m.id })}
                             >
                                {m.label}
                             </button>
                          ))}
                       </div>

                       <SliderControl label="Temperature" value={settings.atmosphere.temp} min={-100} max={100} step={1} onChange={(v) => updateSection('atmosphere', { temp: v })} />
                       
                       <div className="space-y-3 pt-2 border-t border-border-subtle mt-2">
                          <div className="flex items-center justify-between">
                             <span className="text-xs font-bold text-foreground-secondary flex items-center gap-1.5"><Wind size={12}/> Fog</span>
                             <Toggle label="" checked={settings.atmosphere.fog.enabled} onChange={(v) => updateSection('atmosphere', { fog: { ...settings.atmosphere.fog, enabled: v } })} />
                          </div>
                          {settings.atmosphere.fog.enabled && (
                             <SliderControl className="mb-0" label="Density" value={settings.atmosphere.fog.density} min={0} max={100} step={1} unit="%" onChange={(v) => updateSection('atmosphere', { fog: { ...settings.atmosphere.fog, density: v } })} />
                          )}

                          <div className="flex items-center justify-between">
                             <span className="text-xs font-bold text-foreground-secondary flex items-center gap-1.5"><Sparkle size={12}/> Bloom</span>
                             <Toggle label="" checked={settings.atmosphere.bloom.enabled} onChange={(v) => updateSection('atmosphere', { bloom: { ...settings.atmosphere.bloom, enabled: v } })} />
                          </div>
                          {settings.atmosphere.bloom.enabled && (
                             <SliderControl className="mb-0" label="Intensity" value={settings.atmosphere.bloom.intensity} min={0} max={100} step={1} unit="%" onChange={(v) => updateSection('atmosphere', { bloom: { ...settings.atmosphere.bloom, intensity: v } })} />
                          )}
                       </div>
                    </div>
                )},

                // 6. SCENERY
                { id: 'scenery', title: 'Scenery', content: (
                    <div>
                       <SectionDesc>Populate scene with context.</SectionDesc>
                       
                       <div className="space-y-4">
                          <div className="bg-surface-elevated border border-border rounded p-2">
                             <div className="flex justify-between items-center mb-2">
                                <span className="text-xs font-bold flex items-center gap-2"><User size={12}/> People</span>
                                <Toggle label="" checked={settings.scenery.people.enabled} onChange={(v) => updateSection('scenery', { people: { ...settings.scenery.people, enabled: v } })} />
                             </div>
                             {settings.scenery.people.enabled && (
                                <SliderControl className="mb-0" label="Count" value={settings.scenery.people.count} min={0} max={100} step={1} onChange={(v) => updateSection('scenery', { people: { ...settings.scenery.people, count: v } })} />
                             )}
                          </div>

                          <div className="bg-surface-elevated border border-border rounded p-2">
                             <div className="flex justify-between items-center mb-2">
                                <span className="text-xs font-bold flex items-center gap-2"><Trees size={12}/> Vegetation</span>
                                <Toggle label="" checked={settings.scenery.trees.enabled} onChange={(v) => updateSection('scenery', { trees: { ...settings.scenery.trees, enabled: v } })} />
                             </div>
                             {settings.scenery.trees.enabled && (
                                <SliderControl className="mb-0" label="Density" value={settings.scenery.trees.count} min={0} max={100} step={1} unit="%" onChange={(v) => updateSection('scenery', { trees: { ...settings.scenery.trees, count: v } })} />
                             )}
                          </div>

                          <div className="bg-surface-elevated border border-border rounded p-2">
                             <div className="flex justify-between items-center mb-2">
                                <span className="text-xs font-bold flex items-center gap-2"><Car size={12}/> Vehicles</span>
                                <Toggle label="" checked={settings.scenery.cars.enabled} onChange={(v) => updateSection('scenery', { cars: { ...settings.scenery.cars, enabled: v } })} />
                             </div>
                             {settings.scenery.cars.enabled && (
                                <SliderControl className="mb-0" label="Count" value={settings.scenery.cars.count} min={0} max={50} step={1} onChange={(v) => updateSection('scenery', { cars: { ...settings.scenery.cars, count: v } })} />
                             )}
                          </div>
                       </div>

                       <div className="mt-4">
                          <label className="text-xs font-medium text-foreground mb-1.5 block">Context Preset</label>
                          <select 
                             className="w-full bg-surface-elevated border border-border rounded text-xs h-8 px-2"
                             value={settings.scenery.preset}
                             onChange={(e) => updateSection('scenery', { preset: e.target.value })}
                          >
                             <option value="residential">Residential Suburban</option>
                             <option value="commercial">Urban Commercial</option>
                             <option value="interior">Interior Living</option>
                             <option value="empty">Empty / Studio</option>
                          </select>
                       </div>
                    </div>
                )},

                // 7. RENDER
                { id: 'render', title: 'Render Quality', content: (
                    <div>
                       <SectionDesc>Output specifications and export.</SectionDesc>
                       
                       <div className="mb-4">
                          <label className="text-xs font-medium text-foreground mb-1.5 block">Resolution</label>
                          <SegmentedControl 
                             value={settings.render.resolution}
                             options={[
                                {label: 'HD', value: '720p'}, {label: 'FHD', value: '1080p'}, {label: '4K', value: '4k'}, {label: 'Print', value: 'print'}
                             ]}
                             onChange={(v) => updateSection('render', { resolution: v })}
                          />
                       </div>

                       <div className="flex gap-4 mb-4">
                          <div className="flex-1">
                             <label className="text-xs font-medium text-foreground mb-1.5 block">Format</label>
                             <select 
                                className="w-full bg-surface-elevated border border-border rounded text-xs h-8 px-2"
                                value={settings.render.format}
                                onChange={(e) => updateSection('render', { format: e.target.value })}
                             >
                                <option value="png">PNG (Lossless)</option>
                                <option value="jpg">JPG (Compact)</option>
                                <option value="tiff">TIFF (High Bit)</option>
                                <option value="exr">EXR (Linear)</option>
                             </select>
                          </div>
                          <div className="flex-1">
                             <label className="text-xs font-medium text-foreground mb-1.5 block">Quality</label>
                             <select 
                                className="w-full bg-surface-elevated border border-border rounded text-xs h-8 px-2"
                                value={settings.render.quality}
                                onChange={(e) => updateSection('render', { quality: e.target.value })}
                             >
                                <option value="draft">Draft (Fast)</option>
                                <option value="preview">Preview</option>
                                <option value="production">Production</option>
                                <option value="ultra">Ultra</option>
                             </select>
                          </div>
                       </div>

                       <div className="space-y-2 mt-4">
                          <button className="w-full py-3 bg-foreground text-background rounded-lg flex items-center justify-center gap-2 text-xs font-bold hover:bg-foreground/90 transition-colors shadow-md">
                             <Camera size={16} /> Render Image
                          </button>
                          
                          <div className="grid grid-cols-2 gap-2">
                             <button className="py-2.5 bg-surface-elevated border border-border rounded-lg flex items-center justify-center gap-2 text-xs font-medium hover:bg-surface-sunken hover:border-foreground-muted transition-all">
                                <Globe size={14} /> 360° Pano
                             </button>
                             <button className="py-2.5 bg-surface-elevated border border-border rounded-lg flex items-center justify-center gap-2 text-xs font-medium hover:bg-surface-sunken hover:border-foreground-muted transition-all">
                                <Film size={14} /> Animation
                             </button>
                          </div>
                       </div>
                    </div>
                )}
            ]} defaultValue="geometry" />
        </div>
    );
};
