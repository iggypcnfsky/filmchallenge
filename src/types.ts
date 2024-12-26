export interface SlotItem {
  id: number;
  text: string;
}

export interface Team {
  id: number;
  name: string;
  members: string[];
  currentChallenge?: Challenge | null;
}

export interface SlotMachineState {
  genres: SlotItem[];
  quotes: SlotItem[];
  props: SlotItem[];
}

export interface RollingState {
  selectedGenre: number | null;
  selectedQuote: number | null;
  selectedProp: number | null;
  isRolling: boolean;
  currentlyRolling: 'all' | 'genres' | 'quotes' | 'props' | null;
}

export interface Challenge {
  genre: string;
  quote: string;
  prop: string;
  timestamp: number;
  teamId?: number;
}