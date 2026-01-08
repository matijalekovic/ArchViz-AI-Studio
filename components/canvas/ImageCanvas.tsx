import React, { useRef, useState } from 'react';
import { useAppStore } from '../../../store';
import { UploadCloud, Image as ImageIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

export const ImageCanvas: React.FC = () => {
  const { state, dispatch } = useAppStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        dispatch({ type: 'SET_IMAGE', payload: ev.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
       const reader = new FileReader();
      reader.onload = (ev) => {
        dispatch({ type: 'SET_IMAGE', payload: ev.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex-1 bg-[#E5E5E5] relative overflow-hidden flex items-center justify-center p-8 bg-checkerboard">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 opacity-[0.03]" 
           style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }} 
      />

      {state.uploadedImage ? (
        <div className="relative shadow-2xl max-h-full max-w-full group">
          <img src={state.uploadedImage} alt="Upload" className="max-h-[calc(100vh-250px)] max-w-full object-contain rounded-sm" />
          
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={() => dispatch({ type: 'SET_IMAGE', payload: null })}
              className="bg-black/50 text-white px-3 py-1.5 rounded-md text-xs backdrop-blur-sm hover:bg-black/70"
            >
              Clear Image
            </button>
          </div>
        </div>
      ) : (
        <div 
          className={cn(
            "w-[400px] h-[300px] border-2 border-dashed rounded-xl flex flex-col items-center justify-center gap-4 transition-all cursor-pointer bg-surface-elevated/50 backdrop-blur-sm",
            isDragging ? "border-accent bg-accent/5" : "border-border-strong hover:border-foreground/30"
          )}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
          <div className="w-16 h-16 rounded-full bg-surface-sunken flex items-center justify-center">
            <UploadCloud className="text-foreground-muted" size={32} />
          </div>
          <div className="text-center space-y-1">
            <p className="font-medium text-foreground">Click or drop image</p>
            <p className="text-xs text-foreground-muted">Support for PNG, JPG (Max 50MB)</p>
          </div>
        </div>
      )}
    </div>
  );
};
