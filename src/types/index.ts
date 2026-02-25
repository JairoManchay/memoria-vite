export interface Card {
  id: number;
  name: string;
  icon: string;
  image?: string;
  isFlipped: boolean;
  isMatched: boolean;
  isSingle?: boolean;
}

export type GameStatus = 'idle' | 'playing' | 'paused' | 'won' | 'lost' | 'completed';

export interface GameState {
  cards: Card[];
  flippedCards: Card[];
  matchedPairs: number;
  attempts: number;
  timeLeft: number;
  gameStatus: GameStatus;
  canFlip: boolean;
  level: number;
  
  // Actions
  initializeGame: () => void;
  flipCard: (cardId: number) => void;
  checkMatch: () => void;
  updateTimer: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  restartGame: () => void;
  nextLevel: () => void;
}
