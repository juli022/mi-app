import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import RegisterForm from '../components/RegisterForm'
import LoginForm from '../components/LoginForm'
import UserAdminPanel from '../components/UserAdminPanel'
import ListaProductos from '../components/ListaProductos'

function Home() {
  const [usuario, setUsuario] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const raw = localStorage.getItem('usuarioActual')
    const user = raw && raw !== 'undefined' ? JSON.parse(raw) : null
    setUsuario(user)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('usuarioActual')
    setUsuario(null)
  }

  return (
    <>
      <Navbar usuario={usuario} onLogout={handleLogout} />
      <div style={{ padding: '2rem', minHeight: '100vh', backgroundColor: '#1e1e1e', color: 'white' }}>
        <h1>Mi App de Reservas</h1>

        {usuario ? (
          <div>
            <p>Hola, {usuario.nombre} {usuario.apellido}</p>
            <div className="usuario-info">
              <div className="avatar">{`${usuario.nombre[0]}${usuario.apellido[0]}`.toUpperCase()}</div>

              <div className="botones-usuario">
                <button onClick={handleLogout}>Cerrar sesión</button>
                <button onClick={() => navigate('/mis-reservas')}>Ver mis reservas</button>
              </div>
            </div>

            {usuario.rol === 'admin' && <UserAdminPanel />}
            <ListaProductos />
          </div>
        ) : (
          <>
            <RegisterForm onRegister={setUsuario} />
            <LoginForm onLogin={setUsuario} />
            <ListaProductos />
          </>
        )}
      </div>
    </>
  )
}

export default Home
