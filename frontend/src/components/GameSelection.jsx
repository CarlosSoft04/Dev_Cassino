import { useNavigate } from 'react-router-dom'

const GameSelection = () => {
  const navigate = useNavigate()

  const games = [
    { name: 'Roleta', path: '/roulette', icon: '🎲' },
    { name: 'Caça-Níquel', path: '/slots', icon: '🎰' },
    { name: 'Cara ou Coroa', path: '/coinflip', icon: '🪙' }
  ]

  return (
    <div className="game-selection">
      <div className="header">
        <h1>Escolha seu Jogo</h1>
      </div>
      <div className="game-buttons">
        {games.map((game) => (
          <button
            key={game.path}
            className="game-button"
            onClick={() => navigate(game.path)}
          >
            <span className="game-icon">{game.icon}</span>
            <span className="game-name">{game.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default GameSelection