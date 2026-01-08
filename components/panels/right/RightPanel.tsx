import React, { useMemo } from 'react';
import { useAppStore } from '../../../store';
import { Accordion } from '../../ui/Accordion';
import { Slider } from '../../ui/Slider';
import { Toggle } from '../../ui/Toggle';
import { SegmentedControl } from '../../ui/SegmentedControl';
import { cn } from '../../../lib/utils';
import { 
  Box, Camera, Sun, Palette, Users, Download, Lock, Wand2, Eye, 
  Settings, SlidersHorizontal, Cuboid, FileOutput, MonitorPlay, Zap, 
  Map as MapIcon, Layers, PenTool, Trees, Building
} from 'lucide-react';
import { GenerationMode } from '../../../types';

// --- Shared Control Blocks ---

const GeometryBlock = ({ dispatch, state }: any) => (
  <div className="space-y-4">
    <div className="bg-surface-sunken p-3 rounded-lg space-y-2">
      <Toggle label="Lock Geometry" checked={state.geometry.lockGeometry} onChange={(v) => dispatch({ type: 'UPDATE_GEOMETRY', payload: { lockGeometry: v } })} />
      <Toggle label="Lock Perspective" checked={state.geometry.lockPerspective} onChange={(v) => dispatch({ type: 'UPDATE_GEOMETRY', payload: { lockPerspective: v } })} />
      <Toggle label="Lock Camera" checked={state.geometry.lockCameraPosition} onChange={(v) => dispatch({ type: 'UPDATE_GEOMETRY', payload: { lockCameraPosition: v } })} />
      <Toggle label="Lock Framing" checked={state.geometry.lockFraming} onChange={(v) => dispatch({ type: 'UPDATE_GEOMETRY', payload: { lockFraming: v } })} />
    </div>
    
    <div>
      <h4 className="text-xs font-semibold text-foreground-secondary mb-3">Strengths</h4>
      <Slider className="mb-3" label="Geometry" value={state.geometry.geometryPreservation} min={0} max={100} onChange={(v) => dispatch({ type: 'UPDATE_GEOMETRY', payload: { geometryPreservation: v } })} />
      <Slider className="mb-3" label="Perspective" value={state.geometry.perspectiveAdherence} min={0} max={100} onChange={(v) => dispatch({ type: 'UPDATE_GEOMETRY', payload: { perspectiveAdherence: v } })} />
      <Slider label="Framing" value={state.geometry.framingAdherence} min={0} max={100} onChange={(v) => dispatch({ type: 'UPDATE_GEOMETRY', payload: { framingAdherence: v } })} />
    </div>
    
    <div>
       <label className="text-xs text-foreground-secondary block mb-2">Edge Control</label>
       <SegmentedControl 
          value={state.geometry.edgeDefinition} 
          onChange={(v) => dispatch({ type: 'UPDATE_GEOMETRY', payload: { edgeDefinition: v } })} 
          options={[{label: 'Sharp', value: 'sharp'}, {label: 'Adaptive', value: 'adaptive'}, {label: 'Soft', value: 'soft'}]} 
       />
    </div>
  </div>
);

