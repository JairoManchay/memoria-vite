import { create } from 'zustand';
import { GameState, GameStatus } from '../types';
import { INITIAL_ATTEMPTS, INITIAL_TIME, WINNING_PAIRS, FLIP_DELAY } from '../constants/game';
import {
  generateCardsForLevel,
  areCardsMatching,
  flipCard,
  unflipCard,
  matchCards,
} from '../utils/cardUtils';

const getInitialState = () => ({
  cards: [],
  flippedCards: [],
  matchedPairs: 0,
  attempts: INITIAL_ATTEMPTS,
  timeLeft: INITIAL_TIME,
  gameStatus: 'idle' as GameStatus,
  canFlip: true,
  level: 1,
});

export const useGameStore = create<GameState>((set, get) => ({
  ...getInitialState(),

  initializeGame: () => {
    const cards = generateCardsForLevel(1);

    set({
      cards,
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

    const updatedCards = flipCard(cards, cardId);
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
    const isMatch = areCardsMatching(card1, card2);

    set({ canFlip: false });

    setTimeout(() => {
      if (isMatch) {
        const updatedCards = matchCards(cards, card1.id, card2.id);
        const newMatchedPairs = matchedPairs + 2;
        const { level } = get();

        const newGameStatus: GameStatus =
          newMatchedPairs >= WINNING_PAIRS
            ? level >= 2
              ? 'completed'
              : 'won'
            : 'playing';

        set({
          cards: updatedCards,
          flippedCards: [],
          matchedPairs: newMatchedPairs,
          canFlip: true,
          gameStatus: newGameStatus,
        });
      } else {
        const updatedCards = unflipCard(unflipCard(cards, card1.id), card2.id);

        const newAttempts = get().attempts - 1;

        set({
          cards: updatedCards,
          flippedCards: [],
          attempts: newAttempts,
          canFlip: true,
        });

        if (newAttempts <= 0) {
          set({ gameStatus: 'lost' });
        }
      }
    }, FLIP_DELAY);
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
    const cards = generateCardsForLevel(newLevel);

    set({
      cards,
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
