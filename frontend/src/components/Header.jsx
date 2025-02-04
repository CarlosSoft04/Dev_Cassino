const Header = ({ balance }) => {
  return (
    <div className="header">
      <h1>Casa de Apostas</h1>
      <div className="balance">
        Saldo: R$ {balance.toFixed(2)}
      </div>
    </div>
  )
}

export default Header