const CameraBlock = ({ dispatch, state }: any) => (
   <div className="space-y-4">
      <div>
        <label className="text-xs text-foreground-secondary block mb-2">FOV Mode</label>
        <SegmentedControl value={state.camera.fovMode} onChange={(v) => dispatch({ type: 'UPDATE_CAMERA', payload: { fovMode: v } })} options={[{label:'Narrow', value:'narrow'}, {label:'Normal', value:'normal'}, {label:'Wide', value:'wide'}, {label:'Ultra', value:'ultra-wide'}]} />
      </div>
      <div>
        <label className="text-xs text-foreground-secondary block mb-2">View Type</label>
        <SegmentedControl value={state.camera.viewType} onChange={(v) => dispatch({ type: 'UPDATE_CAMERA', payload: { viewType: v } })} options={[{label:'Eye', value:'eye-level'}, {label:'Aerial', value:'aerial'}, {label:'Drone', value:'drone'}, {label:'Worm', value:'worm'}]} />
      </div>
      <div>
        <label className="text-xs text-foreground-secondary block mb-2">Projection</label>
        <SegmentedControl value={state.camera.projection} onChange={(v) => dispatch({ type: 'UPDATE_CAMERA', payload: { projection: v } })} options={[{label:'Persp', value:'perspective'}, {label:'Axon', value:'axonometric'}, {label:'Iso', value:'isometric'}]} />
      </div>
      <div className="bg-surface-sunken p-3 rounded-lg space-y-2">
         <Toggle label="Vertical Correction" checked={state.camera.verticalCorrection} onChange={(v) => dispatch({ type: 'UPDATE_CAMERA', payload: { verticalCorrection: v } })} />
         <Toggle label="Horizon Lock" checked={state.camera.horizonLock} onChange={(v) => dispatch({ type: 'UPDATE_CAMERA', payload: { horizonLock: v } })} />
         <Toggle label="Depth of Field" checked={state.camera.depthOfField} onChange={(v) => dispatch({ type: 'UPDATE_CAMERA', payload: { depthOfField: v } })} />
         {state.camera.depthOfField && <Slider label="Strength" value={state.camera.dofStrength} min={0} max={100} onChange={(v) => dispatch({ type: 'UPDATE_CAMERA', payload: { dofStrength: v } })} />}
      </div>
   </div>
);

const LightingBlock = ({ dispatch, state }: any) => (
  <div className="space-y-4">
    <select 
       className="w-full h-9 bg-surface-elevated border border-border rounded px-2 text-sm"
       value={state.lighting.timeOfDay}
       onChange={(e) => dispatch({ type: 'UPDATE_LIGHTING', payload: { timeOfDay: e.target.value } })}
    >
       <option value="morning">Morning</option>
       <option value="midday">Midday</option>
       <option value="afternoon">Afternoon</option>
       <option value="golden-hour">Golden Hour</option>
       <option value="blue-hour">Blue Hour</option>
       <option value="night">Night</option>
       <option value="overcast">Overcast</option>
    </select>
    
    <div className="space-y-3">
      <Slider label="Sun Azimuth" value={state.lighting.sunAzimuth} min={0} max={360} onChange={(v) => dispatch({ type: 'UPDATE_LIGHTING', payload: { sunAzimuth: v } })} />
      <Slider label="Sun Altitude" value={state.lighting.sunAltitude} min={0} max={90} onChange={(v) => dispatch({ type: 'UPDATE_LIGHTING', payload: { sunAltitude: v } })} />
    </div>
    
    <div className="space-y-3">
      <Slider label="Shadow Softness" value={state.lighting.shadowSoftness} min={0} max={100} onChange={(v) => dispatch({ type: 'UPDATE_LIGHTING', payload: { shadowSoftness: v } })} />
      <Slider label="Shadow Intensity" value={state.lighting.shadowIntensity} min={0} max={100} onChange={(v) => dispatch({ type: 'UPDATE_LIGHTING', payload: { shadowIntensity: v } })} />
    </div>
    
    <div className="bg-surface-sunken p-3 rounded-lg space-y-2">
       <Toggle label="Fog / Haze" checked={state.lighting.fog} onChange={(v) => dispatch({ type: 'UPDATE_LIGHTING', payload: { fog: v } })} />
       <div className="flex items-center justify-between">
          <label className="text-sm text-foreground-secondary">Weather</label>
          <select 
             className="h-7 bg-surface-elevated border border-border rounded text-xs px-2"
             value={state.lighting.weather}
             onChange={(e) => dispatch({ type: 'UPDATE_LIGHTING', payload: { weather: e.target.value } })}
          >
             <option value="clear">Clear</option>
             <option value="cloudy">Cloudy</option>
             <option value="rain">Rain</option>
             <option value="snow">Snow</option>
          </select>
       </div>
    </div>
  </div>
);

