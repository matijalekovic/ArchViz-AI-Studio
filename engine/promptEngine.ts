import { AppState, StyleConfiguration } from '../types';

export const BUILT_IN_STYLES: StyleConfiguration[] = [
  {
    id: 'contemporary-minimalist',
    name: 'Contemporary Minimalist',
    category: 'Residential',
    description: 'Clean lines, neutral palettes, emphasis on light and space',
    previewUrl: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    promptBundle: {
      architectureVocabulary: ['clean lines', 'minimal ornamentation', 'open plan', 'floating planes'],
      materialBias: {
        primary: ['white plaster', 'floor-to-ceiling glass', 'polished concrete'],
        secondary: ['warm oak accents', 'matte black steel'],
        avoid: ['ornate details', 'clutter']
      },
      lightingBias: {
        preferred: ['soft natural light', 'diffused daylight'],
        avoid: ['harsh direct sun']
      },
      cameraBias: { preferredAngles: ['eye-level'], preferredFraming: ['rule of thirds'] },
      renderingLanguage: { quality: ['photorealistic', 'archviz'], atmosphere: ['serene', 'sophisticated'], detail: ['crisp edges'] }
    }
  },
  {
    id: 'brutalist',
    name: 'Neo-Brutalist',
    category: 'Cultural',
    description: 'Raw concrete, massive forms, honest materiality',
    previewUrl: 'linear-gradient(135deg, #434343 0%, #000000 100%)',
    promptBundle: {
      architectureVocabulary: ['massive forms', 'monolithic', 'geometric', 'raw materiality'],
      materialBias: {
        primary: ['exposed concrete', 'raw timber'],
        secondary: ['weathered steel', 'glass'],
        avoid: ['polished surfaces', 'delicate details']
      },
      lightingBias: {
        preferred: ['dramatic shadows', 'contrast'],
        avoid: ['flat lighting']
      },
      cameraBias: { preferredAngles: ['low angle'], preferredFraming: ['monumental'] },
      renderingLanguage: { quality: ['cinematic'], atmosphere: ['imposing', 'atmospheric'], detail: ['concrete texture'] }
    }
  },
  {
    id: 'parametric',
    name: 'Parametric Fluidity',
    category: 'Conceptual',
    description: 'Organic forms, flowing geometries, computational aesthetics',
    previewUrl: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
    promptBundle: {
      architectureVocabulary: ['organic curves', 'parametric facade', 'flowing geometry', 'biomimetic'],
      materialBias: {
        primary: ['white corian', 'curved glass'],
        secondary: ['perforated metal', 'fiber composites'],
        avoid: ['rectilinear', 'brick']
      },
      lightingBias: {
        preferred: ['soft gradients', 'ambient glow'],
        avoid: ['hard shadows']
      },
      cameraBias: { preferredAngles: ['aerial', 'dynamic'], preferredFraming: ['fluid'] },
      renderingLanguage: { quality: ['high-end render', 'unreal engine 5'], atmosphere: ['futuristic', 'ethereal'], detail: ['smooth surfaces'] }
    }
  },
  {
    id: 'vernacular',
    name: 'Modern Vernacular',
    category: 'Residential',
    description: 'Local materials, traditional forms, modern interpretation',
    previewUrl: 'linear-gradient(135deg, #e6b980 0%, #eacda3 100%)',
    promptBundle: {
      architectureVocabulary: ['gabled roof', 'local adaptation', 'warm tones', 'tactile'],
      materialBias: {
        primary: ['brick', 'stone', 'wood siding'],
        secondary: ['copper', 'slate'],
        avoid: ['high-tech', 'plastic']
      },
      lightingBias: {
        preferred: ['golden hour', 'warm interior glow'],
        avoid: ['cool blue tones']
      },
      cameraBias: { preferredAngles: ['eye-level'], preferredFraming: ['contextual'] },
      renderingLanguage: { quality: ['architectural photography'], atmosphere: ['inviting', 'cozy'], detail: ['material richness'] }
    }
  }
];

export function generatePrompt(state: AppState): string {
  const style = BUILT_IN_STYLES.find(s => s.id === state.activeStyleId) || BUILT_IN_STYLES[0];
  const { geometry, camera, lighting, materials, context } = state;

  const parts: string[] = [];

  // 1. Subject & Style (Weighted by Mode)
  const vocab = style.promptBundle.architectureVocabulary.join(', ');
  parts.push(`Architecture featuring ${vocab}`);
  parts.push(`Materials: ${style.promptBundle.materialBias.primary.join(', ')}`);
  
  // 2. Geometry & Structure Block
  if (geometry.lockGeometry) {
    parts.push('(preserve exact geometry:1.2)', 'maintain architectural forms');
  } else {
    parts.push('creative geometric interpretation');
  }
  
  if (geometry.suppressHallucinations) parts.push('(suppress additional buildings:1.3)', '(no hallucinated structures:1.2)');
  if (geometry.edgeDefinition === 'sharp') parts.push('crisp defined edges');
  if (geometry.edgeDefinition === 'soft') parts.push('soft diffuse edges');

  // 3. Camera Block
  parts.push(`${camera.viewType} view`);
  parts.push(`${camera.projection} projection`);
  if (camera.fovMode === 'wide') parts.push('wide angle lens, expanded perspective');
  if (camera.depthOfField) parts.push('shallow depth of field, bokeh');
  if (camera.horizonLock) parts.push('level horizon');

  // 4. Lighting & Atmosphere Block
  parts.push(`${lighting.timeOfDay} lighting`);
  if (lighting.weather !== 'clear') parts.push(`${lighting.weather} weather conditions`);
  if (lighting.fog) parts.push('atmospheric fog, mist');
  parts.push(`Sun azimuth ${lighting.sunAzimuth}, altitude ${lighting.sunAltitude}`);
  parts.push(style.promptBundle.lightingBias.preferred.join(', '));

  // 5. Material Emphasis
  if (materials.concreteEmphasis > 50) parts.push(`(concrete texture emphasis:${(materials.concreteEmphasis/50).toFixed(1)})`);
  if (materials.woodEmphasis > 50) parts.push(`(wood grain emphasis:${(materials.woodEmphasis/50).toFixed(1)})`);
  if (materials.glassEmphasis > 50) parts.push(`(glass reflection emphasis:${(materials.glassEmphasis/50).toFixed(1)})`);

  // 6. Context & Population
  if (context.people) {
    parts.push(`populated scene, ${context.peopleDensity} people density`);
    if (context.scaleCheck) parts.push('(accurate human scale:1.2)');
  } else {
    parts.push('no people');
  }
  
  if (context.vegetation) parts.push(`${context.season} vegetation`, 'trees and plants');
  if (context.vehicles) parts.push('vehicles present');
  if (context.urbanFurniture) parts.push('urban furniture, street elements');

  // 7. Rendering Quality
  parts.push(style.promptBundle.renderingLanguage.quality.join(', '));
  parts.push(style.promptBundle.renderingLanguage.atmosphere.join(', '));
  parts.push('8k resolution, highly detailed, architectural visualization');

  return parts.join(', ');
}
