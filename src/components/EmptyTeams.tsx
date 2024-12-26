import React from 'react';
import { Users, Plus } from 'lucide-react';

interface EmptyTeamsProps {
  onAddTeam: () => void;
}

export function EmptyTeams({ onAddTeam }: EmptyTeamsProps) {
  return (
    <div className="text-center py-8 sm:py-12">
      <Users className="w-12 h-12 text-emerald-400/50 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-emerald-100 mb-2">No Teams Yet</h3>
      <p className="text-emerald-300 mb-6">Create your first team to get started!</p>
      <button
        onClick={onAddTeam}
        className="flex items-center gap-2 px-6 py-3 bg-emerald-600/80 text-emerald-100 rounded-lg hover:bg-emerald-700/80 transition-colors mx-auto"
      >
        <Plus className="w-5 h-5" />
        Add First Team
      </button>
    </div>
  );
}