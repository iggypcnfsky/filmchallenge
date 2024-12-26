import React from 'react';
import { Film, Quote, Box, Clock, Users } from 'lucide-react';
import { Challenge } from '../types';

interface RollHistoryProps {
  challenges: Challenge[];
  teams: { id: number; name: string }[];
}

export function RollHistory({ challenges, teams }: RollHistoryProps) {
  if (challenges.length === 0) return null;

  return (
    <div className="mt-8">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-5 h-5 text-emerald-400" />
        <h3 className="text-lg font-bold text-emerald-100">Previous Challenges</h3>
      </div>
      <div className="space-y-4">
        {challenges.slice(0, 3).map((challenge) => {
          const team = teams.find(t => t.id === challenge.teamId);
          
          return (
            <div key={challenge.timestamp} className="glass-morphism rounded-lg p-4 text-sm">
              {team && (
                <div className="flex items-center gap-2 text-emerald-300 mb-3">
                  <Users className="w-4 h-4" />
                  <span className="font-medium">{team.name}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-emerald-300 mb-2">
                <Film className="w-4 h-4" />
                <span>{challenge.genre}</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-300 mb-2">
                <Quote className="w-4 h-4" />
                <span className="line-clamp-2">"{challenge.quote}"</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-300">
                <Box className="w-4 h-4" />
                <span>{challenge.prop}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}