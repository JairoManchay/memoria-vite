import { useGameStore } from '../../store/useGameStore';
import Card from '../Card/Card';

export default function GameBoard() {
  const { cards, flipCard, gameStatus, level } = useGameStore();

  return (
    <div className={`
      grid gap-[1dvh] w-full h-full
      grid-cols-4 grid-rows-6
      landscape:grid-cols-8 landscape:grid-rows-3
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
