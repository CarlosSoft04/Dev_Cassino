import { useNavigate } from 'react-router-dom'

const GameNavigation = () => {
  const navigate = useNavigate()

  const games = [
    { name: 'Roleta', path: '/roulette', icon: '🎲' },
    { name: 'Caça-Níquel', path: '/slots', icon: '🎰' },
    { name: 'Cara ou Coroa', path: '/coinflip', icon: '🪙' }
  ]

  return (
    <div className="game-navigation">
      <button 
        className="nav-button home-button" 
        onClick={() => navigate('/games')}
      >
        🏠 Menu Principal
      </button>
      <div className="nav-buttons">
        {games.map((game) => (
          <button
            key={game.path}
            className="nav-button"
            onClick={() => navigate(game.path)}
          >
            {game.icon} {game.name}
          </button>
        ))}
      </div>
    </div>
  )
}

export default GameNavigation