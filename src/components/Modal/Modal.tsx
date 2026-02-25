import { useGameStore } from "../../store/useGameStore";

export default function Modal() {
  const { gameStatus, matchedPairs, timeLeft, restartGame, nextLevel, level } = useGameStore();

  if (gameStatus !== "won" && gameStatus !== "lost" && gameStatus !== "completed") return null;

  const isWon = gameStatus === "won" || gameStatus === "completed";
  const isCompleted = gameStatus === "completed";

  if (!isWon) {
    const timeUsed = 75 - timeLeft;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
        <div className="bg-white rounded-[20px] p-[70px] text-center shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] w-[60%] max-w-4xl min-h-[600px] flex flex-col items-center justify-center transform scale-95 animate-scale-in">
          <div className="mb-8">
            <span className="text-[90px] sm:text-[100px] leading-none">
              ⏰
            </span>
          </div>

          <h2
            className="text-[60px] sm:text-[50px] font-bold leading-[1.2] text-[#1E73D8] mb-5"
            style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, padding: '1rem 0' }}
          >
            TIEMPO AGOTADO
          </h2>

          <p className="text-[#4B5563] text-[22px] sm:text-[30px] mb-9" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400 }}>
            Estás cerca. Inténtalo otra vez.
          </p>

          <button
            onClick={restartGame}
            className="
              bg-[#4DA3FF] hover:bg-[#3d91e6]
              text-white font-semibold
              text-xl sm:text-3xl
              py-5 sm:py-[20px] px-25 sm:px-[85px]
              rounded-2xl
              uppercase tracking-[0.1em]
              transition-all duration-300
              shadow-lg
              hover:-translate-y-1
              hover:shadow-[0_14px_35px_-5px_rgba(77,163,255,0.45)]
              mb-12
            "
            style={{ fontFamily: 'Montserrat, sans-serif', padding: '1.4rem 3rem', marginTop: '2rem' }}
          >
            Reiniciar Juego
          </button>

          <div 
          style={{marginTop: '2rem'}}
          className="flex justify-center items-stretch gap-20 sm:gap-24 w-full max-w-2xl mt-12">
            <div className="flex-1 text-center py-6 border-r border-gray-200">
              <div className="text-[40px] sm:text-[55px] font-bold text-[#1E73D8] mb-2" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}>
                {matchedPairs}/12
              </div>
              <div className="text-gray-400 text-2xl uppercase tracking-[0.15em]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Pares
              </div>
            </div>

            <div className="flex-1 text-center py-6">
              <div className="text-[40px] sm:text-[55px] font-bold text-[#1E73D8] mb-2" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}>
                {timeUsed}s
              </div>
              <div className="text-gray-400 text-2xl uppercase tracking-[0.15em]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Tiempo
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const title = isCompleted ? "¡Felicitaciones!" : "¡Bien Ganaste!";
  const subtitle = isCompleted 
    ? "Tu memoria te llevó a la victoria. Estás a un paso de descubrir tu próximo depa." 
    : "Primera sesión completada";
  const icon = isCompleted ? "🏆" : "🎉";
  const timeUsed = 75 - timeLeft;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md animate-fade-in">
      <div className="bg-white rounded-[20px] p-[70px] text-center shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] w-[60%] max-w-4xl min-h-[700px] flex flex-col items-center justify-center transform scale-95 animate-scale-in">
        <div className="mb-10">
          <span className="text-[120px] sm:text-[140px] leading-none">
            {icon}
          </span>
        </div>

        <h2
          className={`text-5xl sm:text-6xl font-bold leading-[1.2] mb-8 ${isCompleted ? "text-yellow-500" : isWon ? "text-green-500" : "text-[#1E73D8]"}`}
        >
          {title}
        </h2>

        <p className="text-gray-500 text-xxl sm:text-3xl mb-12">{subtitle}</p>

        {isCompleted ? (
          <button
            onClick={restartGame}
            className="
              bg-green-500 hover:bg-green-600
              text-white font-semibold
              text-2xl sm:text-3xl
              py-6 px-12 sm:px-20
              rounded-2xl
              uppercase tracking-[0.1em]
              transition-all duration-300
              shadow-lg
              hover:-translate-y-1
              hover:shadow-[0_14px_35px_-5px_rgba(34,197,94,0.45)]
              mb-6
            "
          >
            Volver a Jugar
          </button>
        ) : level === 1 ? (
          <button
            onClick={nextLevel}
            className="
              bg-yellow-500 hover:bg-yellow-600
              text-white font-semibold
              text-2xl sm:text-3xl
              py-7 px-12 sm:px-20
              rounded-2xl
              uppercase tracking-[0.1em]
              transition-all duration-300
              shadow-lg
              hover:-translate-y-1
              hover:shadow-[0_14px_35px_-5px_rgba(234,179,8,0.45)]
              mb-6
            "
          >
            Siguiente Nivel
          </button>
        ) : (
          <button
            onClick={restartGame}
            className="
              bg-[#4DA3FF] hover:bg-[#3d91e6]
              text-white font-semibold
              text-2xl sm:text-3xl
              py-6 px-12 sm:px-20
              rounded-2xl
              uppercase tracking-[0.1em]
              transition-all duration-300
              shadow-lg
              hover:-translate-y-1
              hover:shadow-[0_14px_35px_-5px_rgba(77,163,255,0.45)]
              mb-6
            "
          >
            Reiniciar Juego
          </button>
        )}

        <div style={{marginTop: '5rem'}} className="flex justify-center items-stretch gap-24 w-full max-w-2xl mt-12">
          <div className="flex-1 text-center py-6 border-r border-gray-200">
            <div className="text-4xl sm:text-5xl font-bold text-[#1E73D8] mb-4">
              {matchedPairs}/12
            </div>
            <div className="text-gray-400 text-2xl uppercase tracking-[0.2em]">
              Pares
            </div>
          </div>

          <div className="flex-1 text-center py-6">
            <div className="text-4xl sm:text-5xl font-bold text-[#1E73D8] mb-4">
              {timeUsed}s
            </div>
            <div className="text-gray-400 text-2xl uppercase tracking-[0.2em]">
              Tiempo
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
