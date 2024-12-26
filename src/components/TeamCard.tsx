import React, { useState } from 'react';
import { X, Edit2, Save, UserPlus } from 'lucide-react';
import { Team } from '../types';

interface TeamCardProps {
  team: Team;
  isSelected: boolean;
  onSelect: () => void;
  onUpdate: (updates: Partial<Team>) => void;
  onDelete: () => void;
}

export function TeamCard({ team, isSelected, onSelect, onUpdate, onDelete }: TeamCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTeamName, setNewTeamName] = useState('');
  const [newMemberName, setNewMemberName] = useState('');

  const handleAddMember = () => {
    if (!newMemberName.trim()) return;
    onUpdate({
      members: [...team.members, newMemberName.trim()],
    });
    setNewMemberName('');
  };

  const handleRemoveMember = (index: number) => {
    onUpdate({
      members: team.members.filter((_, i) => i !== index),
    });
  };

  return (
    <div 
      onClick={() => !isEditing && onSelect()}
      className={`bg-emerald-900/30 border ${
        isSelected 
          ? 'border-emerald-400/50 ring-2 ring-emerald-400/30' 
          : 'border-emerald-500/20'
      } rounded-lg p-4 cursor-pointer transition-all hover:border-emerald-400/30`}
    >
      <div className="flex items-center justify-between mb-4">
        {isEditing ? (
          <input
            type="text"
            value={newTeamName || team.name}
            onChange={(e) => setNewTeamName(e.target.value)}
            className="bg-emerald-950/50 text-emerald-100 px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
            placeholder="Team Name"
            autoFocus
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <h3 className="text-emerald-400 font-semibold">{team.name}</h3>
        )}
        <div className="flex gap-2">
          {isEditing ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (newTeamName) {
                  onUpdate({ name: newTeamName });
                }
                setIsEditing(false);
                setNewTeamName('');
              }}
              className="text-emerald-400 hover:text-emerald-300"
            >
              <Save className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsEditing(true);
              }}
              className="text-emerald-400 hover:text-emerald-300"
            >
              <Edit2 className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="text-red-400 hover:text-red-300"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <ul className="space-y-2 mb-4 max-h-40 overflow-y-auto">
        {team.members.map((member, index) => (
          <li
            key={index}
            className="flex items-center justify-between text-emerald-100 text-sm"
          >
            <span>{member}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveMember(index);
              }}
              className="text-red-400 hover:text-red-300"
            >
              <X className="w-3 h-3" />
            </button>
          </li>
        ))}
      </ul>

      <form 
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleAddMember();
        }}
        className="flex gap-2"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          type="text"
          value={newMemberName}
          onChange={(e) => setNewMemberName(e.target.value)}
          placeholder="Add member"
          className="flex-1 bg-emerald-950/50 text-emerald-100 px-2 py-1 rounded text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
        />
        <button
          type="submit"
          className="text-emerald-400 hover:text-emerald-300"
        >
          <UserPlus className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}