const MaterialBlock = ({ dispatch, state }: any) => (
   <div className="space-y-4">
      <div>
         <h4 className="text-xs font-semibold text-foreground-secondary mb-3">Material Emphasis</h4>
         <Slider className="mb-3" label="Concrete" value={state.materials.concreteEmphasis} min={0} max={100} onChange={(v) => dispatch({ type: 'UPDATE_MATERIALS', payload: { concreteEmphasis: v } })} />
         <Slider className="mb-3" label="Glass" value={state.materials.glassEmphasis} min={0} max={100} onChange={(v) => dispatch({ type: 'UPDATE_MATERIALS', payload: { glassEmphasis: v } })} />
         <Slider className="mb-3" label="Wood" value={state.materials.woodEmphasis} min={0} max={100} onChange={(v) => dispatch({ type: 'UPDATE_MATERIALS', payload: { woodEmphasis: v } })} />
         <Slider className="mb-3" label="Metal" value={state.materials.metalEmphasis} min={0} max={100} onChange={(v) => dispatch({ type: 'UPDATE_MATERIALS', payload: { metalEmphasis: v } })} />
      </div>
      <div className="bg-surface-sunken p-3 rounded-lg space-y-3">
         <h4 className="text-xs font-semibold text-foreground-secondary">Global Settings</h4>
         <Slider label="Texture Sharpness" value={state.materials.textureSharpness} min={0} max={100} onChange={(v) => dispatch({ type: 'UPDATE_MATERIALS', payload: { textureSharpness: v } })} />
         <Slider label="Aging / Weathering" value={state.materials.agingLevel} min={0} max={100} onChange={(v) => dispatch({ type: 'UPDATE_MATERIALS', payload: { agingLevel: v } })} />
         <Slider label="Reflectivity Bias" value={state.materials.reflectivityBias} min={-50} max={50} onChange={(v) => dispatch({ type: 'UPDATE_MATERIALS', payload: { reflectivityBias: v } })} />
      </div>
   </div>
);

const ContextBlock = ({ dispatch, state }: any) => (
   <div className="space-y-4">
      <div className="bg-surface-sunken p-3 rounded-lg space-y-3">
         <div className="flex items-center justify-between">
            <Toggle label="People" checked={state.context.people} onChange={(v) => dispatch({ type: 'UPDATE_CONTEXT', payload: { people: v } })} />
            {state.context.people && (
               <select 
                  className="h-7 bg-surface-elevated border border-border rounded text-xs px-2"
                  value={state.context.peopleDensity}
                  onChange={(e) => dispatch({ type: 'UPDATE_CONTEXT', payload: { peopleDensity: e.target.value } })}
               >
                  <option value="sparse">Sparse</option>
                  <option value="moderate">Moderate</option>
                  <option value="busy">Busy</option>
               </select>
            )}
         </div>
         <Toggle label="Vegetation" checked={state.context.vegetation} onChange={(v) => dispatch({ type: 'UPDATE_CONTEXT', payload: { vegetation: v } })} />
         <Toggle label="Vehicles" checked={state.context.vehicles} onChange={(v) => dispatch({ type: 'UPDATE_CONTEXT', payload: { vehicles: v } })} />
         <Toggle label="Urban Furniture" checked={state.context.urbanFurniture} onChange={(v) => dispatch({ type: 'UPDATE_CONTEXT', payload: { urbanFurniture: v } })} />
      </div>
   </div>
);

const OutputBlock = ({ dispatch, state }: any) => (
  <div className="space-y-4">
     <div>
       <label className="text-xs text-foreground-secondary block mb-2">Resolution</label>
       <SegmentedControl value={state.output.resolution} onChange={(v) => dispatch({ type: 'UPDATE_OUTPUT', payload: { resolution: v } })} options={[{label:'2K', value:'2k'}, {label:'4K', value:'4k'}, {label:'8K', value:'8k'}]} />
     </div>
     <div>
       <label className="text-xs text-foreground-secondary block mb-2">Format</label>
       <SegmentedControl value={state.output.format} onChange={(v) => dispatch({ type: 'UPDATE_OUTPUT', payload: { format: v } })} options={[{label:'PNG', value:'png'}, {label:'JPG', value:'jpg'}]} />
     </div>
     <div className="pt-2">
       <button className="w-full h-10 bg-foreground text-background rounded-md text-sm font-medium flex items-center justify-center gap-2 hover:bg-black/90 transition-colors shadow-elevated">
          <Download size={16} /> Export
       </button>
     </div>
  </div>
);

