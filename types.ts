export type GenerationMode = 
  | 'render-3d' 
  | 'render-cad' 
  | 'masterplan' 
  | 'visual-edit' 
  | 'exploded' 
  | 'section' 
  | 'render-sketch' 
  | 'upscale' 
  | 'img-to-cad' 
  | 'img-to-3d' 
  | 'video';

export interface StyleConfiguration {
  id: string;
  name: string;
  category: string;
  description: string;
  previewUrl?: string;
  promptBundle: any;
}

// Data structures for list-based UI features
export interface VideoKeyframe {
  id: string;
  timestamp: string;
  thumbnail: string;
  description: string;
}

export interface EditLayer {
  id: string;
  name: string;
  type: string;
  visible: boolean;
}

export interface LegendItem {
  id: string;
  zone: string;
  color: string;
  area: string;
}

export interface ExplodedLayer {
  id: string;
  name: string;
  offset: number;
  visible: boolean;
}

export interface WorkflowSettings {
  // 1. 3D Render
  renderMode: 'enhance' | 'stylize' | 'hybrid' | 'realism' | 'concept';
  
  // 2. CAD
  drawingType: 'plan' | 'section' | 'elevation' | 'site' | 'detail';
  cadScale: string;
  cadStyle: 'realistic' | 'conceptual' | 'diagram' | 'photo';
  cadInterpretation: {
    recognizeRooms: boolean;
    recognizeOpenings: boolean;
    ceilingHeight: number;
    sillHeight: number;
    furnishingLevel: 'none' | 'partial' | 'full';
  };
  
  // 3. Masterplan
  layoutType: 'site' | 'urban' | 'landscape' | 'zoning' | 'block';
  mpScale: string;
  mpInterpretation: {
    zoneColorCoding: boolean;
    areaCalculation: boolean;
    roadHierarchy: boolean;
  };
  mpBuildings: {
    massStyle: string;
    heightVariation: number;
    roofDetail: number;
    shadowStudy: boolean;
  };
  legendItems: LegendItem[];
  
  // 4. Visual Edit
  activeTool: 'select' | 'brush' | 'lasso' | 'wand' | 'ai-select';
  editOperation: 'texture' | 'lighting' | 'object' | 'material' | 'grade' | 'inpaint';
  visualTools: {
    brushSize: number;
    tolerance: number;
    aiPrompt: string;
  };
  editAdjustments: {
    exposure: number;
    contrast: number;
    saturation: number;
    temperature: number;
    tint: number;
  };
  editStack: EditLayer[];
  
  // 5. Exploded
  explodeType: 'vertical' | 'horizontal' | 'radial' | 'custom';
  explodedLayers: ExplodedLayer[];
  explodedSpacing: {
    distance: number;
    mode: 'uniform' | 'progressive';
    connectors: boolean;
  };
  explodedAnnotation: {
    showLabels: boolean;
    showLeaders: boolean;
    showDimensions: boolean;
    autoAnnotate: boolean;
  };
  
  // 6. Section
  sectionType: 'building' | 'wall' | 'detail';
  sectionStyle: 'line' | 'hatch' | 'poche' | 'color' | 'gradient';
  sectionCutPlane: number;
  
  // 7. Sketch
  sketchType: 'arch' | 'interior' | 'landscape' | 'furniture' | 'abstract';
  sketchFidelity: number;
  sketchCleanup: { contrast: boolean; background: boolean; straighten: boolean };
  
  // 8. Upscale
  upscaleFactor: '2x' | '4x' | '8x';
  upscaleDenoise: number;
  upscaleSharpen: number;
  upscaleEnhance: number;
  upscaleFlags: {
    faceRestoration: boolean;
    removeArtifacts: boolean;
  };
  
  // 9. Image to CAD
  imgToCadOutput: 'elevation' | 'plan' | 'section' | 'detail';
  
  // 10. Image to 3D
  input3DType: 'single' | 'multi' | 'pano';
  subject3D: 'exterior' | 'interior' | 'object' | 'furniture';
  polyCount: 'low' | 'medium' | 'high';
  imgTo3DConfig: {
    meshQuality: number;
    symmetry: boolean;
    inferHidden: boolean;
  };
  
