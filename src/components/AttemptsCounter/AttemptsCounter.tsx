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
      <div className="flex gap-3 items-center bg-blue-950 shadow-2xl rounded-xl px-14 py-7 mt-10">
        <span className="text-white text-5xl font-semibold">
          Intentos restantes:
        </span>
        <span className={`text-5xl font-bold min-w-[50px] text-center transition-colors ${getAttemptsClass()}`}>
          {attempts}
        </span>
      </div>
    </div>
  );
}
