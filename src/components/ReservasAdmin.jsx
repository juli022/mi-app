import { useEffect, useState } from 'react'

function ReservasAdmin() {
  const [reservas, setReservas] = useState([])
  const [productos, setProductos] = useState([])
  const [usuarios, setUsuarios] = useState([])
  
  // Filtros
  const [filtroEstado, setFiltroEstado] = useState('')
  const [filtroUsuario, setFiltroUsuario] = useState('')

  // Mensaje de feedback
  const [mensaje, setMensaje] = useState('')
  const [tipoMensaje, setTipoMensaje] = useState('') // 'exito' o 'error'

  useEffect(() => {
    const reservasGuardadas = JSON.parse(localStorage.getItem('reservas')) || []
    const productosGuardados = JSON.parse(localStorage.getItem('productos')) || []
    const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios')) || []

    setReservas(reservasGuardadas)
    setProductos(productosGuardados)
    setUsuarios(usuariosGuardados)
  }, [])

  // Función para mostrar mensaje con autocierre
  const mostrarMensaje = (msg, tipo = 'exito') => {
    setMensaje(msg)
    setTipoMensaje(tipo)
    setTimeout(() => {
      setMensaje('')
    }, 3000)
  }

  const cambiarEstado = (id, nuevoEstado) => {
    const actualizadas = reservas.map(r =>
      r.id === id ? { ...r, estado: nuevoEstado } : r
    )
    setReservas(actualizadas)
    localStorage.setItem('reservas', JSON.stringify(actualizadas))
    mostrarMensaje(`Reserva ${nuevoEstado} con éxito!`)
  }

  const eliminarReserva = (id) => {
    const filtradas = reservas.filter(r => r.id !== id)
    setReservas(filtradas)
    localStorage.setItem('reservas', JSON.stringify(filtradas))
    mostrarMensaje('Reserva eliminada con éxito!')
  }

  const nombreProducto = (productoId) => {
    const p = productos[productoId]
    return p ? p.titulo : 'Producto eliminado'
  }

  const nombreUsuario = (email) => {
    const u = usuarios.find(u => u.email === email)
    return u ? `${u.nombre} ${u.apellido}` : 'Usuario eliminado'
  }

  // Aplicamos filtros
  const reservasFiltradas = reservas.filter(r => {
    const cumpleEstado = filtroEstado ? r.estado === filtroEstado : true
    const cumpleUsuario = filtroUsuario
      ? nombreUsuario(r.usuarioEmail).toLowerCase().includes(filtroUsuario.toLowerCase())
      : true
    return cumpleEstado && cumpleUsuario
  })

  return (
    <div style={{ padding: '2rem', color: 'white', minHeight: '100vh', backgroundColor: '#1e1e1e' }}>
      <h2>Gestión de Reservas</h2>

      {/* FILTROS */}
      <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <select
          value={filtroEstado}
          onChange={e => setFiltroEstado(e.target.value)}
          style={{ padding: '0.5rem', borderRadius: '5px', border: '1px solid #444', background: '#2a2a2a', color: 'white' }}
        >
          <option value="">Todos los estados</option>
          <option value="pendiente">Pendiente</option>
          <option value="confirmada">Confirmada</option>
          <option value="cancelada">Cancelada</option>
        </select>

        <input
          type="text"
          placeholder="Buscar por usuario..."
          value={filtroUsuario}
          onChange={e => setFiltroUsuario(e.target.value)}
          style={{ padding: '0.5rem', borderRadius: '5px', border: '1px solid #444', background: '#2a2a2a', color: 'white', flexGrow: 1 }}
        />
      </div>

      {/* MENSAJE */}
      {mensaje && (
        <div
          style={{
            marginBottom: '1rem',
            padding: '0.75rem 1rem',
            borderRadius: '5px',
            backgroundColor: tipoMensaje === 'exito' ? '#38b000' : '#e63946',
            color: 'white',
            fontWeight: 'bold',
            maxWidth: '400px'
          }}
        >
          {mensaje}
        </div>
      )}

      {/* TABLA */}
      {reservasFiltradas.length === 0 ? (
        <p>No hay reservas cargadas o que coincidan con los filtros.</p>
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
            {reservasFiltradas.map(r => (
              <tr key={r.id} style={{ borderBottom: '1px solid #555' }}>
                <td>{nombreProducto(r.productoId)}</td>
                <td>{nombreUsuario(r.usuarioEmail)}</td>
                <td>{r.fechaInicio}</td>
                <td>{r.fechaFin}</td>
                <td style={{ textTransform: 'capitalize' }}>{r.estado}</td>
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
