import React from 'react';
import { Users, Plus } from 'lucide-react';
import { Team } from '../types';
import { TeamCard } from './TeamCard';
import { EmptyTeams } from './EmptyTeams';

interface TeamManagementProps {
  teams: Team[];
  onTeamsChange: (teams: Team[]) => void;
  selectedTeamId: number | null;
  onSelectTeam: (teamId: number) => void;
}

export function TeamManagement({ 
  teams, 
  onTeamsChange,
  selectedTeamId,
  onSelectTeam
}: TeamManagementProps) {
  const handleAddTeam = () => {
    const newTeam: Team = {
      id: Date.now(),
      name: 'New Team',
      members: [],
    };
    onTeamsChange([...teams, newTeam]);
  };

  return (
    <div className="glass-morphism rounded-xl p-4 sm:p-6 mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-emerald-400" />
          <h2 className="text-xl font-bold text-white">Teams</h2>
        </div>
        {teams.length > 0 && (
          <button
            onClick={handleAddTeam}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600/80 text-emerald-100 rounded-lg hover:bg-emerald-700/80 transition-colors w-full sm:w-auto"
          >
            <Plus className="w-4 h-4" />
            Add Team
          </button>
        )}
      </div>

      {teams.length === 0 ? (
        <EmptyTeams onAddTeam={handleAddTeam} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {teams.map((team) => (
            <TeamCard
              key={team.id}
              team={team}
              isSelected={team.id === selectedTeamId}
              onSelect={() => onSelectTeam(team.id)}
              onUpdate={(updates) => {
                onTeamsChange(
                  teams.map((t) => (t.id === team.id ? { ...t, ...updates } : t))
                );
              }}
              onDelete={() => {
                onTeamsChange(teams.filter((t) => t.id !== team.id));
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}