import React from 'react';
import { X, ArrowRight, RefreshCcw, Film, Quote, Box } from 'lucide-react';
import { Challenge, Team } from '../types';

interface ResultsModalProps {
  challenge: Challenge;
  team: Team;
  onClose: () => void;
  onNextTeam: () => void;
  onNewRoll: () => void;
}

export function ResultsModal({ challenge, team, onClose, onNextTeam, onNewRoll }: ResultsModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="glass-morphism rounded-xl max-w-2xl w-full p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-emerald-400 hover:text-emerald-300"
        >
          <X className="w-6 h-6" />
        </button>
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-emerald-100 mb-2">Challenge Assigned!</h2>
          <p className="text-emerald-300 text-lg">Team: {team.name}</p>
        </div>

        <div className="space-y-6 mb-8">
          <div className="flex items-center gap-3 bg-emerald-900/30 p-4 rounded-lg">
            <Film className="w-6 h-6 text-emerald-400 flex-shrink-0" />
            <div>
              <p className="text-emerald-300 text-sm">Genre</p>
              <p className="text-emerald-100 text-lg">{challenge.genre}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-emerald-900/30 p-4 rounded-lg">
            <Quote className="w-6 h-6 text-emerald-400 flex-shrink-0" />
            <div>
              <p className="text-emerald-300 text-sm">Quote</p>
              <p className="text-emerald-100 text-lg">"{challenge.quote}"</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-emerald-900/30 p-4 rounded-lg">
            <Box className="w-6 h-6 text-emerald-400 flex-shrink-0" />
            <div>
              <p className="text-emerald-300 text-sm">Prop</p>
              <p className="text-emerald-100 text-lg">{challenge.prop}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={onNextTeam}
            className="flex-1 flex items-center justify-center gap-2 bg-emerald-600/80 text-emerald-100 py-3 px-6 rounded-lg hover:bg-emerald-700/80 transition-colors"
          >
            <ArrowRight className="w-5 h-5" />
            Next Team
          </button>
          <button
            onClick={onNewRoll}
            className="flex-1 flex items-center justify-center gap-2 bg-emerald-900/80 text-emerald-100 py-3 px-6 rounded-lg hover:bg-emerald-800/80 transition-colors"
          >
            <RefreshCcw className="w-5 h-5" />
            New Roll
          </button>
        </div>
      </div>
    </div>
  );
}