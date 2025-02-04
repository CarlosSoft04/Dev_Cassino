import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    if (username && password) {
      // Aqui você pode adicionar sua lógica de autenticação
      // Por enquanto vamos apenas simular um login bem-sucedido
      navigate('/games')
    } else {
      alert('Por favor, preencha todos os campos!')
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Casa de Apostas</h1>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  )
}

export default Login