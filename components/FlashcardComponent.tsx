
import React, { useState } from 'react';

export interface FlashcardStyles {
  theme: 'indigo' | 'rose' | 'emerald' | 'amber' | 'slate';
  fontFamily: 'sans' | 'serif' | 'mono';
  textAlign: 'left' | 'center' | 'right';
  size: 'sm' | 'md' | 'lg';
}

interface FlashcardProps {
  front: string;
  back: string;
  styles: FlashcardStyles;
}

const FlashcardComponent: React.FC<FlashcardProps> = ({ front, back, styles }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const themeClasses = {
    indigo: { front: 'bg-white border-indigo-100 text-slate-800', back: 'bg-indigo-600 text-white', accent: 'text-indigo-400', label: 'text-indigo-200' },
    rose: { front: 'bg-white border-rose-100 text-slate-800', back: 'bg-rose-500 text-white', accent: 'text-rose-400', label: 'text-rose-100' },
    emerald: { front: 'bg-white border-emerald-100 text-slate-800', back: 'bg-emerald-600 text-white', accent: 'text-emerald-400', label: 'text-emerald-100' },
    amber: { front: 'bg-white border-amber-100 text-slate-800', back: 'bg-amber-500 text-white', accent: 'text-amber-400', label: 'text-amber-100' },
    slate: { front: 'bg-slate-800 border-slate-700 text-white', back: 'bg-slate-900 text-indigo-400', accent: 'text-slate-400', label: 'text-slate-500' },
  };

  const fontClasses = {
    sans: 'font-sans',
    serif: 'font-serif',
    mono: 'font-mono',
  };

  const alignClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  };

  const sizeClasses = {
    sm: 'h-64',
    md: 'h-80',
    lg: 'h-[28rem]',
  };

  const currentTheme = themeClasses[styles.theme];

  return (
    <div 
      className={`relative w-full ${sizeClasses[styles.size]} perspective-1000 cursor-pointer group select-none`}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
        {/* Front side */}
        <div className={`absolute w-full h-full backface-hidden ${currentTheme.front} border-2 rounded-[2.5rem] shadow-2xl flex flex-col justify-center p-10 transition-all duration-300 ${alignClasses[styles.textAlign]} ${fontClasses[styles.fontFamily]}`}>
          <div className="absolute top-8 left-10 right-10 flex justify-between items-center opacity-60">
             <span className={`text-[10px] font-black uppercase tracking-widest ${currentTheme.accent}`}>Mặt trước</span>
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
          <h3 className={`${styles.size === 'lg' ? 'text-4xl' : styles.size === 'md' ? 'text-3xl' : 'text-xl'} font-black leading-tight mb-4`}>
            {front}
          </h3>
          <p className={`mt-4 text-sm font-bold opacity-30 group-hover:opacity-60 transition-opacity animate-bounce`}>Chạm để lật thẻ</p>
        </div>
        
        {/* Back side */}
        <div className={`absolute w-full h-full backface-hidden ${currentTheme.back} rounded-[2.5rem] shadow-2xl flex flex-col justify-center p-10 rotate-y-180 transition-all duration-300 ${alignClasses[styles.textAlign]} ${fontClasses[styles.fontFamily]}`}>
          <div className="absolute top-8 left-10 right-10 flex justify-between items-center opacity-40">
             <span className={`text-[10px] font-black uppercase tracking-widest ${currentTheme.label}`}>Giải đáp</span>
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
          </div>
          <div className={`${styles.size === 'lg' ? 'text-2xl' : 'text-xl'} font-medium leading-relaxed overflow-y-auto max-h-[70%] scrollbar-hide`}>
            {back}
          </div>
        </div>
      </div>
      
      <style>{`
        .perspective-1000 { perspective: 1200px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default FlashcardComponent;
