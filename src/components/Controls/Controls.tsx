import { useGameStore } from '../../store/useGameStore';

export default function Controls() {
  const { gameStatus, initializeGame } = useGameStore();

  if (gameStatus !== 'idle') return null;

  return (
    <div className="flex gap-4 mb-4">
      <button
        onClick={initializeGame}
        className="bg-green-500 hover:bg-green-600 text-white font-semibold text-lg py-3 px-10 rounded-xl uppercase tracking-wider transition-all hover:-translate-y-1 hover:shadow-lg"
      >
        Iniciar
      </button>
    </div>
  );
}