// --- Workflow Specific Blocks ---

const CadInterpretationContent = ({ state, dispatch }: any) => {
  const interp = state.workflow.cadInterpretation;
  const update = (key: string, val: any) => dispatch({ type: 'UPDATE_WORKFLOW', payload: { cadInterpretation: { ...interp, [key]: val } } });
  
  return (
    <div className="space-y-4">
      <div className="bg-surface-sunken p-3 rounded-lg space-y-2">
        <Toggle label="Recognize Rooms" checked={interp.recognizeRooms} onChange={(v) => update('recognizeRooms', v)} />
        <Toggle label="Recognize Doors/Windows" checked={interp.recognizeOpenings} onChange={(v) => update('recognizeOpenings', v)} />
      </div>
      <div className="space-y-2">
        <label className="text-xs text-foreground-secondary font-medium">Extrusion Heights (m)</label>
        <div className="grid grid-cols-2 gap-2">
           <div className="bg-surface-elevated border border-border rounded p-2 text-xs flex justify-between items-center">
             <span className="text-foreground-muted">Ceiling</span> 
             <input 
              className="w-12 text-right bg-transparent border-none focus:outline-none font-mono" 
              value={interp.ceilingHeight}
              onChange={(e) => update('ceilingHeight', parseFloat(e.target.value) || 0)}
             />
           </div>
           <div className="bg-surface-elevated border border-border rounded p-2 text-xs flex justify-between items-center">
             <span className="text-foreground-muted">Sill</span> 
             <input 
              className="w-12 text-right bg-transparent border-none focus:outline-none font-mono" 
              value={interp.sillHeight}
              onChange={(e) => update('sillHeight', parseFloat(e.target.value) || 0)}
             />
           </div>
        </div>
      </div>
      <div className="space-y-2">
         <label className="text-xs text-foreground-secondary font-medium">Furnishing Level</label>
         <SegmentedControl 
          value={interp.furnishingLevel} 
          onChange={(v) => update('furnishingLevel', v)} 
          options={[{label:'None', value:'none'}, {label:'Partial', value:'partial'}, {label:'Full', value:'full'}]} 
         />
      </div>
    </div>
  );
};

const MasterplanBuildingsContent = ({ state, dispatch }: any) => {
   const mp = state.workflow.mpBuildings;
   const update = (key: string, val: any) => dispatch({ type: 'UPDATE_WORKFLOW', payload: { mpBuildings: { ...mp, [key]: val } } });

   return (
      <div className="space-y-4">
         <div className="bg-surface-sunken p-3 rounded-lg space-y-2">
            <label className="text-xs text-foreground-secondary font-medium block">Mass Style</label>
            <select 
              className="w-full h-8 bg-surface-elevated border border-border rounded text-xs px-2"
              value={mp.massStyle}
              onChange={(e) => update('massStyle', e.target.value)}
            >
               <option>White Box</option>
               <option>Glass Towers</option>
               <option>Mixed Facade</option>
               <option>Sketchy</option>
            </select>
         </div>
         <Slider label="Building Height Variation" value={mp.heightVariation} min={0} max={100} onChange={(v) => update('heightVariation', v)} />
         <Slider label="Roof Detail" value={mp.roofDetail} min={0} max={100} onChange={(v) => update('roofDetail', v)} />
         <Toggle label="Shadow Study Mode" checked={mp.shadowStudy} onChange={(v) => update('shadowStudy', v)} />
      </div>
   );
};

