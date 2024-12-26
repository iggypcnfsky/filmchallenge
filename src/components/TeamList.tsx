import React from 'react';
import { Users, Film, Quote, Box } from 'lucide-react';
import { Team } from '../types';

interface TeamListProps {
  teams: Team[];
  selectedTeamId: number | null;
  onSelectTeam: (teamId: number) => void;
}

export function TeamList({ teams, selectedTeamId, onSelectTeam }: TeamListProps) {
  return (
    <div className="glass-morphism rounded-xl p-6 mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Users className="w-5 h-5 text-emerald-400" />
        <h2 className="text-xl font-bold text-white">Teams</h2>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {teams.map((team) => (
          <button
            key={team.id}
            onClick={() => onSelectTeam(team.id)}
            className={`text-left transition-all ${
              selectedTeamId === team.id
                ? 'bg-emerald-700/40 border-emerald-400/50'
                : 'bg-emerald-900/30 border-emerald-500/20 hover:bg-emerald-800/30'
            } rounded-lg p-4 border`}
          >
            <h3 className="text-emerald-400 font-semibold mb-2">{team.name}</h3>
            <ul className="space-y-1 mb-3">
              {team.members.map((member) => (
                <li key={member} className="text-emerald-100">{member}</li>
              ))}
            </ul>
            {team.currentChallenge && (
              <div className="mt-3 pt-3 border-t border-emerald-500/20 space-y-2">
                <p className="text-sm font-medium text-emerald-300">Current Challenge:</p>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Film className="w-3 h-3 text-emerald-400" />
                    <p className="text-xs text-emerald-200">{team.currentChallenge.genre}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Quote className="w-3 h-3 text-emerald-400" />
                    <p className="text-xs text-emerald-200 line-clamp-1">
                      "{team.currentChallenge.quote}"
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Box className="w-3 h-3 text-emerald-400" />
                    <p className="text-xs text-emerald-200">{team.currentChallenge.prop}</p>
                  </div>
                </div>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}