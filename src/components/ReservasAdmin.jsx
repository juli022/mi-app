import { useEffect, useState } from 'react'
import { collection, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../firebase'

function ReservasAdmin() {
  const [reservas, setReservas] = useState([])
  const [productos, setProductos] = useState([])
  const [usuarios, setUsuarios] = useState([])

  useEffect(() => {
    const fetchDatos = async () => {
      const reservasSnapshot = await getDocs(collection(db, 'reservas'))
      const productosSnapshot = await getDocs(collection(db, 'productos'))
      const usuariosSnapshot = await getDocs(collection(db, 'usuarios'))

      setReservas(reservasSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
      setProductos(productosSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
      setUsuarios(usuariosSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
    }
    fetchDatos()
  }, [])

  const cambiarEstado = async (id, nuevoEstado) => {
    try {
      const reservaDoc = doc(db, 'reservas', id)
      await updateDoc(reservaDoc, { estado: nuevoEstado })
      setReservas(reservas.map(r => (r.id === id ? { ...r, estado: nuevoEstado } : r)))
    } catch {
      alert('Error al actualizar estado.')
    }
  }

  const eliminarReserva = async (id) => {
    try {
      await deleteDoc(doc(db, 'reservas', id))
      setReservas(reservas.filter(r => r.id !== id))
    } catch {
      alert('Error al eliminar reserva.')
    }
  }

  const nombreProducto = (productoId) => {
    const p = productos.find(p => p.id === productoId)
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
