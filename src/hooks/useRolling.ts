import { useState, useCallback } from 'react';
import { SlotMachineState, RollingState, Challenge } from '../types';

const GENRE_ROLL_TIME = 2000;
const QUOTE_ROLL_TIME = 3000;
const PROP_ROLL_TIME = 4000;

interface UseRollingProps {
  onRollComplete: (challenge: Challenge) => void;
}

export function useRolling(state: SlotMachineState, { onRollComplete }: UseRollingProps) {
  const [rollingState, setRollingState] = useState<RollingState>({
    selectedGenre: null,
    selectedQuote: null,
    selectedProp: null,
    isRolling: false,
    currentlyRolling: null,
  });
  const [currentChallenge, setCurrentChallenge] = useState<Challenge | null>(null);

  const handleRoll = useCallback(() => {
    if (rollingState.isRolling) return;

    const randomGenre = state.genres[Math.floor(Math.random() * state.genres.length)];
    const randomQuote = state.quotes[Math.floor(Math.random() * state.quotes.length)];
    const randomProp = state.props[Math.floor(Math.random() * state.props.length)];

    // Start rolling all
    setRollingState({
      selectedGenre: null,
      selectedQuote: null,
      selectedProp: null,
      isRolling: true,
      currentlyRolling: 'all'
    });

    // Stop genre roll first
    setTimeout(() => {
      setRollingState(prev => ({
        ...prev,
        selectedGenre: randomGenre.id,
        currentlyRolling: 'quotes'
      }));

      // Stop quote roll second
      setTimeout(() => {
        setRollingState(prev => ({
          ...prev,
          selectedQuote: randomQuote.id,
          currentlyRolling: 'props'
        }));

        // Stop prop roll last
        setTimeout(() => {
          setRollingState(prev => ({
            selectedGenre: randomGenre.id,
            selectedQuote: randomQuote.id,
            selectedProp: randomProp.id,
            isRolling: false,
            currentlyRolling: null
          }));

          // Set current challenge and notify parent
          const challenge = {
            genre: randomGenre.text,
            quote: randomQuote.text,
            prop: randomProp.text,
            timestamp: Date.now(),
          };
          setCurrentChallenge(challenge);
          onRollComplete(challenge);
        }, PROP_ROLL_TIME - QUOTE_ROLL_TIME);
      }, QUOTE_ROLL_TIME - GENRE_ROLL_TIME);
    }, GENRE_ROLL_TIME);
  }, [state, rollingState.isRolling, onRollComplete]);

  return {
    rollingState,
    currentChallenge,
    handleRoll,
  };
}