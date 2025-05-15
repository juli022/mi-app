import { useEffect, useState } from 'react'

function ReservasAdmin() {
  const [reservas, setReservas] = useState([])
  const [productos, setProductos] = useState([])
  const [usuarios, setUsuarios] = useState([])

  useEffect(() => {
    const reservasGuardadas = JSON.parse(localStorage.getItem('reservas')) || []
    const productosGuardados = JSON.parse(localStorage.getItem('productos')) || []
    const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios')) || []

    setReservas(reservasGuardadas)
    setProductos(productosGuardados)
    setUsuarios(usuariosGuardados)
  }, [])

  const cambiarEstado = (id, nuevoEstado) => {
    const actualizadas = reservas.map(r =>
      r.id === id ? { ...r, estado: nuevoEstado } : r
    )
    setReservas(actualizadas)
    localStorage.setItem('reservas', JSON.stringify(actualizadas))
  }

  const eliminarReserva = (id) => {
    const filtradas = reservas.filter(r => r.id !== id)
    setReservas(filtradas)
    localStorage.setItem('reservas', JSON.stringify(filtradas))
  }

  // Funciones para mostrar nombre producto y usuario
  const nombreProducto = (productoId) => {
    const p = productos[productoId]
    return p ? p.titulo : 'Producto eliminado'
  }

  const nombreUsuario = (email) => {
    const u = usuarios.find(u => u.email === email)
    return u ? `${u.nombre} ${u.apellido}` : 'Usuario eliminado'
  }

  return (
    <div style={{ padding: '2rem', color: 'white', minHeight: '100vh', backgroundColor: '#1e1e1e' }}>
      <h2>Gestión de Reservas</h2>

      {reservas.length === 0 ? (
        <p>No hay reservas cargadas.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', color: 'white' }}>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Usuario</th>
              <th>Fecha Inicio</th>
              <th>Fecha Fin</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {reservas.map(r => (
              <tr key={r.id} style={{ borderBottom: '1px solid #555' }}>
                <td>{nombreProducto(r.productoId)}</td>
                <td>{nombreUsuario(r.usuarioEmail)}</td>
                <td>{r.fechaInicio}</td>
                <td>{r.fechaFin}</td>
                <td>{r.estado}</td>
                <td>
                  {r.estado !== 'confirmada' && (
                    <button onClick={() => cambiarEstado(r.id, 'confirmada')} style={{ marginRight: '0.5rem' }}>
                      Confirmar
                    </button>
                  )}
                  {r.estado !== 'cancelada' && (
                    <button onClick={() => cambiarEstado(r.id, 'cancelada')} style={{ marginRight: '0.5rem' }}>
                      Cancelar
                    </button>
                  )}
                  <button onClick={() => eliminarReserva(r.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default ReservasAdmin
