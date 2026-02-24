import { useEffect } from 'react'
import Header from './components/Header/Header'
import GameBoard from './components/GameBoard/GameBoard'
import Timer from './components/Timer/Timer'
import AttemptsCounter from './components/AttemptsCounter/AttemptsCounter'
import Modal from './components/Modal/Modal'
import { useGameStore } from './store/useGameStore'

export default function App() {
  const { gameStatus, initializeGame } = useGameStore()

  useEffect(() => {
    if (gameStatus === 'idle') {
      initializeGame()
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#1E73D8] flex flex-col relative overflow-hidden">
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 80%, rgba(255,255,255,0.05) 0%, transparent 40%),
            radial-gradient(circle at 80% 20%, rgba(255,255,255,0.05) 0%, transparent 40%)
          `,
        }}
      />

      <Header />

      <main className="flex-1 flex flex-col items-center justify-center px-12 py-4 relative z-10">
        <GameBoard />
        
        <AttemptsCounter />
      </main>

      <Timer />
      <Modal />
    </div>
  )
}
