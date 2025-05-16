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
    let usuariosGuardados = JSON.parse(localStorage.getItem('usuarios')) || []

    if (usuariosGuardados.length === 0) {
      const adminDefault = {
        nombre: 'Admin',
        apellido: 'Default',
        email: 'admin@admin.com',
        password: 'admin123',
        rol: 'admin'
      }
      usuariosGuardados = [adminDefault]
      localStorage.setItem('usuarios', JSON.stringify(usuariosGuardados))
      localStorage.setItem('usuarioActual', JSON.stringify(adminDefault))
      setUsuario(adminDefault)
    } else {
      const rawUser = localStorage.getItem('usuarioActual')
      const user = rawUser && rawUser !== "undefined" ? JSON.parse(rawUser) : null
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
    <>
      <Navbar usuario={usuario} onLogout={handleLogout} />

      <div style={{ padding: '2rem', minHeight: '100vh', backgroundColor: '#1e1e1e', color: 'white' }}>
        <h1>Mi App de Reservas</h1>

        {usuario ? (
          <div>
            <p>Hola, {usuario.nombre} {usuario.apellido}</p>
            <div className="usuario-info">
              <div className="avatar">{getAvatar(usuario.nombre, usuario.apellido)}</div>

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
            <RegisterForm />
            <LoginForm onLogin={setUsuario} />
            <ListaProductos />
          </>
        )}
      </div>
    </>
  )
}

export default Home
