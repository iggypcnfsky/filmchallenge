import React from 'react';
import { Plus, Sparkle } from 'lucide-react';
import { SlotItem } from '../types';

interface SlotMachineProps {
  items: SlotItem[];
  selectedId: number | null;
  isRolling: boolean;
  label: string;
  onAddItem: (text: string) => void;
  currentlyRolling: string | null;
}

export function SlotMachine({ 
  items, 
  selectedId, 
  isRolling, 
  label, 
  onAddItem,
  currentlyRolling 
}: SlotMachineProps) {
  const [newItem, setNewItem] = React.useState('');
  const category = label.toLowerCase();
  
  const isThisRolling = isRolling && (
    currentlyRolling === 'all' || 
    currentlyRolling === `${category}s`
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newItem.trim()) {
      onAddItem(newItem.trim());
      setNewItem('');
    }
  };

  return (
    <div className="flex-1 mx-2">
      <div className="flex items-center gap-2 mb-2">
        <Sparkle className="w-5 h-5 text-emerald-400" />
        <h2 className="text-xl font-bold text-emerald-100">{label}</h2>
      </div>
      <div className="glass-morphism rounded-xl shadow-lg p-4 h-64 overflow-hidden relative">
        <div
          className="transition-transform duration-[2000ms] ease-in-out"
          style={{
            transform: selectedId
              ? `translateY(-${(selectedId - 1) * 40}px)`
              : isThisRolling
              ? 'translateY(-90%)'
              : 'translateY(0)',
          }}
        >
          {[...items, ...items].map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className={`h-10 flex items-center justify-center text-center p-2 ${
                item.id === selectedId 
                  ? 'text-emerald-300 font-bold bg-emerald-900/50 rounded-lg' 
                  : 'text-emerald-200/80'
              }`}
            >
              <span className="line-clamp-1 px-4">
                {label === 'Quote' ? `"${item.text}"` : item.text}
              </span>
            </div>
          ))}
        </div>
      </div>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder={`Add new ${label.toLowerCase()}`}
            className="flex-1 px-3 py-2 glass-morphism text-emerald-100 rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent 
              placeholder-emerald-500/50"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-emerald-600/80 backdrop-blur-sm text-emerald-100 rounded-lg 
              hover:bg-emerald-700/80 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add
          </button>
        </div>
      </form>
    </div>
  );
}