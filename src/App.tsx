import React, { useCallback } from 'react';
import { Dice6, TreePine } from 'lucide-react';
import { SlotMachine } from './components/SlotMachine';
import { RollResults } from './components/RollResults';
import { RollHistory } from './components/RollHistory';
import { TeamManagement } from './components/TeamManagement';
import { ResultsModal } from './components/ResultsModal';
import { initialState } from './data/initialData';
import { SlotMachineState, Team, Challenge } from './types';
import { useRolling } from './hooks/useRolling';
import { useLocalStorage } from './hooks/useLocalStorage';
import './styles/globals.css';

export default function App() {
  const [state, setState] = useLocalStorage<SlotMachineState>('filmChallengeState', initialState);
  const [teams, setTeams] = useLocalStorage<Team[]>('filmChallengeTeams', []);
  const [challenges, setChallenges] = useLocalStorage<Challenge[]>('filmChallengeChallenges', []);
  const [selectedTeamId, setSelectedTeamId] = React.useState<number | null>(null);
  const [showModal, setShowModal] = React.useState(false);

  const handleRollComplete = useCallback((challenge: Challenge) => {
    if (!selectedTeamId) return;

    const newChallenge = { ...challenge, teamId: selectedTeamId };
    
    const updatedTeams = teams.map(team => {
      if (team.id === selectedTeamId) {
        return { ...team, currentChallenge: newChallenge };
      }
      return team;
    });
    
    setTeams(updatedTeams);
    setChallenges(prev => [newChallenge, ...prev]);
    setShowModal(true);
  }, [selectedTeamId, teams, setTeams, setChallenges]);

  const { rollingState, handleRoll } = useRolling(state, {
    onRollComplete: handleRollComplete
  });

  const selectedTeam = teams.find(team => team.id === selectedTeamId);

  const handleNextTeam = () => {
    const currentIndex = teams.findIndex(team => team.id === selectedTeamId);
    const nextIndex = (currentIndex + 1) % teams.length;
    setSelectedTeamId(teams[nextIndex].id);
  };

  const handleNewRoll = () => {
    setShowModal(false);
    handleRoll();
  };

  return (
    <div className="min-h-screen p-4 sm:p-8 bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-950">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-6">
            <TreePine className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-400" />
            <h1 className="text-3xl sm:text-5xl font-bold text-emerald-100">Film Challenge</h1>
            <TreePine className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-400" />
          </div>
          <button
            onClick={handleRoll}
            disabled={rollingState.isRolling || !selectedTeamId}
            className="festive-button text-base sm:text-xl"
          >
            <Dice6 className="w-5 h-5 sm:w-6 sm:h-6" />
            {!selectedTeamId 
              ? 'Select a team first'
              : rollingState.isRolling 
                ? 'Rolling...' 
                : 'Roll the Dice'}
          </button>
        </div>

        <TeamManagement
          teams={teams}
          onTeamsChange={setTeams}
          selectedTeamId={selectedTeamId}
          onSelectTeam={setSelectedTeamId}
        />

        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          <SlotMachine
            items={state.genres}
            selectedId={rollingState.selectedGenre}
            isRolling={rollingState.isRolling}
            currentlyRolling={rollingState.currentlyRolling}
            label="Genre"
            onAddItem={(text) => setState(prev => ({
              ...prev,
              genres: [...prev.genres, { id: Math.max(...prev.genres.map(g => g.id)) + 1, text }]
            }))}
          />
          <SlotMachine
            items={state.quotes}
            selectedId={rollingState.selectedQuote}
            isRolling={rollingState.isRolling}
            currentlyRolling={rollingState.currentlyRolling}
            label="Quote"
            onAddItem={(text) => setState(prev => ({
              ...prev,
              quotes: [...prev.quotes, { id: Math.max(...prev.quotes.map(q => q.id)) + 1, text }]
            }))}
          />
          <SlotMachine
            items={state.props}
            selectedId={rollingState.selectedProp}
            isRolling={rollingState.isRolling}
            currentlyRolling={rollingState.currentlyRolling}
            label="Prop"
            onAddItem={(text) => setState(prev => ({
              ...prev,
              props: [...prev.props, { id: Math.max(...prev.props.map(p => p.id)) + 1, text }]
            }))}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <RollResults
            state={state}
            selectedGenre={rollingState.selectedGenre}
            selectedQuote={rollingState.selectedQuote}
            selectedProp={rollingState.selectedProp}
          />
          <RollHistory 
            challenges={challenges} 
            teams={teams}
          />
        </div>
      </div>

      {showModal && selectedTeam && rollingState.selectedGenre && (
        <ResultsModal
          challenge={{
            genre: state.genres.find(g => g.id === rollingState.selectedGenre)!.text,
            quote: state.quotes.find(q => q.id === rollingState.selectedQuote)!.text,
            prop: state.props.find(p => p.id === rollingState.selectedProp)!.text,
            timestamp: Date.now(),
            teamId: selectedTeam.id
          }}
          team={selectedTeam}
          onClose={() => setShowModal(false)}
          onNextTeam={handleNextTeam}
          onNewRoll={handleNewRoll}
        />
      )}
    </div>
  );
}