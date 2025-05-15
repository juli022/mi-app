import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{ padding: '1rem', background: '#eee', display: 'flex', gap: '1rem' }}>
      <Link to="/">Inicio</Link>
      <Link to="/productos">Productos</Link>
      <Link to="/contacto">Contacto</Link>
    </nav>
  );
}

export default Navbar;
