import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import './App.css'
import RouletteGame from './components/RouletteGame'
import SlotMachine from './components/SlotMachine'
import CoinFlip from './components/CoinFlip'
import Header from './components/Header'
import Login from './components/Login'
import GameSelection from './components/GameSelection'
import GameNavigation from './components/GameNavigation'

function App() {
  const [balance, setBalance] = useState(1000)

  const updateBalance = (amount) => {
    setBalance(prevBalance => prevBalance + amount)
  }

  const GameLayout = ({ children }) => (
    <>
      <Header balance={balance} />
      <GameNavigation />
      {children}
    </>
  )

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/games" element={<GameSelection />} />
          <Route
            path="/roulette"
            element={
              <GameLayout>
                <RouletteGame updateBalance={updateBalance} />
              </GameLayout>
            }
          />
          <Route
            path="/slots"
            element={
              <GameLayout>
                <SlotMachine updateBalance={updateBalance} />
              </GameLayout>
            }
          />
          <Route
            path="/coinflip"
            element={
              <GameLayout>
                <CoinFlip updateBalance={updateBalance} />
              </GameLayout>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App