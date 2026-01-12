import { AppState, StyleConfiguration } from '../types';

export const BUILT_IN_STYLES: StyleConfiguration[] = [
  // --- ARCHITECTURAL STYLES (ORIGINAL SET) ---
  {
    id: 'contemporary-minimalist',
    name: 'Contemporary Minimalist',
    category: 'Residential',
    description: 'Clean lines, neutral palettes, emphasis on light and space',
    previewUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80',
    promptBundle: {
      architectureVocabulary: ['clean lines', 'minimal ornamentation', 'open plan', 'floating planes', 'cubic forms'],
      materialBias: {
        primary: ['white plaster', 'floor-to-ceiling glass', 'polished concrete'],
        secondary: ['warm oak accents', 'matte black steel', 'marble'],
        avoid: ['ornate details', 'clutter', 'heavy textures']
      },
      lightingBias: {
        preferred: ['soft natural light', 'diffused daylight', 'ambient occlusion'],
        avoid: ['harsh direct sun', 'colored lights']
      },
      cameraBias: { preferredAngles: ['eye-level', 'two-point perspective'], preferredFraming: ['rule of thirds', 'balanced'] },
      renderingLanguage: { quality: ['photorealistic', 'archviz', 'unreal engine 5'], atmosphere: ['serene', 'sophisticated', 'airy'], detail: ['crisp edges', 'high fidelity'] }
    }
  },
  {
    id: 'brutalist',
    name: 'Neo-Brutalist',
    category: 'Cultural',
    description: 'Raw concrete, massive forms, honest materiality',
    previewUrl: 'https://images.unsplash.com/photo-1533630764724-5c9a633a6967?auto=format&fit=crop&w=600&q=80',
    promptBundle: {
      architectureVocabulary: ['massive forms', 'monolithic', 'geometric', 'raw materiality', 'heavy volumes'],
      materialBias: {
        primary: ['exposed concrete', 'raw timber', 'beton brut'],
        secondary: ['weathered steel', 'glass', 'rough stone'],
        avoid: ['polished surfaces', 'delicate details', 'paint']
      },
      lightingBias: {
        preferred: ['dramatic shadows', 'contrast', 'volumetric fog'],
        avoid: ['flat lighting', 'overexposed']
      },
      cameraBias: { preferredAngles: ['low angle', 'worm-eye'], preferredFraming: ['monumental', 'imposing'] },
      renderingLanguage: { quality: ['cinematic', '8k'], atmosphere: ['imposing', 'atmospheric', 'moody'], detail: ['concrete texture', 'imperfections'] }
    }
  },
  {
    id: 'parametric',
    name: 'Parametric Fluidity',
    category: 'Conceptual',
    description: 'Organic forms, flowing geometries, computational aesthetics',
    previewUrl: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=600&q=80',
    promptBundle: {
      architectureVocabulary: ['organic curves', 'parametric facade', 'flowing geometry', 'biomimetic', 'voronoi pattern'],
      materialBias: {
        primary: ['white corian', 'curved glass', 'fiberglass'],
        secondary: ['perforated metal', 'fiber composites', 'carbon fiber'],
        avoid: ['rectilinear', 'brick', 'sharp corners']
      },
      lightingBias: {
        preferred: ['soft gradients', 'ambient glow', 'caustics'],
        avoid: ['hard shadows', 'darkness']
      },
      cameraBias: { preferredAngles: ['aerial', 'dynamic', 'curved'], preferredFraming: ['fluid', 'sweeping'] },
      renderingLanguage: { quality: ['high-end render', 'corona render'], atmosphere: ['futuristic', 'ethereal', 'motion'], detail: ['smooth surfaces', 'seamless'] }
    }
  },
  {
    id: 'vernacular',
    name: 'Modern Vernacular',
    category: 'Residential',
    description: 'Local materials, traditional forms, modern interpretation',
    previewUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80',
    promptBundle: {
      architectureVocabulary: ['gabled roof', 'local adaptation', 'warm tones', 'tactile', 'pitched roof'],
      materialBias: {
        primary: ['brick', 'stone', 'wood siding'],
        secondary: ['copper', 'slate', 'clay tiles'],
        avoid: ['high-tech', 'plastic', 'chrome']
      },
      lightingBias: {
        preferred: ['golden hour', 'warm interior glow', 'dappled light'],
        avoid: ['cool blue tones', 'neon']
      },
      cameraBias: { preferredAngles: ['eye-level', 'approachable'], preferredFraming: ['contextual', 'landscaped'] },
      renderingLanguage: { quality: ['architectural photography'], atmosphere: ['inviting', 'cozy', 'homely'], detail: ['material richness', 'texture'] }
    }
  },
  {
    id: 'scandinavian',
    name: 'Scandinavian',
    category: 'Residential',
    description: 'Hygge, light woods, functional simplicity, cozy',
    previewUrl: 'https://images.unsplash.com/photo-1595515106967-14348984f548?auto=format&fit=crop&w=600&q=80',
    promptBundle: {
      architectureVocabulary: ['simple forms', 'functionalism', 'hygge', 'connection to nature'],
      materialBias: {
        primary: ['pine wood', 'white walls', 'light timber'],
        secondary: ['wool', 'linen', 'glass'],
        avoid: ['dark heavy woods', 'baroque', 'clutter']
      },
      lightingBias: {
        preferred: ['diffused north light', 'bright interiors'],
        avoid: ['dark corners']
      },
      cameraBias: { preferredAngles: ['interior', 'eye-level'], preferredFraming: ['intimate'] },
      renderingLanguage: { quality: ['magazine style'], atmosphere: ['cozy', 'clean', 'bright'], detail: ['soft textures'] }
    }
  },
  {
    id: 'industrial-loft',
    name: 'Industrial Loft',
    category: 'Commercial',
    description: 'Exposed structure, brick, metal, repurposed spaces',
    previewUrl: 'https://images.unsplash.com/photo-1623631484762-b9b53239a3f2?auto=format&fit=crop&w=600&q=80',
    promptBundle: {
      architectureVocabulary: ['adaptive reuse', 'open ceilings', 'large windows', 'structural honesty'],
      materialBias: {
        primary: ['exposed brick', 'steel beams', 'polished concrete'],
        secondary: ['ductwork', 'distressed leather', 'black metal'],
        avoid: ['plaster', 'carpet', 'pastels']
      },
      lightingBias: {
        preferred: ['large daylighting', 'edison bulbs'],
        avoid: ['clinical light']
      },
      cameraBias: { preferredAngles: ['wide angle'], preferredFraming: ['spacious'] },
      renderingLanguage: { quality: ['photorealistic'], atmosphere: ['urban', 'raw', 'gritty'], detail: ['rust', 'patina'] }
    }
  },
  {
    id: 'biophilic',
    name: 'Biophilic Design',
    category: 'Sustainable',
    description: 'Integration of nature, living walls, natural light',
    previewUrl: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=600&q=80',
    promptBundle: {
      architectureVocabulary: ['vertical gardens', 'indoor-outdoor flow', 'organic patterns', 'nature integration'],
      materialBias: {
        primary: ['living walls', 'natural wood', 'stone'],
        secondary: ['water features', 'bamboo', 'glass'],
        avoid: ['synthetic materials', 'sterile surfaces']
      },
      lightingBias: {
        preferred: ['dappled sunlight', 'skylights'],
        avoid: ['artificial glare']
      },
      cameraBias: { preferredAngles: ['eye-level'], preferredFraming: ['immersed in green'] },
      renderingLanguage: { quality: ['vibrant'], atmosphere: ['lush', 'restorative', 'fresh'], detail: ['foliage', 'organic textures'] }
    }
  },
  {
    id: 'mid-century',
    name: 'Mid-Century Modern',
    category: 'Residential',
    description: 'Retro-futurism, organic curves, contrasting textures',
    previewUrl: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=600&q=80',
    promptBundle: {
      architectureVocabulary: ['cantilevered', 'flat planes', 'integration with landscape', 'retro aesthetic'],
      materialBias: {
        primary: ['teak', 'glass', 'stone fireplace'],
        secondary: ['brass', 'terrazzo', 'pops of color'],
        avoid: ['ornamentation', 'clutter']
      },
      lightingBias: {
        preferred: ['warm sunlight', 'globe lights'],
        avoid: ['cool LEDs']
      },
      cameraBias: { preferredAngles: ['eye-level', 'low angle'], preferredFraming: ['horizontal'] },
      renderingLanguage: { quality: ['cinematic', 'vintage feel'], atmosphere: ['nostalgic', 'stylish'], detail: ['wood grain'] }
    }
  },
  {
    id: 'japanese-zen',
    name: 'Japanese Zen',
    category: 'Cultural',
    description: 'Minimalism, natural materials, shadow and light, serenity',
    previewUrl: 'https://images.unsplash.com/photo-1522771759335-5028489708b7?auto=format&fit=crop&w=600&q=80',
    promptBundle: {
      architectureVocabulary: ['engawa', 'shoji screens', 'minimalist', 'connection to garden'],
      materialBias: {
        primary: ['hinoki wood', 'tatami', 'plaster'],
        secondary: ['river stones', 'paper', 'bamboo'],
        avoid: ['clutter', 'bright plastic']
      },
      lightingBias: {
        preferred: ['diffused soft light', 'shadow play'],
        avoid: ['direct harsh light']
      },
      cameraBias: { preferredAngles: ['low angle', 'interior'], preferredFraming: ['framed views', 'asymmetry'] },
      renderingLanguage: { quality: ['photorealistic'], atmosphere: ['peaceful', 'meditative', 'quiet'], detail: ['texture focus'] }
    }
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    category: 'Conceptual',
    description: 'High-tech low-life, neon, dystopian, metallic',
    previewUrl: 'https://images.unsplash.com/photo-1515630278258-407f66498911?auto=format&fit=crop&w=600&q=80',
    promptBundle: {
      architectureVocabulary: ['megastructure', 'dense urban', 'high-tech', 'dystopian'],
      materialBias: {
        primary: ['metal', 'glass', 'concrete'],
        secondary: ['holograms', 'wires', 'neon signs'],
        avoid: ['wood', 'nature', 'clean']
      },
      lightingBias: {
        preferred: ['neon pink', 'cyan glow', 'rain reflections'],
        avoid: ['daylight', 'warm white']
      },
      cameraBias: { preferredAngles: ['aerial', 'street level'], preferredFraming: ['crowded', 'vertical'] },
      renderingLanguage: { quality: ['digital art', 'octane render'], atmosphere: ['dark', 'gritty', 'electric'], detail: ['rain', 'reflections'] }
    }
  },
  {
    id: 'bauhaus',
    name: 'Bauhaus',
    category: 'Cultural',
    description: 'Form follows function, primary colors, simple geometry',
    previewUrl: 'https://images.unsplash.com/photo-1589923188900-85dae5233271?auto=format&fit=crop&w=600&q=80',
    promptBundle: {
      architectureVocabulary: ['geometric', 'functionalism', 'asymmetry', 'industrial'],
      materialBias: {
        primary: ['white stucco', 'steel', 'glass'],
        secondary: ['primary color accents', 'concrete'],
        avoid: ['decoration', 'ornament']
      },
      lightingBias: {
        preferred: ['clear daylight', 'studio lighting'],
        avoid: ['moody']
      },
      cameraBias: { preferredAngles: ['axonometric', 'front'], preferredFraming: ['balanced'] },
      renderingLanguage: { quality: ['clean'], atmosphere: ['rational', 'modern'], detail: ['sharp lines'] }
    }
  },
  {
    id: 'tropical-modern',
    name: 'Tropical Modernism',
    category: 'Residential',
    description: 'Open air, overhangs, concrete and wood, lush context',
    previewUrl: 'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?auto=format&fit=crop&w=600&q=80',
    promptBundle: {
      architectureVocabulary: ['large overhangs', 'passive ventilation', 'open spaces', 'breeze blocks'],
      materialBias: {
        primary: ['concrete', 'tropical hardwood', 'stone'],
        secondary: ['water', 'vegetation'],
        avoid: ['glass curtain wall', 'insulation']
      },
      lightingBias: {
        preferred: ['bright sun', 'deep shade'],
        avoid: ['overcast']
      },
      cameraBias: { preferredAngles: ['eye-level'], preferredFraming: ['surrounded by nature'] },
      renderingLanguage: { quality: ['vivid'], atmosphere: ['humid', 'lush', 'relaxed'], detail: ['foliage shadows'] }
    }
  },
  {
    id: 'alpine-chalet',
    name: 'Alpine Chalet',
    category: 'Residential',
    description: 'Modern mountain home, snow, timber, warmth',
    previewUrl: 'https://images.unsplash.com/photo-1518732679287-35359b32975e?auto=format&fit=crop&w=600&q=80',
    promptBundle: {
      architectureVocabulary: ['steep roof', 'panoramic windows', 'mountain retreat'],
      materialBias: {
        primary: ['timber cladding', 'slate', 'stone base'],
        secondary: ['glass', 'fur', 'fire'],
        avoid: ['concrete block', 'palm trees']
      },
      lightingBias: {
        preferred: ['warm interior light', 'blue hour snow'],
        avoid: ['green cast']
      },
      cameraBias: { preferredAngles: ['exterior'], preferredFraming: ['landscape context'] },
      renderingLanguage: { quality: ['crisp'], atmosphere: ['cold outside warm inside', 'majestic'], detail: ['snow texture'] }
    }
  },
  {
    id: 'desert-modern',
    name: 'Desert Modernism',
    category: 'Residential',
    description: 'Blending with arid landscape, earth tones, horizontal lines',
    previewUrl: 'https://images.unsplash.com/photo-1523677462372-748980892095?auto=format&fit=crop&w=600&q=80',
    promptBundle: {
      architectureVocabulary: ['horizontal planes', 'earth shelter', 'arid landscape', 'shadow patterns'],
      materialBias: {
        primary: ['rammed earth', 'corten steel', 'sandstone'],
        secondary: ['glass', 'succulents'],
        avoid: ['green grass', 'white plastic']
      },
      lightingBias: {
        preferred: ['hard sunlight', 'long shadows'],
        avoid: ['diffused mist']
      },
      cameraBias: { preferredAngles: ['eye-level'], preferredFraming: ['wide landscape'] },
      renderingLanguage: { quality: ['high contrast'], atmosphere: ['dry', 'hot', 'silent'], detail: ['sand grains', 'heat haze'] }
    }
  }
];

