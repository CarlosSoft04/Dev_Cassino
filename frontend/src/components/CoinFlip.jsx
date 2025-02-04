import { useState } from 'react'

const CoinFlip = ({ updateBalance }) => {
  const [bet, setBet] = useState('')
  const [choice, setChoice] = useState('cara')
  const [flipping, setFlipping] = useState(false)
  const [result, setResult] = useState(null)
  
  const handlePlay = () => {
    const betAmount = Number(bet)
    
    if (betAmount <= 0) {
      alert('Aposta inválida!')
      return
    }

    setFlipping(true)
    setResult(null)

    const coin = document.querySelector('.coin')
    const flips = Math.floor(Math.random() * 5 + 10) * 180
    coin.style.setProperty('--flips', `${flips}deg`)
    
    const finalResult = Math.random() < 0.5 ? 'cara' : 'coroa'
    
    setTimeout(() => {
      setResult({
        side: finalResult,
        win: finalResult === choice,
        amount: finalResult === choice ? betAmount : -betAmount
      })
      updateBalance(finalResult === choice ? betAmount : -betAmount)
      setFlipping(false)
      coin.classList.remove('flipping')
    }, 3000)

    coin.classList.add('flipping')
  }

  return (
    <div className="game-card">
      <h2>Cara ou Coroa</h2>

      <div className="coin-flip-container">
        <div className="coin">
          <div className="coin-face front">👑</div>
          <div className="coin-face back">🌟</div>
        </div>
      </div>

      <div className="bet-input">
        <input
          type="number"
          placeholder="Valor da aposta"
          value={bet}
          onChange={(e) => setBet(e.target.value)}
          disabled={flipping}
        />
        <select 
          value={choice} 
          onChange={(e) => setChoice(e.target.value)}
          disabled={flipping}
        >
          <option value="cara">Cara</option>
          <option value="coroa">Coroa</option>
        </select>
      </div>

      <button 
        onClick={handlePlay}
        disabled={flipping}
        style={{ opacity: flipping ? 0.7 : 1 }}
      >
        {flipping ? 'Jogando...' : 'Jogar'}
      </button>

      {result && (
        <div className={`game-result ${result.win ? 'result-win' : 'result-lose'}`}>
          <p>Resultado: {result.side}</p>
          <p>{result.win ? 'Você ganhou!' : 'Você perdeu!'}</p>
          <p>{result.win ? `+R$ ${result.amount}` : `-R$ ${-result.amount}`}</p>
        </div>
      )}
    </div>
  )
}

export default CoinFlip