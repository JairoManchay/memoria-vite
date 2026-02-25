import { useGameStore } from '../../store/useGameStore';
import Card from '../Card/Card';

export default function GameBoard() {
  const { cards, flipCard, gameStatus, level } = useGameStore();

  return (
    <div className={`
      grid gap-1 sm:gap-2 max-w-[960px]
      grid-cols-4
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
