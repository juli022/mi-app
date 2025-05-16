import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { db } from '../firebase'
import { doc, getDoc, collection, addDoc } from 'firebase/firestore'
import Alerta from '../components/Alerta'

function DetalleProducto() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [producto, setProducto] = useState(null)
  const [fechaInicio, setFechaInicio] = useState('')
  const [fechaFin, setFechaFin] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [error, setError] = useState(false)
  const [usuario, setUsuario] = useState(null)

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const docRef = doc(db, 'productos', id)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          setProducto(docSnap.data())
        } else {
          navigate('/productos')
        }
      } catch (err) {
        console.error('Error al obtener el producto:', err)
      }
    }

    fetchProducto()

    const rawUser = localStorage.getItem('usuarioActual')
    if (rawUser) setUsuario(JSON.parse(rawUser))
  }, [id, navigate])

  const handleReserva = async (e) => {
    e.preventDefault()
    setMensaje('')
    setError(false)

    if (!usuario) {
      setMensaje('Tenés que iniciar sesión para reservar.')
      setError(true)
      return
    }

    if (!fechaInicio || !fechaFin) {
      setMensaje('Por favor seleccioná fecha de inicio y fin.')
      setError(true)
      return
    }

    if (fechaFin < fechaInicio) {
      setMensaje('La fecha de fin no puede ser anterior a la de inicio.')
      setError(true)
      return
    }

    try {
      const nuevaReserva = {
        productoId: id,
        usuarioEmail: usuario.email,
        fechaInicio,
        fechaFin,
        estado: 'pendiente',
        createdAt: new Date()
      }

      await addDoc(collection(db, 'reservas'), nuevaReserva)

      setMensaje('¡Reserva realizada con éxito!')
      setError(false)
      setFechaInicio('')
      setFechaFin('')
    } catch (error) {
      console.error('Error al guardar la reserva:', error)
      setMensaje('Error al realizar la reserva. Intentá de nuevo más tarde.')
      setError(true)
    }
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

      <div style={{ maxWidth: '600px', width: '100%' }}>
        <p><strong>Categoría:</strong> {producto.categoria}</p>
        <p><strong>Características:</strong></p>
        <ul style={{ paddingLeft: '1.5rem', marginBottom: '2rem' }}>
          {producto.caracteristicas?.map((car, i) => (
            <li key={i}>{car}</li>
          ))}
        </ul>

        <h3>Reservar este producto</h3>

        {mensaje && (
          <Alerta
            tipo={error ? 'error' : 'exito'}
            mensaje={mensaje}
            onClose={() => setMensaje('')}
          />
        )}

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
