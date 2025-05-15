import { useState, useEffect } from 'react'

function FeatureAdmin() {
  const [caracteristicas, setCaracteristicas] = useState([])
  const [nueva, setNueva] = useState({ nombre: '', icono: '' })

  // Cargar las características guardadas al iniciar
  useEffect(() => {
    const guardadas = JSON.parse(localStorage.getItem('caracteristicas')) || []
    setCaracteristicas(guardadas)
  }, [])

  // Actualizar el formulario
  const handleChange = (e) => {
    setNueva({ ...nueva, [e.target.name]: e.target.value })
  }

  // Agregar nueva característica
  const agregar = (e) => {
    e.preventDefault()
    if (!nueva.nombre.trim() || !nueva.icono.trim()) {
      alert('Completá todos los campos.')
      return
    }
    const actualizadas = [...caracteristicas, nueva]
    setCaracteristicas(actualizadas)
    localStorage.setItem('caracteristicas', JSON.stringify(actualizadas))
    setNueva({ nombre: '', icono: '' })
  }

  // Eliminar una característica
  const eliminar = (index) => {
    const actualizadas = caracteristicas.filter((_, i) => i !== index)
    setCaracteristicas(actualizadas)
    localStorage.setItem('caracteristicas', JSON.stringify(actualizadas))
  }

  return (
    <div style={{ marginTop: '2rem' }}>
      <h2>Administrar Características</h2>

      <form onSubmit={agregar} style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <input
          type="text"
          name="nombre"
          placeholder="Ej: WiFi"
          value={nueva.nombre}
          onChange={handleChange}
        />
        <input
          type="text"
          name="icono"
          placeholder="Emoji o ícono (Ej: 📶)"
          value={nueva.icono}
          onChange={handleChange}
          style={{ width: '4rem', textAlign: 'center' }}
        />
        <button type="submit">Agregar</button>
      </form>

      <ul style={{ marginTop: '1rem', listStyle: 'none', padding: 0 }}>
        {caracteristicas.map((c, i) => (
          <li key={i} style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.2rem' }}>{c.icono}</span>
            <span>{c.nombre}</span>
            <button onClick={() => eliminar(i)} style={{ marginLeft: 'auto' }}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FeatureAdmin
