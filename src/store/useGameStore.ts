import { create } from 'zustand';
import { GameState, GameStatus } from '../types';

const INITIAL_ATTEMPTS = 12;
const INITIAL_TIME = 80;
const WINNING_PAIRS = 6;

const propertyData = [
  { name: 'Inmobiliaria 1', image: '/images/OIP.webp', icon: '' },
  { name: 'Inmobiliaria 2', image: '/images/OIP.webp', icon: '' },
  { name: 'Inmobiliaria 3', image: '/images/OIP.webp', icon: '' },
  { name: 'Inmobiliaria 4', image: '/images/OIP.webp', icon: '' },
  { name: 'Inmobiliaria 5', image: '/images/OIP.webp', icon: '' },
  { name: 'Inmobiliaria 6', image: '/images/OIP.webp', icon: '' },
  { name: 'Villa', icon: '🏡' },
  { name: 'Casa', icon: '🏠' },
  { name: 'Edificio', icon: '🏗️' },
  { name: 'Oficina', icon: '🏬' },
  { name: 'Local', icon: '🏪' },
  { name: 'Hotel', icon: '🏨' },
];

const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const useGameStore = create<GameState>((set, get) => ({
  cards: [],
  flippedCards: [],
  matchedPairs: 0,
  attempts: INITIAL_ATTEMPTS,
  timeLeft: INITIAL_TIME,
  gameStatus: 'idle',
  canFlip: true,
  level: 1,

  initializeGame: () => {
    const cardPairs = [...propertyData, ...propertyData];
    const shuffledCards = shuffleArray(cardPairs).map((card, index) => ({
      id: index,
      name: card.name,
      icon: card.icon || '',
      image: card.image,
      isFlipped: false,
      isMatched: false,
    }));

    set({
      cards: shuffledCards,
      flippedCards: [],
      matchedPairs: 0,
      attempts: INITIAL_ATTEMPTS,
      timeLeft: INITIAL_TIME,
      gameStatus: 'playing',
      canFlip: true,
      level: 1,
    });
  },

  flipCard: (cardId: number) => {
    const { cards, flippedCards, canFlip, gameStatus } = get();
    
    if (!canFlip || gameStatus !== 'playing') return;
    
    const card = cards.find((c) => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched) return;
    if (flippedCards.length >= 2) return;

    const updatedCards = cards.map((c) =>
      c.id === cardId ? { ...c, isFlipped: true } : c
    );

    const newFlippedCards = [...flippedCards, { ...card, isFlipped: true }];

    set({
      cards: updatedCards,
      flippedCards: newFlippedCards,
    });

    if (newFlippedCards.length === 2) {
      get().checkMatch();
    }
  },

  checkMatch: () => {
    const { flippedCards, cards, matchedPairs } = get();
    
    if (flippedCards.length !== 2) return;

    const [card1, card2] = flippedCards;
    
    // Comparar por imagen o icono
    const isMatch = (card1.image && card2.image) || 
                   (card1.icon === card2.icon && card1.icon !== '');

    set({ canFlip: false });

    setTimeout(() => {
      if (isMatch) {
        const updatedCards = cards.map((c) =>
          c.id === card1.id || c.id === card2.id
            ? { ...c, isMatched: true }
            : c
        );

        const newMatchedPairs = matchedPairs + 1;
        const newGameStatus: GameStatus = newMatchedPairs >= WINNING_PAIRS ? 'won' : 'playing';

        set({
          cards: updatedCards,
          flippedCards: [],
          matchedPairs: newMatchedPairs,
          canFlip: true,
          gameStatus: newGameStatus,
        });
      } else {
        const updatedCards = cards.map((c) =>
          c.id === card1.id || c.id === card2.id
            ? { ...c, isFlipped: false }
            : c
        );

        set({
          cards: updatedCards,
          flippedCards: [],
          attempts: get().attempts - 1,
          canFlip: true,
        });

        if (get().attempts <= 0) {
          set({ gameStatus: 'lost' });
        }
      }
    }, 1000);
  },

  updateTimer: () => {
    const { timeLeft, gameStatus } = get();
    
    if (gameStatus !== 'playing') return;

    if (timeLeft <= 1) {
      set({ timeLeft: 0, gameStatus: 'lost' });
    } else {
      set({ timeLeft: timeLeft - 1 });
    }
  },

  pauseGame: () => {
    set({ gameStatus: 'paused' });
  },

  resumeGame: () => {
    set({ gameStatus: 'playing' });
  },

  restartGame: () => {
    get().initializeGame();
  },

  nextLevel: () => {
    const { level } = get();
    const newLevel = level + 1;
    
    const cardPairs = [...propertyData, ...propertyData];
    const shuffledCards = shuffleArray(cardPairs).map((card, index) => ({
      id: index,
      name: card.name,
      icon: card.icon || '',
      image: card.image,
      isFlipped: false,
      isMatched: false,
    }));

    set({
      cards: shuffledCards,
      flippedCards: [],
      matchedPairs: 0,
      attempts: INITIAL_ATTEMPTS,
      timeLeft: INITIAL_TIME,
      gameStatus: 'playing',
      canFlip: true,
      level: newLevel,
    });
  },
}));
