import { useState, useEffect } from 'react'

function CrearProductoForm() {
  const [categorias, setCategorias] = useState([])
  const [caracteristicas, setCaracteristicas] = useState([])

  const [producto, setProducto] = useState({
    titulo: '',
    categoria: '',
    caracteristicas: [],
    imagen: '',
  })

  // Cargar categorías y características desde localStorage
  useEffect(() => {
    const cats = JSON.parse(localStorage.getItem('categorias')) || []
    const cars = JSON.parse(localStorage.getItem('caracteristicas')) || []
    setCategorias(cats)
    setCaracteristicas(cars)
  }, [])

  // Manejar inputs
  const handleChange = (e) => {
    const { name, value } = e.target
    setProducto({ ...producto, [name]: value })
  }

  // Manejar checkbox de características
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
        caracteristicas: producto.caracteristicas.filter((c) => c !== value),
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!producto.titulo || !producto.categoria) {
      alert('Completá título y categoría')
      return
    }
    // Guardar producto en localStorage
    const productosGuardados = JSON.parse(localStorage.getItem('productos')) || []
    localStorage.setItem(
      'productos',
      JSON.stringify([...productosGuardados, producto])
    )
    alert('Producto guardado!')
    setProducto({ titulo: '', categoria: '', caracteristicas: [], imagen: '' })
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
          {categorias.map((cat, i) => (
            <option key={i} value={cat.nombre}>
              {cat.nombre}
            </option>
          ))}
        </select>

        <div>
          <label>Características:</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {caracteristicas.map((car, i) => (
              <label key={i} style={{ cursor: 'pointer' }}>
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
