import React, { createContext, useContext, useReducer, useEffect, PropsWithChildren } from 'react';
import { AppState, Action, GeometryState, CameraState, LightingState, MaterialState, ContextState, OutputState, WorkflowSettings } from './types';
import { generatePrompt } from './engine/promptEngine';

const initialWorkflow: WorkflowSettings = {
  // 1. 3D Render
  renderMode: 'enhance',
  
  // 2. CAD
  drawingType: 'plan',
  cadScale: '1:100',
  cadStyle: 'realistic',
  cadInterpretation: {
    recognizeRooms: true,
    recognizeOpenings: true,
    ceilingHeight: 2.8,
    sillHeight: 0.9,
    furnishingLevel: 'partial'
  },
  
  // 3. Masterplan
  layoutType: 'site',
  mpScale: '1:500',
  mpInterpretation: {
    zoneColorCoding: true,
    areaCalculation: true,
    roadHierarchy: false,
  },
  mpBuildings: {
    massStyle: 'White Box',
    heightVariation: 40,
    roofDetail: 20,
    shadowStudy: false,
  },
  legendItems: [
    { id: '1', zone: 'Residential', color: '#FEF08A', area: '12,400 m²' },
    { id: '2', zone: 'Commercial', color: '#FCA5A5', area: '4,500 m²' },
    { id: '3', zone: 'Green Space', color: '#86EFAC', area: '8,200 m²' },
  ],
  
  // 4. Visual Edit
  activeTool: 'select',
  editOperation: 'texture',
  visualTools: {
    brushSize: 30,
    tolerance: 15,
    aiPrompt: '',
  },
  editAdjustments: {
    exposure: 0,
    contrast: 0,
    saturation: 0,
    temperature: 0,
    tint: 0,
  },
  editStack: [
    { id: '1', name: 'Color Grade', type: 'adjustment', visible: true },
    { id: '2', name: 'Replace Sky', type: 'inpaint', visible: true },
  ],
  
  // 5. Exploded
  explodeType: 'vertical',
  explodedLayers: [
    { id: '1', name: 'Roof', offset: 100, visible: true },
    { id: '2', name: 'Level 2', offset: 60, visible: true },
    { id: '3', name: 'Level 1', offset: 20, visible: true },
    { id: '4', name: 'Foundation', offset: 0, visible: true },
  ],
  explodedSpacing: {
    distance: 50,
    mode: 'uniform',
    connectors: true,
  },
  explodedAnnotation: {
    showLabels: true,
    showLeaders: true,
    showDimensions: false,
    autoAnnotate: false,
  },
  
  // 6. Section
  sectionType: 'building',
  sectionStyle: 'line',
  sectionCutPlane: 50,
  
  // 7. Sketch
  sketchType: 'arch',
  sketchFidelity: 50,
  sketchCleanup: { contrast: true, background: false, straighten: false },
  
  // 8. Upscale
  upscaleFactor: '2x',
  upscaleDenoise: 30,
  upscaleSharpen: 20,
  upscaleEnhance: 50,
  upscaleFlags: {
    faceRestoration: true,
    removeArtifacts: true,
  },
  
  // 9. Image to CAD
  imgToCadOutput: 'plan',
  
  // 10. Image to 3D
  input3DType: 'single',
  subject3D: 'exterior',
  polyCount: 'medium',
  imgTo3DConfig: {
    meshQuality: 75,
    symmetry: false,
    inferHidden: true,
  },
  
  // 11. Video
  videoType: 'flythrough',
  videoDuration: 10,
  videoKeyframes: [
    { id: '1', timestamp: '00:00', thumbnail: '', description: 'Orbit Start' },
    { id: '2', timestamp: '00:04', thumbnail: '', description: 'Pan Entrance' },
    { id: '3', timestamp: '00:10', thumbnail: '', description: 'Zoom End' },
  ],
  videoMotion: {
    pathType: 'orbit',
    speed: 50,
    ease: true,
    lookAt: 'center',
  },
  videoEffects: {
    seasonTransition: false,
    timeLapseCloud: true,
    lightCycle: false,
  }
};

