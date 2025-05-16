import { useState, useEffect } from 'react'
import { collection, getDocs, addDoc } from 'firebase/firestore'
import { db } from '../firebase'

function CrearProductoForm() {
  const [categorias, setCategorias] = useState([])
  const [caracteristicas, setCaracteristicas] = useState([])

  const [producto, setProducto] = useState({
    titulo: '',
    categoria: '',
    caracteristicas: [],
    imagen: '',
  })

  useEffect(() => {
    const cargarDatos = async () => {
      const catsSnap = await getDocs(collection(db, 'categorias'))
      const carsSnap = await getDocs(collection(db, 'caracteristicas'))

      setCategorias(catsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })))
      setCaracteristicas(carsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })))
    }
    cargarDatos()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setProducto({ ...producto, [name]: value })
  }

  const handleCheckbox = (e) => {
    const { value, checked } = e.target
    if (checked) {
      setProducto({
        ...producto,
        caracteristicas: [...producto.caracteristicas, value],
      })
    } else {
      setProducto({
        ...producto,
        caracteristicas: producto.caracteristicas.filter(c => c !== value),
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!producto.titulo || !producto.categoria) {
      alert('Completá título y categoría')
      return
    }
    try {
      await addDoc(collection(db, 'productos'), producto)
      alert('Producto guardado!')
      setProducto({ titulo: '', categoria: '', caracteristicas: [], imagen: '' })
    } catch (error) {
      alert('Error al guardar el producto.')
    }
  }

  return (
    <div style={{ marginTop: '2rem', color: 'white' }}>
      <h2>Crear Producto</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
        <input
          type="text"
          name="titulo"
          placeholder="Título del producto"
          value={producto.titulo}
          onChange={handleChange}
          required
        />

        <select
          name="categoria"
          value={producto.categoria}
          onChange={handleChange}
          required
        >
          <option value="">Seleccioná una categoría</option>
          {categorias.map((cat) => (
            <option key={cat.id} value={cat.titulo}>{cat.titulo}</option>
          ))}
        </select>

        <div>
          <label>Características:</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {caracteristicas.map((car) => (
              <label key={car.id} style={{ cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  value={car.nombre}
                  checked={producto.caracteristicas.includes(car.nombre)}
                  onChange={handleCheckbox}
                />
                {' '}{car.icono} {car.nombre}
              </label>
            ))}
          </div>
        </div>

        <input
          type="text"
          name="imagen"
          placeholder="URL de la imagen"
          value={producto.imagen}
          onChange={handleChange}
        />

        <button type="submit">Guardar Producto</button>
      </form>
    </div>
  )
}

export default CrearProductoForm
