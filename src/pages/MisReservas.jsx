import { useEffect, useState } from 'react'
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../firebase'

function MisReservas() {
  const [reservas, setReservas] = useState([])
  const [productos, setProductos] = useState([])
  const [usuario, setUsuario] = useState(null)

  // Obtener usuario
  useEffect(() => {
    const rawUser = localStorage.getItem('usuarioActual')
    if (rawUser) {
      setUsuario(JSON.parse(rawUser))
    }
  }, [])

  // Traer reservas y productos desde Firestore
  useEffect(() => {
    const fetchDatos = async () => {
      const reservasSnap = await getDocs(collection(db, 'reservas'))
      const productosSnap = await getDocs(collection(db, 'productos'))

      setReservas(reservasSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })))
      setProductos(productosSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })))
    }

    fetchDatos()
  }, [])

  // Cancelar reserva (eliminar de Firestore)
  const cancelarReserva = async (id) => {
    try {
      await deleteDoc(doc(db, 'reservas', id))
      setReservas(reservas.filter(r => r.id !== id))
    } catch (error) {
      alert('❌ Error al cancelar la reserva.')
    }
  }

  if (!usuario) {
    return <p style={{ color: 'white' }}>Tenés que iniciar sesión para ver tus reservas.</p>
  }

  const reservasUsuario = reservas.filter(r => r.usuarioEmail === usuario.email)

  if (reservasUsuario.length === 0) {
    return <p style={{ color: 'white' }}>No tenés reservas aún.</p>
  }

  const obtenerTituloProducto = (id) => {
    const p = productos.find(p => p.id === id)
    return p ? p.titulo : 'Producto eliminado'
  }

  return (
    <div style={{
      padding: '2rem',
      color: 'white',
      minHeight: '100vh',
      backgroundColor: '#1e1e1e',
    }}>
      <h2>Mis Reservas</h2>
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        color: 'white',
        fontSize: '1rem',
      }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #555' }}>
            <th style={{ padding: '0.75rem', textAlign: 'left' }}>Producto</th>
            <th style={{ padding: '0.75rem', textAlign: 'left' }}>Fecha Inicio</th>
            <th style={{ padding: '0.75rem', textAlign: 'left' }}>Fecha Fin</th>
            <th style={{ padding: '0.75rem', textAlign: 'left' }}>Estado</th>
            <th style={{ padding: '0.75rem', textAlign: 'left' }}>Acción</th>
          </tr>
        </thead>
        <tbody>
          {reservasUsuario.map(r => (
            <tr key={r.id} style={{ borderBottom: '1px solid #444' }}>
              <td style={{ padding: '0.75rem' }}>{obtenerTituloProducto(r.productoId)}</td>
              <td style={{ padding: '0.75rem' }}>{r.fechaInicio}</td>
              <td style={{ padding: '0.75rem' }}>{r.fechaFin}</td>
              <td style={{ padding: '0.75rem', textTransform: 'capitalize' }}>{r.estado}</td>
              <td style={{ padding: '0.75rem' }}>
                {r.estado !== 'cancelada' && (
                  <button
                    onClick={() => cancelarReserva(r.id)}
                    style={{
                      backgroundColor: '#e63946',
                      border: 'none',
                      padding: '0.4rem 0.8rem',
                      borderRadius: '5px',
                      color: 'white',
                      cursor: 'pointer',
                      transition: 'background-color 0.3s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#b72b34'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = '#e63946'}
                  >
                    Cancelar
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default MisReservas