const initialGeometry: GeometryState = {
  lockGeometry: true,
  lockPerspective: true,
  lockCameraPosition: true,
  lockFraming: true,
  geometryPreservation: 80,
  perspectiveAdherence: 80,
  framingAdherence: 80,
  edgeDefinition: 'sharp',
  edgeStrength: 50,
  allowRefinement: true,
  suppressHallucinations: true,
  allowReinterpretation: false,
};

const initialCamera: CameraState = {
  fovMode: 'normal',
  viewType: 'eye-level',
  projection: 'perspective',
  depthOfField: false,
  dofStrength: 30,
  horizonLock: true,
  verticalCorrection: true,
};

const initialLighting: LightingState = {
  timeOfDay: 'morning',
  sunAzimuth: 135,
  sunAltitude: 45,
  shadowSoftness: 20,
  shadowIntensity: 60,
  fog: false,
  weather: 'clear',
};

const initialMaterials: MaterialState = {
  textureSharpness: 50,
  agingLevel: 10,
  concreteEmphasis: 50,
  glassEmphasis: 50,
  woodEmphasis: 50,
  metalEmphasis: 50,
  reflectivityBias: 0,
};

const initialContext: ContextState = {
  people: false,
  peopleDensity: 'sparse',
  vegetation: true,
  season: 'summer',
  vehicles: false,
  urbanFurniture: false,
  scaleCheck: true,
};

const initialOutput: OutputState = {
  resolution: '4k',
  aspectRatio: '16:9',
  format: 'png',
  seed: 123456,
  seedLocked: false,
};

const initialState: AppState = {
  mode: 'render-3d',
  activeStyleId: 'contemporary-minimalist',
  uploadedImage: null,
  isGenerating: false,
  progress: 0,
  prompt: '',
  workflow: initialWorkflow,
  geometry: initialGeometry,
  camera: initialCamera,
  lighting: initialLighting,
  materials: initialMaterials,
  context: initialContext,
  output: initialOutput,
  leftSidebarWidth: 280,
  rightPanelWidth: 320,
  bottomPanelHeight: 200,
  bottomPanelCollapsed: false,
  activeRightTab: 'geometry',
  activeBottomTab: 'prompt',
};

function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_MODE': return { ...state, mode: action.payload, activeRightTab: 'default' };
    case 'SET_STYLE': return { ...state, activeStyleId: action.payload };
    case 'SET_IMAGE': return { ...state, uploadedImage: action.payload };
    case 'SET_GENERATING': return { ...state, isGenerating: action.payload };
    case 'SET_PROGRESS': return { ...state, progress: action.payload };
    case 'UPDATE_WORKFLOW': return { ...state, workflow: { ...state.workflow, ...action.payload } };
    case 'UPDATE_GEOMETRY': return { ...state, geometry: { ...state.geometry, ...action.payload } };
    case 'UPDATE_CAMERA': return { ...state, camera: { ...state.camera, ...action.payload } };
    case 'UPDATE_LIGHTING': return { ...state, lighting: { ...state.lighting, ...action.payload } };
    case 'UPDATE_MATERIALS': return { ...state, materials: { ...state.materials, ...action.payload } };
    case 'UPDATE_CONTEXT': return { ...state, context: { ...state.context, ...action.payload } };
    case 'UPDATE_OUTPUT': return { ...state, output: { ...state.output, ...action.payload } };
    case 'SET_ACTIVE_TAB': return { ...state, activeRightTab: action.payload };
    case 'SET_ACTIVE_BOTTOM_TAB': return { ...state, activeBottomTab: action.payload };
    case 'TOGGLE_BOTTOM_PANEL': return { ...state, bottomPanelCollapsed: !state.bottomPanelCollapsed };
    default: return state;
  }
}

const StoreContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
} | undefined>(undefined);

export function AppProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    const timer = setTimeout(() => {
      generatePrompt(state);
    }, 200);
    return () => clearTimeout(timer);
  }, [
    state.activeStyleId, 
    state.geometry, 
    state.camera, 
    state.lighting, 
    state.materials, 
    state.context, 
    state.mode,
    state.workflow
  ]);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useAppStore() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useAppStore must be used within an AppProvider');
  }
  return context;
}