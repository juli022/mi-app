import { useState, useEffect } from 'react'
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../firebase'

function FeatureAdmin() {
  const [caracteristicas, setCaracteristicas] = useState([])
  const [nueva, setNueva] = useState({ nombre: '', icono: '' })

  useEffect(() => {
    const cargarCaracteristicas = async () => {
      const snapshot = await getDocs(collection(db, 'caracteristicas'))
      const cars = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      setCaracteristicas(cars)
    }
    cargarCaracteristicas()
  }, [])

  const handleChange = (e) => {
    setNueva({ ...nueva, [e.target.name]: e.target.value })
  }

  const agregar = async (e) => {
    e.preventDefault()
    if (!nueva.nombre.trim() || !nueva.icono.trim()) {
      alert('Completá todos los campos.')
      return
    }
    try {
      const docRef = await addDoc(collection(db, 'caracteristicas'), nueva)
      setCaracteristicas([...caracteristicas, { id: docRef.id, ...nueva }])
      setNueva({ nombre: '', icono: '' })
    } catch (error) {
      alert('Error al agregar la característica.')
    }
  }

  const eliminar = async (id) => {
    try {
      await deleteDoc(doc(db, 'caracteristicas', id))
      setCaracteristicas(caracteristicas.filter(c => c.id !== id))
    } catch (error) {
      alert('Error al eliminar la característica.')
    }
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
        {caracteristicas.map((c) => (
          <li key={c.id} style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.2rem' }}>{c.icono}</span>
            <span>{c.nombre}</span>
            <button onClick={() => eliminar(c.id)} style={{ marginLeft: 'auto' }}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FeatureAdmin