const VisualToolOptionsContent = ({ state, dispatch }: any) => {
  const tool = state.workflow.activeTool;
  const tools = state.workflow.visualTools;
  const update = (key: string, val: any) => dispatch({ type: 'UPDATE_WORKFLOW', payload: { visualTools: { ...tools, [key]: val } } });

  return (
    <div className="space-y-4">
      <div className="bg-accent/10 p-2 rounded text-xs text-accent-hover font-medium uppercase tracking-wide mb-2 flex items-center gap-2">
         <Wand2 size={12} />
        Active Tool: {tool}
      </div>
      {tool === 'brush' && <Slider label="Brush Size" value={tools.brushSize} min={1} max={100} onChange={(v) => update('brushSize', v)} />}
      {(tool === 'select' || tool === 'wand') && <Slider label="Tolerance" value={tools.tolerance} min={0} max={100} onChange={(v) => update('tolerance', v)} />}
      {tool === 'ai-select' && (
        <div className="space-y-2">
          <label className="text-xs text-foreground-secondary">Prompt</label>
          <input 
            type="text" 
            placeholder="Type object to select..." 
            className="w-full text-sm p-2 border border-border rounded focus:border-accent focus:outline-none" 
            value={tools.aiPrompt}
            onChange={(e) => update('aiPrompt', e.target.value)}
          />
          <button className="w-full h-8 bg-surface-elevated border border-border rounded text-xs font-medium hover:border-foreground transition-colors">Auto Select</button>
        </div>
      )}
    </div>
  );
};

const VisualAdjustmentsContent = ({ state, dispatch }: any) => {
   const adjustments = state.workflow.editAdjustments;
   const update = (key: string, val: number) => dispatch({ type: 'UPDATE_WORKFLOW', payload: { editAdjustments: { ...adjustments, [key]: val } } });
   
   return (
      <div className="space-y-4">
         <Slider label="Exposure" value={adjustments.exposure} min={-100} max={100} onChange={(v) => update('exposure', v)} />
         <Slider label="Contrast" value={adjustments.contrast} min={-100} max={100} onChange={(v) => update('contrast', v)} />
         <Slider label="Saturation" value={adjustments.saturation} min={-100} max={100} onChange={(v) => update('saturation', v)} />
         <div className="h-px bg-border-subtle" />
         <Slider label="Temperature" value={adjustments.temperature} min={-100} max={100} onChange={(v) => update('temperature', v)} />
         <Slider label="Tint" value={adjustments.tint} min={-100} max={100} onChange={(v) => update('tint', v)} />
      </div>
   );
};

const VideoMotionContent = ({ state, dispatch }: any) => {
  const motion = state.workflow.videoMotion;
  const update = (key: string, val: any) => dispatch({ type: 'UPDATE_WORKFLOW', payload: { videoMotion: { ...motion, [key]: val } } });

  return (
    <div className="space-y-4">
      <label className="text-xs text-foreground-secondary font-medium">Path Type</label>
      <SegmentedControl 
        value={motion.pathType} 
        onChange={(v) => update('pathType', v)} 
        options={[{label:'Orbit', value:'orbit'}, {label:'Pan', value:'pan'}, {label:'Dolly', value:'dolly'}]} 
      />
      
      <Slider label="Motion Speed" value={motion.speed} min={0} max={100} onChange={(v) => update('speed', v)} />
      <Toggle label="Ease In/Out" checked={motion.ease} onChange={(v) => update('ease', v)} />
      
      <div className="pt-2">
        <label className="text-xs text-foreground-secondary block mb-2 font-medium">Look-at Target</label>
        <SegmentedControl 
          value={motion.lookAt} 
          onChange={(v) => update('lookAt', v)} 
          options={[{label:'Center', value:'center'}, {label:'Cursor', value:'cursor'}, {label:'Path', value:'path'}]} 
        />
      </div>
    </div>
  );
};

