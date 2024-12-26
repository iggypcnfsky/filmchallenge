import React from 'react';
import { Sparkles, Film, Quote, Box } from 'lucide-react';
import { SlotMachineState } from '../types';

interface RollResultsProps {
  state: SlotMachineState;
  selectedGenre: number | null;
  selectedQuote: number | null;
  selectedProp: number | null;
}

export function RollResults({ state, selectedGenre, selectedQuote, selectedProp }: RollResultsProps) {
  if (!selectedGenre && !selectedQuote && !selectedProp) {
    return null;
  }

  const genre = state.genres.find(g => g.id === selectedGenre);
  const quote = state.quotes.find(q => q.id === selectedQuote);
  const prop = state.props.find(p => p.id === selectedProp);

  return (
    <div className="glass-morphism rounded-xl shadow-2xl p-8">
      <div className="flex items-center justify-center gap-2 mb-6">
        <Sparkles className="w-6 h-6 text-emerald-400" />
        <h2 className="text-2xl font-bold text-emerald-100">Your Film Challenge</h2>
        <Sparkles className="w-6 h-6 text-emerald-400" />
      </div>
      
      <div className="space-y-6 text-center">
        <div className="flex items-center justify-center gap-3">
          <Film className="w-5 h-5 text-emerald-400" />
          <p className="text-lg">
            <span className="font-semibold text-emerald-300">Genre:</span>
            <span className="ml-2 text-emerald-100">{genre?.text}</span>
          </p>
        </div>
        
        <div className="flex items-center justify-center gap-3">
          <Quote className="w-5 h-5 text-emerald-400" />
          <p className="text-lg">
            <span className="font-semibold text-emerald-300">Quote:</span>
            <span className="ml-2 text-emerald-100">"{quote?.text}"</span>
          </p>
        </div>
        
        <div className="flex items-center justify-center gap-3">
          <Box className="w-5 h-5 text-emerald-400" />
          <p className="text-lg">
            <span className="font-semibold text-emerald-300">Prop:</span>
            <span className="ml-2 text-emerald-100">{prop?.text}</span>
          </p>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-sm text-emerald-400 font-medium">
          Time to bring this story to life! 🎬✨
        </p>
      </div>
    </div>
  );
}