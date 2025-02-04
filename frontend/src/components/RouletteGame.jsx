import { useState, useEffect } from 'react'

const RouletteGame = ({ updateBalance }) => {
  const [bet, setBet] = useState('')
  const [number, setNumber] = useState('')
  const [spinning, setSpinning] = useState(false)
  const [result, setResult] = useState(null)
  const [lastResults, setLastResults] = useState([])
  const [wheelRotation, setWheelRotation] = useState(0)

  const handlePlay = () => {
    const betAmount = Number(bet)
    const selectedNumber = Number(number)
    
    if (betAmount <= 0 || selectedNumber < 0 || selectedNumber > 36) {
      alert('Aposta inválida! Escolha um número entre 0 e 36')
      return
    }

    setSpinning(true)
    setResult(null)

    // Calcular rotação aleatória (5-10 voltas completas + posição final)
    const spins = 5 + Math.floor(Math.random() * 5)
    const randomResult = Math.floor(Math.random() * 37)
    const finalRotation = (spins * 360) + (randomResult * (360 / 37))
    
    // Aplicar rotação à roleta
    const wheel = document.querySelector('.roulette-wheel')
    wheel.style.setProperty('--rotation', `${finalRotation}deg`)
    wheel.classList.add('spinning')

    setTimeout(() => {
      wheel.classList.remove('spinning')
      setResult({
        number: randomResult,
        win: randomResult === selectedNumber,
        amount: randomResult === selectedNumber ? betAmount * 35 : -betAmount
      })
      
      setLastResults(prev => [randomResult, ...prev].slice(0, 5))
      updateBalance(randomResult === selectedNumber ? betAmount * 35 : -betAmount)
      setSpinning(false)
    }, 3000)
  }

  return (
    <div className="game-card">
      <h2>Roleta</h2>
      
      <div className="roulette-wheel"></div>

      <div style={{ marginBottom: '15px' }}>
        <p style={{ color: '#00b3ff', marginBottom: '10px' }}>Últimos números:</p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          {lastResults.map((num, index) => (
            <span key={index} style={{
              background: 'rgba(255,255,255,0.1)',
              padding: '5px 10px',
              borderRadius: '5px',
              minWidth: '30px'
            }}>
              {num}
            </span>
          ))}
        </div>
      </div>

      <div className="bet-input">
        <input
          type="number"
          placeholder="Valor da aposta"
          value={bet}
          onChange={(e) => setBet(e.target.value)}
          disabled={spinning}
        />
        <input
          type="number"
          placeholder="Número (0-36)"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          min="0"
          max="36"
          disabled={spinning}
        />
      </div>

      <button 
        onClick={handlePlay}
        disabled={spinning}
        style={{ opacity: spinning ? 0.7 : 1 }}
      >
        {spinning ? 'Girando...' : 'Jogar'}
      </button>

      

      {result && (
        <div className={`game-result ${result.win ? 'result-win' : 'result-lose'}`}>
          <p>Número sorteado: {result.number}</p>
          <p>{result.win ? 'Você ganhou!' : 'Você perdeu!'}</p>
          <p>{result.win ? `+R$ ${result.amount}` : `-R$ ${-result.amount}`}</p>
        </div>
      )}
    </div>
  )
}

export default RouletteGame