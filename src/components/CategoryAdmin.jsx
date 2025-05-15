import { useState, useEffect } from 'react'

function CategoryAdmin() {
  const [categorias, setCategorias] = useState([])
  const [nuevaCategoria, setNuevaCategoria] = useState({
    titulo: '',
    descripcion: '',
    imagen: ''
  })

  useEffect(() => {
    const datos = JSON.parse(localStorage.getItem('categorias')) || []
    setCategorias(datos)
  }, [])

  const handleChange = (e) => {
    setNuevaCategoria({
      ...nuevaCategoria,
      [e.target.name]: e.target.value
    })
  }

  const agregarCategoria = (e) => {
    e.preventDefault()
    if (
      !nuevaCategoria.titulo.trim() ||
      !nuevaCategoria.descripcion.trim() ||
      !nuevaCategoria.imagen.trim()
    ) return alert('Completá todos los campos.')

    const actualizadas = [...categorias, nuevaCategoria]
    setCategorias(actualizadas)
    localStorage.setItem('categorias', JSON.stringify(actualizadas))
    setNuevaCategoria({ titulo: '', descripcion: '', imagen: '' })
  }

  return (
    <div style={{ marginTop: '2rem' }}>
      <h2>Administrar Categorías</h2>
      <form onSubmit={agregarCategoria}>
        <input
          type="text"
          name="titulo"
          placeholder="Título"
          value={nuevaCategoria.titulo}
          onChange={handleChange}
        />
        <input
          type="text"
          name="descripcion"
          placeholder="Descripción"
          value={nuevaCategoria.descripcion}
          onChange={handleChange}
        />
        <input
          type="text"
          name="imagen"
          placeholder="URL de imagen"
          value={nuevaCategoria.imagen}
          onChange={handleChange}
        />
        <button type="submit">Agregar categoría</button>
      </form>

      <ul style={{ marginTop: '1rem' }}>
        {categorias.map((cat, i) => (
          <li key={i} style={{ marginBottom: '1rem' }}>
            <strong>{cat.titulo}</strong> - {cat.descripcion}
            <br />
            <img src={cat.imagen} alt={cat.titulo} width={150} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CategoryAdmin
