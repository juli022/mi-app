import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

function Navbar({ usuario, onLogout }) {
  const [menuAbierto, setMenuAbierto] = useState(false)
  const location = useLocation()

  // Cierra el menú cuando cambia la ruta
  useEffect(() => {
    setMenuAbierto(false)
  }, [location])

  return (
    <nav style={{
      backgroundColor: '#1e1e1e',
      padding: '1rem 2rem',
      color: 'white',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      borderBottom: '1px solid #444',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    }}>
      {/* Logo */}
      <div style={{ fontWeight: 'bold', fontSize: '1.4rem' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
          Mi App Reservas
        </Link>
      </div>

      {/* Botón hamburguesa en mobile */}
      <button
        onClick={() => setMenuAbierto(!menuAbierto)}
        style={{
          background: 'none',
          border: 'none',
          color: 'white',
          fontSize: '1.8rem',
          cursor: 'pointer',
          display: 'none'
        }}
        className="hamburger-btn"
      >
        ☰
      </button>

      {/* Menú en desktop */}
      <ul className="nav-links" style={{
        listStyle: 'none',
        display: 'flex',
        gap: '1.5rem',
        margin: 0,
        padding: 0,
      }}>
        <li><Link to="/" style={{ color: 'white' }}>Inicio</Link></li>
        <li><Link to="/productos" style={{ color: 'white' }}>Productos</Link></li>
        <li><Link to="/contacto" style={{ color: 'white' }}>Contacto</Link></li>
        {usuario && (
          <>
            <li><Link to="/mis-reservas" style={{ color: 'white' }}>Mis Reservas</Link></li>
            <li>
              <button
                onClick={onLogout}
                style={{
                  backgroundColor: '#e63946',
                  border: 'none',
                  padding: '0.4rem 0.8rem',
                  borderRadius: '5px',
                  color: 'white',
                  cursor: 'pointer'
                }}
              >
                Cerrar sesión
              </button>
            </li>
          </>
        )}
      </ul>

      {/* Menú mobile */}
      <div className={`mobile-menu ${menuAbierto ? 'open' : ''}`} style={{
        display: 'none',
        position: 'absolute',
        top: '60px',
        right: 0,
        backgroundColor: '#1e1e1e',
        width: '200px',
        boxShadow: '-2px 2px 5px rgba(0,0,0,0.5)',
        flexDirection: 'column',
        padding: '1rem',
        borderRadius: '0 0 0 8px'
      }}>
        <Link to="/" style={{ color: 'white', marginBottom: '0.5rem' }}>Inicio</Link>
        <Link to="/productos" style={{ color: 'white', marginBottom: '0.5rem' }}>Productos</Link>
        <Link to="/contacto" style={{ color: 'white', marginBottom: '0.5rem' }}>Contacto</Link>
        {usuario && (
          <>
            <Link to="/mis-reservas" style={{ color: 'white', marginBottom: '0.5rem' }}>Mis Reservas</Link>
            <button
              onClick={onLogout}
              style={{
                backgroundColor: '#e63946',
                border: 'none',
                padding: '0.4rem 0.8rem',
                borderRadius: '5px',
                color: 'white',
                cursor: 'pointer',
                marginTop: '1rem',
                width: '100%'
              }}
            >
              Cerrar sesión
            </button>
          </>
        )}
      </div>

      {/* Estilos responsivos */}
      <style>{`
        @media (max-width: 768px) {
          .hamburger-btn {
            display: block;
          }
          .nav-links {
            display: none;
          }
          .mobile-menu {
            display: ${menuAbierto ? 'flex' : 'none'};
          }
        }
      `}</style>
    </nav>
  )
}

export default Navbar