  // 11. Video
  videoType: 'flythrough' | 'timelapse' | 'reveal' | 'construction' | 'custom';
  videoKeyframes: VideoKeyframe[];
  videoDuration: number;
  videoMotion: {
    pathType: 'orbit' | 'pan' | 'dolly';
    speed: number;
    ease: boolean;
    lookAt: 'center' | 'cursor' | 'path';
  };
  videoEffects: {
    seasonTransition: boolean;
    timeLapseCloud: boolean;
    lightCycle: boolean;
  };
}

export interface GeometryState {
  lockGeometry: boolean;
  lockPerspective: boolean;
  lockCameraPosition: boolean;
  lockFraming: boolean;
  geometryPreservation: number;
  perspectiveAdherence: number;
  framingAdherence: number;
  edgeDefinition: 'sharp' | 'soft' | 'adaptive';
  edgeStrength: number;
  allowRefinement: boolean;
  suppressHallucinations: boolean;
  allowReinterpretation: boolean;
}

export interface CameraState {
  fovMode: 'narrow' | 'normal' | 'wide' | 'ultra-wide' | 'custom';
  viewType: 'eye-level' | 'aerial' | 'drone' | 'worm' | 'custom';
  projection: 'perspective' | 'axonometric' | 'isometric' | 'two-point';
  depthOfField: boolean;
  dofStrength: number;
  horizonLock: boolean;
  verticalCorrection: boolean;
}

export interface LightingState {
  timeOfDay: 'morning' | 'midday' | 'afternoon' | 'golden-hour' | 'blue-hour' | 'night' | 'overcast';
  sunAzimuth: number;
  sunAltitude: number;
  shadowSoftness: number;
  shadowIntensity: number;
  fog: boolean;
  weather: 'clear' | 'cloudy' | 'rain' | 'snow';
}

export interface MaterialState {
  textureSharpness: number;
  agingLevel: number;
  concreteEmphasis: number;
  glassEmphasis: number;
  woodEmphasis: number;
  metalEmphasis: number;
  reflectivityBias: number;
}

export interface ContextState {
  people: boolean;
  peopleDensity: 'sparse' | 'moderate' | 'busy';
  vegetation: boolean;
  season: 'spring' | 'summer' | 'autumn' | 'winter';
  vehicles: boolean;
  urbanFurniture: boolean;
  scaleCheck: boolean;
}

export interface OutputState {
  resolution: '2k' | '4k' | '8k';
  aspectRatio: '1:1' | '16:9' | '4:5' | '9:16';
  format: 'png' | 'jpg';
  seed: number;
  seedLocked: boolean;
}

export interface AppState {
  mode: GenerationMode;
  activeStyleId: string;
  uploadedImage: string | null;
  isGenerating: boolean;
  progress: number;
  prompt: string;
  
  workflow: WorkflowSettings;
  
  geometry: GeometryState;
  camera: CameraState;
  lighting: LightingState;
  materials: MaterialState;
  context: ContextState;
  output: OutputState;

  leftSidebarWidth: number;
  rightPanelWidth: number;
  bottomPanelHeight: number;
  bottomPanelCollapsed: boolean;
  activeRightTab: string;
  activeBottomTab: string;
}

export type Action = 
  | { type: 'SET_MODE'; payload: GenerationMode }
  | { type: 'SET_STYLE'; payload: string }
  | { type: 'SET_IMAGE'; payload: string | null }
  | { type: 'SET_GENERATING'; payload: boolean }
  | { type: 'SET_PROGRESS'; payload: number }
  | { type: 'UPDATE_WORKFLOW'; payload: Partial<WorkflowSettings> }
  | { type: 'UPDATE_GEOMETRY'; payload: Partial<GeometryState> }
  | { type: 'UPDATE_CAMERA'; payload: Partial<CameraState> }
  | { type: 'UPDATE_LIGHTING'; payload: Partial<LightingState> }
  | { type: 'UPDATE_MATERIALS'; payload: Partial<MaterialState> }
  | { type: 'UPDATE_CONTEXT'; payload: Partial<ContextState> }
  | { type: 'UPDATE_OUTPUT'; payload: Partial<OutputState> }
  | { type: 'SET_ACTIVE_TAB'; payload: string }
  | { type: 'SET_ACTIVE_BOTTOM_TAB'; payload: string }
  | { type: 'TOGGLE_BOTTOM_PANEL' };