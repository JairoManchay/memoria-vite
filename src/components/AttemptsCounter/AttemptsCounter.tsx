import { useGameStore } from '../../store/useGameStore';

export default function AttemptsCounter() {
  const { attempts } = useGameStore();

  const getAttemptsClass = () => {
    if (attempts <= 3) return 'text-red-500 animate-pulse';
    if (attempts <= 6) return 'text-yellow-500';
    return 'text-white';
  };

  return (
    <div className="mt-3 text-center">
      <div className="inline-flex items-center gap-3 bg-white/15 rounded-xl px-8 py-2" style={{marginTop: '1.5rem', padding: '0.8rem 1.2rem'}}>
        <span className="text-white text-xl font-semibold">
          Intentos restantes:
        </span>
        <span className={`text-4xl font-bold min-w-[50px] text-center transition-colors ${getAttemptsClass()}`}>
          {attempts}
        </span>
      </div>
    </div>
  );
}
