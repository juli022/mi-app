import { useState } from 'react'
import { Link } from 'react-router-dom'

function Navbar({ usuario, onLogout }) {
  const [menuAbierto, setMenuAbierto] = useState(false)

  const toggleMenu = () => setMenuAbierto(!menuAbierto)
  const cerrarMenu = () => setMenuAbierto(false)

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/" onClick={cerrarMenu}>Mi App Reservas</Link>
      </div>

      <button
        onClick={toggleMenu}
        className="hamburger-btn"
        aria-label="Toggle menu"
      >
        &#9776;
      </button>

      <ul className={`nav-links ${menuAbierto ? 'open' : ''}`}>
        <li><Link to="/" onClick={cerrarMenu}>Inicio</Link></li>
        <li><Link to="/productos" onClick={cerrarMenu}>Productos</Link></li>
        <li><Link to="/contacto" onClick={cerrarMenu}>Contacto</Link></li>
        {usuario && (
          <>
            <li><Link to="/mis-reservas" onClick={cerrarMenu}>Mis Reservas</Link></li>
            <li>
              <button onClick={() => { onLogout(); cerrarMenu() }} className="logout-btn">
                Cerrar sesión
              </button>
            </li>
          </>
        )}
      </ul>

      <style>{`
        .navbar {
          background: #1e1e1e;
          padding: 1rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: sticky;
          top: 0;
          z-index: 1000;
          border-bottom: 1px solid #444;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: white;
        }

        .logo a {
          color: white;
          text-decoration: none;
          font-weight: bold;
          font-size: 1.4rem;
        }

        .hamburger-btn {
          background: none;
          border: none;
          color: white;
          font-size: 1.8rem;
          cursor: pointer;
          display: none;
        }

        .nav-links {
          list-style: none;
          display: flex;
          gap: 1.5rem;
          margin: 0;
          padding: 0;
        }

        .nav-links li a,
        .nav-links li button {
          color: white;
          background: none;
          border: none;
          cursor: pointer;
          font: inherit;
          padding: 0.4rem 0.8rem;
          text-decoration: none;
        }

        .nav-links li a:hover,
        .nav-links li button:hover {
          color: #646cff;
        }

        .logout-btn {
          background-color: #e63946;
          border-radius: 6px;
          color: white;
        }

        @media (max-width: 768px) {
          .hamburger-btn {
            display: block;
          }
          .nav-links {
            position: absolute;
            top: 60px;
            right: 0;
            background: #1e1e1e;
            flex-direction: column;
            width: 200px;
            display: none;
            box-shadow: -2px 2px 5px rgba(0,0,0,0.5);
            border-radius: 0 0 0 8px;
          }
          .nav-links.open {
            display: flex;
          }
          .nav-links li {
            margin: 0.5rem 0;
          }
        }
      `}</style>
    </nav>
  )
}

export default Navbar
