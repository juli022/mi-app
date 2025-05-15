import { useState, useEffect } from 'react'
import RegisterForm from '../components/RegisterForm'
import LoginForm from '../components/LoginForm'
import UserAdminPanel from '../components/UserAdminPanel'

function Home() {
  const [usuario, setUsuario] = useState(null)

  useEffect(() => {
    const raw = localStorage.getItem('usuarioActual')
const user = raw && raw !== "undefined" ? JSON.parse(raw) : null
setUsuario(user)

    if (user) {
      setUsuario(user)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('usuarioActual')
    setUsuario(null)
  }

  const getAvatar = (nombre, apellido) => {
    return `${nombre[0]}${apellido[0]}`.toUpperCase()
  }

  return (
    <div style={{ padding: '2rem', minHeight: '100vh', backgroundColor: '#1e1e1e', color: 'white' }}>
      <h1>Mi App de Reservas</h1>
      {usuario ? (
        <div>
          <p>Hola, {usuario.nombre} {usuario.apellido}</p>
          <div
            style={{
              width: 50,
              height: 50,
              borderRadius: '50%',
              backgroundColor: '#0077cc',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              marginBottom: '1rem',
            }}
          >
            {getAvatar(usuario.nombre, usuario.apellido)}
          </div>
          <button onClick={handleLogout}>Cerrar sesión</button>
          {usuario.rol === 'admin' && <UserAdminPanel />}
        </div>
      ) : (
        <>
          <RegisterForm />
          <LoginForm onLogin={setUsuario} />
        </>
      )}
    </div>
  )
}

export default Home
