import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

function DetalleProducto() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [producto, setProducto] = useState(null)
  const [fechaInicio, setFechaInicio] = useState('')
  const [fechaFin, setFechaFin] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [usuario, setUsuario] = useState(null)

  useEffect(() => {
    const productos = JSON.parse(localStorage.getItem('productos')) || []
    const prod = productos[id]
    if (prod) {
      setProducto(prod)
    } else {
      navigate('/productos')
    }

    const rawUser = localStorage.getItem('usuarioActual')
    if (rawUser) setUsuario(JSON.parse(rawUser))
  }, [id, navigate])

  const handleReserva = (e) => {
    e.preventDefault()

    if (!usuario) {
      setMensaje('Tenés que iniciar sesión para reservar.')
      return
    }

    if (!fechaInicio || !fechaFin) {
      setMensaje('Por favor seleccioná fecha de inicio y fin.')
      return
    }

    if (fechaFin < fechaInicio) {
      setMensaje('La fecha de fin no puede ser anterior a la de inicio.')
      return
    }

    const reservas = JSON.parse(localStorage.getItem('reservas')) || []

    const conflicto = reservas.some(r =>
      r.productoId === id &&
      !(
        fechaFin < r.fechaInicio ||
        fechaInicio > r.fechaFin
      )
    )

    if (conflicto) {
      setMensaje('Este producto ya está reservado en las fechas seleccionadas.')
      return
    }

    const nuevaReserva = {
      id: Date.now(),
      productoId: id,
      usuarioEmail: usuario.email,
      fechaInicio,
      fechaFin,
      estado: 'pendiente'
    }

    reservas.push(nuevaReserva)
    localStorage.setItem('reservas', JSON.stringify(reservas))
    setMensaje('¡Reserva realizada con éxito!')

    setFechaInicio('')
    setFechaFin('')
  }

  if (!producto) return <p style={{ color: 'white' }}>Cargando...</p>

  return (
    <div style={{
      padding: '2rem',
      color: 'white',
      minHeight: '100vh',
      backgroundColor: '#1e1e1e',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <h1 style={{ textAlign: 'center' }}>{producto.titulo}</h1>

      {producto.imagen && (
        <img
          src={producto.imagen}
          alt={producto.titulo}
          style={{
            width: '100%',
            maxWidth: '600px',
            borderRadius: '10px',
            marginBottom: '1rem',
            objectFit: 'cover'
          }}
        />
      )}

      <div style={{ maxWidth: '600px' }}>
        <p><strong>Categoría:</strong> {producto.categoria}</p>
        <p><strong>Características:</strong></p>
        <ul style={{ paddingLeft: '1.5rem', marginBottom: '2rem' }}>
          {producto.caracteristicas.map((car, i) => (
            <li key={i}>{car}</li>
          ))}
        </ul>

        <h3>Reservar este producto</h3>
        <form
          onSubmit={handleReserva}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            backgroundColor: '#2a2a2a',
            padding: '1.5rem',
            borderRadius: '10px'
          }}
        >
          <label>
            Fecha inicio:
            <input
              type="date"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
              required
            />
          </label>
          <label>
            Fecha fin:
            <input
              type="date"
              value={fechaFin}
              onChange={(e) => setFechaFin(e.target.value)}
              required
            />
          </label>
          <button type="submit">Reservar</button>
        </form>

        {mensaje && (
          <p style={{
            marginTop: '1rem',
            color: mensaje.includes('éxito') ? 'var(--color-success)' : 'var(--color-danger)',
            fontWeight: '500'
          }}>
            {mensaje}
          </p>
        )}

        <button
          onClick={() => navigate('/productos')}
          style={{ marginTop: '2rem', backgroundColor: '#555' }}
        >
          Volver a Productos
        </button>
      </div>
    </div>
  )
}

export default DetalleProducto