const VideoEffectsContent = ({ state, dispatch }: any) => {
   const effects = state.workflow.videoEffects;
   const update = (key: string, val: boolean) => dispatch({ type: 'UPDATE_WORKFLOW', payload: { videoEffects: { ...effects, [key]: val } } });
   
   return (
      <div className="space-y-4">
         <div className="bg-surface-sunken p-3 rounded-lg space-y-2">
            <Toggle label="Season Transition" checked={effects.seasonTransition} onChange={(v) => update('seasonTransition', v)} />
            <Toggle label="Cloud Time-lapse" checked={effects.timeLapseCloud} onChange={(v) => update('timeLapseCloud', v)} />
            <Toggle label="Day/Night Cycle" checked={effects.lightCycle} onChange={(v) => update('lightCycle', v)} />
         </div>
         <div>
            <label className="text-xs text-foreground-secondary block mb-2 font-medium">Post FX</label>
            <div className="grid grid-cols-2 gap-2">
               {['Film Grain', 'Bloom', 'Vignette', 'Lut'].map(fx => (
                  <button key={fx} className="text-xs border border-border bg-surface-elevated rounded py-1 hover:border-foreground">{fx}</button>
               ))}
            </div>
         </div>
      </div>
   );
};

const Image3DReconstructionContent = ({ state, dispatch }: any) => {
   const conf = state.workflow.imgTo3DConfig;
   const update = (key: string, val: any) => dispatch({ type: 'UPDATE_WORKFLOW', payload: { imgTo3DConfig: { ...conf, [key]: val } } });

   return (
      <div className="space-y-4">
         <Slider label="Mesh Quality" value={conf.meshQuality} min={0} max={100} onChange={(v) => update('meshQuality', v)} />
         <Toggle label="Symmetry Constraint" checked={conf.symmetry} onChange={(v) => update('symmetry', v)} />
         <Toggle label="Infer Hidden Geometry" checked={conf.inferHidden} onChange={(v) => update('inferHidden', v)} />
         <div className="h-px bg-border-subtle" />
         <div className="grid grid-cols-2 gap-2 text-xs text-foreground-muted bg-surface-sunken p-2 rounded">
            <div>Verts: <span className="font-mono text-foreground">124k</span></div>
            <div>Faces: <span className="font-mono text-foreground">80k</span></div>
         </div>
      </div>
   );
};

const ExplodedSpacingContent = ({ state, dispatch }: any) => {
   const space = state.workflow.explodedSpacing;
   const update = (key: string, val: any) => dispatch({ type: 'UPDATE_WORKFLOW', payload: { explodedSpacing: { ...space, [key]: val } } });

   return (
      <div className="space-y-4">
         <Slider label="Global Distance" value={space.distance} min={0} max={200} onChange={(v) => update('distance', v)} />
         <div>
            <label className="text-xs text-foreground-secondary font-medium block mb-2">Expansion Mode</label>
            <SegmentedControl 
              value={space.mode} 
              onChange={(v) => update('mode', v)} 
              options={[{label:'Uniform', value:'uniform'}, {label:'Progressive', value:'progressive'}]} 
            />
         </div>
         <Toggle label="Show Connectors" checked={space.connectors} onChange={(v) => update('connectors', v)} />
      </div>
   );
};

const ExplodedAnnotationContent = ({ state, dispatch }: any) => {
   const anno = state.workflow.explodedAnnotation;
   const update = (key: string, val: boolean) => dispatch({ type: 'UPDATE_WORKFLOW', payload: { explodedAnnotation: { ...anno, [key]: val } } });
   
   return (
      <div className="space-y-4">
         <div className="bg-surface-sunken p-3 rounded-lg space-y-2">
            <Toggle label="Show Labels" checked={anno.showLabels} onChange={(v) => update('showLabels', v)} />
            <Toggle label="Show Leader Lines" checked={anno.showLeaders} onChange={(v) => update('showLeaders', v)} />
            <Toggle label="Show Dimensions" checked={anno.showDimensions} onChange={(v) => update('showDimensions', v)} />
         </div>
         <button 
            className="w-full h-9 border border-border bg-surface-elevated rounded text-xs font-medium hover:border-accent hover:text-accent-hover transition-colors"
            onClick={() => update('autoAnnotate', true)}
         >
            Auto-Generate Annotations
         </button>
      </div>
   );
};

