import { useState } from 'react'

const SlotMachine = ({ updateBalance }) => {
  const [bet, setBet] = useState('')
  const [spinning, setSpinning] = useState(false)
  const [slots, setSlots] = useState(['🎰', '🎰', '🎰'])
  const symbols = ['🍎', '🍋', '🍒', '💎', '7️⃣', '🍀']
  const [result, setResult] = useState(null)
  
  const spin = () => {
    setSpinning(true)
    setResult(null)
    
    // Efeito de spinning
    let spins = 0
    const maxSpins = 20
    const interval = setInterval(() => {
      setSlots(slots.map(() => symbols[Math.floor(Math.random() * symbols.length)]))
      spins++
      
      if (spins >= maxSpins) {
        clearInterval(interval)
        finalSpin()
      }
    }, 100)
  }

  const finalSpin = () => {
    const betAmount = Number(bet)
    const finalResult = Array(3).fill().map(() => 
      symbols[Math.floor(Math.random() * symbols.length)]
    )
    
    setSlots(finalResult)
    const isWin = finalResult.every(symbol => symbol === finalResult[0])
    
    setResult({
      win: isWin,
      amount: isWin ? betAmount * 10 : -betAmount
    })
    
    updateBalance(isWin ? betAmount * 10 : -betAmount)
    setSpinning(false)
  }
  
  const handlePlay = () => {
    const betAmount = Number(bet)
    
    if (betAmount <= 0) {
      alert('Aposta inválida!')
      return
    }

    spin()
  }

  return (
    <div className="game-card">
      <h2>Caça-Níquel</h2>
      
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        fontSize: '40px',
        margin: '20px 0',
        background: 'rgba(0,0,0,0.2)',
        padding: '20px',
        borderRadius: '10px'
      }}>
        {slots.map((symbol, index) => (
          <div key={index} style={{
            animation: spinning ? 'spin 0.2s linear infinite' : 'none'
          }}>
            {symbol}
          </div>
        ))}
      </div>

      <div className="bet-input">
        <input
          type="number"
          placeholder="Valor da aposta"
          value={bet}
          onChange={(e) => setBet(e.target.value)}
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
          <p>{result.win ? 'Você ganhou!' : 'Você perdeu!'}</p>
          <p>{result.win ? `+R$ ${result.amount}` : `-R$ ${-result.amount}`}</p>
        </div>
      )}
    </div>
  )
}

export default SlotMachine