export function generatePrompt(state: AppState): string {
  const { workflow, activeStyleId, lighting, context, materials, camera } = state;
  
  // If user provided a specific text prompt in text-to-image mode or visual edit, prioritize it or combine it.
  if (state.mode === 'generate-text' && workflow.textPrompt) {
     return workflow.textPrompt;
  }
  
  if (state.mode === 'visual-edit' && workflow.visualPrompt) {
     return workflow.visualPrompt;
  }

  // Find active style
  const style = BUILT_IN_STYLES.find(s => s.id === activeStyleId);
  
  let promptParts: string[] = [];

  // 1. Base Prompt / Subject
  if (state.prompt) {
    promptParts.push(state.prompt);
  } else if (style) {
    promptParts.push(`A ${style.name.toLowerCase()} architectural rendering`);
  } else {
    promptParts.push('Architectural rendering');
  }

  // 2. Style Specifics
  if (style) {
    const { architectureVocabulary, materialBias } = style.promptBundle;
    promptParts.push(`Architecture: ${architectureVocabulary.slice(0, 3).join(', ')}.`);
    promptParts.push(`Materials: ${materialBias.primary.join(', ')} and ${materialBias.secondary.slice(0, 2).join(', ')}.`);
  }

  // 3. Lighting
  promptParts.push(`Lighting: ${lighting.timeOfDay}, ${lighting.weather}, ${lighting.cloudType} sky.`);

  // 4. Context
  if (context.vegetation) {
    promptParts.push(`Surroundings: ${context.vegetationDensity > 50 ? 'dense' : 'sparse'} ${context.season} vegetation.`);
  }
  if (context.people) {
    promptParts.push('Includes people.');
  }

  // 5. Camera/Technical
  promptParts.push(`View: ${camera.viewType}, ${camera.projection} projection.`);
  promptParts.push('High quality, photorealistic, 8k.');

  // Manual Adjustments from Workflow (e.g. materials emphasis)
  if (materials.concreteEmphasis > 70) promptParts.push('emphasizing concrete textures');
  
  return promptParts.join(' ');
}