const MasterplanInterpretationContent = ({ state, dispatch }: any) => {
   const mp = state.workflow.mpInterpretation;
   const update = (key: string, val: boolean) => dispatch({ type: 'UPDATE_WORKFLOW', payload: { mpInterpretation: { ...mp, [key]: val } } });
   
   return (
      <div className="space-y-4">
         <div className="bg-surface-sunken p-3 rounded-lg space-y-2">
            <Toggle label="Zone Color Coding" checked={mp.zoneColorCoding} onChange={(v) => update('zoneColorCoding', v)} />
            <Toggle label="Area Calculation" checked={mp.areaCalculation} onChange={(v) => update('areaCalculation', v)} />
            <Toggle label="Road Hierarchy" checked={mp.roadHierarchy} onChange={(v) => update('roadHierarchy', v)} />
         </div>
      </div>
   );
};

const UpscaleControls = ({ state, dispatch }: any) => {
   const flags = state.workflow.upscaleFlags;
   const updateFlags = (key: string, val: boolean) => dispatch({ type: 'UPDATE_WORKFLOW', payload: { upscaleFlags: { ...flags, [key]: val } } });

   return (
      <div className="space-y-6">
         <div>
            <label className="text-xs text-foreground-secondary font-medium block mb-3">Scale Factor</label>
            <div className="flex gap-2">
               {['2x', '4x', '8x'].map(x => (
                  <button 
                    key={x} 
                    onClick={() => dispatch({ type: 'UPDATE_WORKFLOW', payload: { upscaleFactor: x } })}
                    className={cn("flex-1 py-2 text-sm font-medium border rounded", state.workflow.upscaleFactor === x ? "bg-foreground text-background border-foreground" : "bg-surface-elevated border-border")}
                  >
                     {x}
                  </button>
               ))}
            </div>
         </div>
         <div className="space-y-4">
            <Slider label="Denoise" value={state.workflow.upscaleDenoise} min={0} max={100} onChange={(v) => dispatch({ type: 'UPDATE_WORKFLOW', payload: { upscaleDenoise: v } })} />
            <Slider label="Sharpen" value={state.workflow.upscaleSharpen} min={0} max={100} onChange={(v) => dispatch({ type: 'UPDATE_WORKFLOW', payload: { upscaleSharpen: v } })} />
            <Slider label="Enhance Details" value={state.workflow.upscaleEnhance} min={0} max={100} onChange={(v) => dispatch({ type: 'UPDATE_WORKFLOW', payload: { upscaleEnhance: v } })} />
         </div>
         <div className="bg-surface-sunken p-3 rounded-lg space-y-2">
            <Toggle label="Face Restoration" checked={flags.faceRestoration} onChange={(v) => updateFlags('faceRestoration', v)} />
            <Toggle label="Remove JPEG Artifacts" checked={flags.removeArtifacts} onChange={(v) => updateFlags('removeArtifacts', v)} />
         </div>
      </div>
   );
};

// --- Main Component ---

