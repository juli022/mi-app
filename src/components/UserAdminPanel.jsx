import { useState, useEffect } from 'react'
import CategoryAdmin from './CategoryAdmin'  // Esta línea debe estar fuera de la función, al inicio
import FeatureAdmin from './FeatureAdmin'
import CrearProductoForm from './CrearProductoForm'
import ReservasAdmin from './ReservasAdmin'

function UserAdminPanel() {
  const [usuarios, setUsuarios] = useState([])

  useEffect(() => {
    const lista = JSON.parse(localStorage.getItem('usuarios')) || []
    setUsuarios(lista)
  }, [])

  const toggleAdmin = (index) => {
    const actualizados = [...usuarios]
    actualizados[index].rol =
      actualizados[index].rol === 'admin' ? 'usuario' : 'admin'
    setUsuarios(actualizados)
    localStorage.setItem('usuarios', JSON.stringify(actualizados))
  }

  const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'))
  console.log('Usuario actual:', usuarioActual)

  return (
    <div style={{ marginTop: '2rem' }}>
      <h2>Gestión de Usuarios</h2>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u, index) => (
            <tr key={index} style={{ borderBottom: '1px solid #ccc' }}>
              <td>{u.nombre} {u.apellido}</td>
              <td>{u.email}</td>
              <td>{u.rol}</td>
              <td>
                <button onClick={() => toggleAdmin(index)}>
                  {u.rol === 'admin' ? 'Quitar admin' : 'Hacer admin'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {usuarioActual?.rol === 'admin' && (
        <>
          <CategoryAdmin />
          <FeatureAdmin />
          <CrearProductoForm />
          <ReservasAdmin />
        </>
      )}
    </div>
  )
}

export default UserAdminPanel
