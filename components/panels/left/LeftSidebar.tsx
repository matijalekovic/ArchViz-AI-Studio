import React from 'react';
import { useAppStore } from '../../../store';
import { BUILT_IN_STYLES } from '../../../engine/promptEngine';
import { 
  Palette, FileCode, Map, Eraser, Layers, RectangleVertical, 
  Pencil, Maximize, PenTool, Cuboid, Video, Search, Plus, 
  MousePointer, Paintbrush, Stamp, Crop, Sparkles, Trash2, Eye, EyeOff,
  Wand2
} from 'lucide-react';
import { cn } from '../../../lib/utils';
import { GenerationMode, StyleConfiguration } from '../../../types';
import { Slider } from '../../ui/Slider';
import { Toggle } from '../../ui/Toggle';
import { SegmentedControl } from '../../ui/SegmentedControl';

// --- Workflow Definitions ---
const WORKFLOWS: { id: GenerationMode; label: string; icon: React.ElementType }