export const RightPanel: React.FC = () => {
  const { state, dispatch } = useAppStore();
  
  // Define Tab Structure per Workflow
  const tabs = useMemo(() => {
    const common = [
      { id: 'output', label: 'Output', icon: Download, content: <OutputBlock state={state} dispatch={dispatch} /> }
    ];

    switch (state.mode as GenerationMode) {
      case 'render-3d':
      case 'render-sketch':
        return [
          { id: 'geometry', label: 'Geometry', icon: Box, content: <GeometryBlock state={state} dispatch={dispatch} /> },
          { id: 'materials', label: 'Materials', icon: Palette, content: <MaterialBlock state={state} dispatch={dispatch} /> },
          { id: 'lighting', label: 'Lighting', icon: Sun, content: <LightingBlock state={state} dispatch={dispatch} /> },
          { id: 'camera', label: 'Camera', icon: Camera, content: <CameraBlock state={state} dispatch={dispatch} /> },
          { id: 'context', label: 'Context', icon: Users, content: <ContextBlock state={state} dispatch={dispatch} /> },
          ...common
        ];
      
      case 'render-cad':
        return [
          { id: 'interpret', label: 'Interpret', icon: Wand2, content: <CadInterpretationContent state={state} dispatch={dispatch} /> },
          { id: 'view', label: 'View', icon: Eye, content: <CameraBlock state={state} dispatch={dispatch} /> },
          ...common
        ];
        
      case 'masterplan':
        return [
          { id: 'interpret', label: 'Interpret', icon: Wand2, content: <MasterplanInterpretationContent state={state} dispatch={dispatch} /> },
          { id: 'buildings', label: 'Buildings', icon: Building, content: <MasterplanBuildingsContent state={state} dispatch={dispatch} /> },
          { id: 'landscape', label: 'Landscape', icon: Trees, content: <ContextBlock state={state} dispatch={dispatch} /> },
          { id: 'view', label: 'View', icon: Eye, content: <CameraBlock state={state} dispatch={dispatch} /> },
          ...common
        ];

      case 'visual-edit':
        return [
          { id: 'tool-opts', label: 'Tool Options', icon: Settings, content: <VisualToolOptionsContent state={state} dispatch={dispatch} /> },
          { id: 'adjust', label: 'Adjustments', icon: SlidersHorizontal, content: <VisualAdjustmentsContent state={state} dispatch={dispatch} /> },
           ...common
        ];
      
      case 'exploded':
        return [
          { id: 'spacing', label: 'Spacing', icon: Layers, content: <ExplodedSpacingContent state={state} dispatch={dispatch} /> },
          { id: 'annotation', label: 'Annotate', icon: PenTool, content: <ExplodedAnnotationContent state={state} dispatch={dispatch} /> },
          ...common
        ];
        
      case 'img-to-3d':
        return [
          { id: 'recon', label: 'Reconstruct', icon: Cuboid, content: <Image3DReconstructionContent state={state} dispatch={dispatch} /> },
          { id: 'export-3d', label: 'Export', icon: FileOutput, content: <OutputBlock state={state} dispatch={dispatch} /> }
        ];

      case 'video':
        return [
          { id: 'motion', label: 'Motion', icon: MonitorPlay, content: <VideoMotionContent state={state} dispatch={dispatch} /> },
          { id: 'effects', label: 'Effects', icon: Zap, content: <VideoEffectsContent state={state} dispatch={dispatch} /> },
          ...common
        ];
        
      case 'upscale':
         return [
            { id: 'upscale-settings', label: 'Enhance', icon: Wand2, content: <UpscaleControls state={state} dispatch={dispatch} /> },
            ...common
         ];
      
      case 'section':
      case 'img-to-cad':
      default:
        return [
          { id: 'geometry', label: 'Geometry', icon: Box, content: <GeometryBlock state={state} dispatch={dispatch} /> },
          { id: 'output', label: 'Output', icon: Download, content: <OutputBlock state={state} dispatch={dispatch} /> }
        ];
    }
  }, [state.mode, state.workflow, state.geometry, state.camera, state.output, state.lighting, state.context, state.materials]);

  // Ensure active tab is valid
  const activeTab = tabs.find(t => t.id === state.activeRightTab) ? state.activeRightTab : tabs[0].id;

  return (
    <div className={cn("bg-surface-elevated border-l border-border flex flex-col shrink-0 transition-all", state.rightPanelWidth ? `w-[${state.rightPanelWidth}px]` : "w-[320px]")}>
      {/* Dynamic Tab Bar */}
      <div className="flex border-b border-border bg-background-secondary overflow-x-auto no-scrollbar">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => dispatch({ type: 'SET_ACTIVE_TAB', payload: tab.id })}
              className={cn(
                "flex-1 min-w-[3.5rem] h-10 flex items-center justify-center border-b-2 transition-colors",
                activeTab === tab.id
                  ? "border-foreground text-foreground bg-surface-elevated"
                  : "border-transparent text-foreground-muted hover:text-foreground-secondary hover:bg-surface-elevated"
              )}
              title={tab.label}
            >
              <Icon size={18} />
            </button>
          );
        })}
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
         {tabs.map((tab) => (
           <div key={tab.id} className={cn("animate-fade-in", activeTab === tab.id ? "block" : "hidden")}>
             <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-foreground-muted border-b border-border-subtle pb-2">
               <tab.icon size={14} />
               {tab.label}
             </div>
             {tab.content}
           </div>
         ))}
      </div>
    </div>
  );
};