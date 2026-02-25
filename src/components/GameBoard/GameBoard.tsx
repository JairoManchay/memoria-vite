import { useEffect } from 'react';
import { useGameStore } from '../../store/useGameStore';
import Card from '../Card/Card';

export default function GameBoard() {
  const { cards, flipCard, gameStatus, level } = useGameStore();

  return (
    <div className={`
      grid gap-2 sm:gap-3 max-w-[960px]
      grid-cols-3 sm:grid-cols-4 md:grid-cols-4
      ${gameStatus === 'paused' ? 'opacity-50 pointer-events-none' : ''}
    `}>
      {cards.map((card) => (
        <Card 
          key={card.id} 
          card={card} 
          onFlip={flipCard} 
          level={level} 
        />
      ))}
    </div>
  );
}
