import { Card as CardType } from '../../types';

interface CardProps {
  card: CardType;
  onFlip: (id: number) => void;
  level?: number;
}

export default function Card({ card, onFlip, level = 1 }: CardProps) {
  const handleClick = () => {
    if (!card.isFlipped && !card.isMatched) {
      onFlip(card.id);
    }
  };

  const isLevel2 = level === 2;

  return (
    <div
      className={`
        relative w-[210px] h-[200px] cursor-pointer
        transition-transform duration-500 ease-out
        ${!card.isFlipped && !card.isMatched ? 'hover:-translate-y-1 hover:scale-[1.02]' : ''}
      `}
      style={{
        transformStyle: 'preserve-3d',
        transform: (card.isFlipped || card.isMatched) ? 'rotateY(180deg)' : 'rotateY(0deg)',
      }}
      onClick={handleClick}
    >
      {/* Front Face (Visible when face down - with icon) */}
      <div
        className="absolute inset-0 rounded-xl shadow-md flex flex-col items-center justify-center"
        style={{
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          background: isLevel2 
            ? 'linear-gradient(145deg, #1E73D8 0%, #0d47a1 100%)' 
            : 'linear-gradient(145deg, #4DA3FF 0%, #1E73D8 100%)',
        }}
      >
        <div
          className="absolute inset-0 rounded-xl"
          style={{
            background: `
              radial-gradient(circle at 50% 50%, rgba(255,255,255,0.15) 0%, transparent 60%),
              linear-gradient(45deg, transparent 45%, rgba(255,255,255,0.1) 45%, rgba(255,255,255,0.1) 55%, transparent 55%),
              linear-gradient(-45deg, transparent 45%, rgba(255,255,255,0.1) 45%, rgba(255,255,255,0.1) 55%, transparent 55%)
            `,
            backgroundSize: '100% 100%, 20px 20px, 20px 20px',
          }}
        />
        <img className='w-44' src="/logo_feria_inmobiliaria.png" alt="" />
        {isLevel2 && (
          <span className="absolute top-2 right-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded">
            NIVEL 2
          </span>
        )}
      </div>

      {/* Back Face (Visible when flipped - with image or icon) */}
      <div
        className="absolute inset-0 rounded-xl bg-white shadow-md flex flex-col items-center justify-center"
        style={{
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
        }}
      >
        {card.image ? (
          <img 
            src={card.image} 
            alt={card.name}
            className="absolute inset-0 w-full h-full object-cover rounded-xl"
            style={{
              filter: isLevel2 ? 'sepia(0.8) contrast(1.2)' : 'none',
            }}
          />
        ) : card.icon ? (
          <div className="flex flex-col items-center justify-center w-full h-full bg-gray-100 rounded-xl">
            <span className="text-6xl relative z-10">{card.icon}</span>
            <span className="mt-2 text-lg font-semibold text-gray-700">{card.name}</span>
          </div>
        ) : (
          <div
            className="absolute inset-0 rounded-xl"
            style={{
              backgroundImage: `
                repeating-linear-gradient(
                  45deg,
                  transparent,
                  transparent 8px,
                  rgba(77, 163, 255, 0.1) 8px,
                  rgba(77, 163, 255, 0.1) 16px
                )
              `,
            }}
          />
        )}
      </div>
    </div>
  );
}
