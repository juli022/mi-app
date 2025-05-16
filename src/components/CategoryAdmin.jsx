import { useState, useEffect } from 'react'
import { collection, getDocs, addDoc } from 'firebase/firestore'
import { db } from '../firebase'

function CategoryAdmin() {
  const [categorias, setCategorias] = useState([])
  const [nuevaCategoria, setNuevaCategoria] = useState({
    titulo: '',
    descripcion: '',
    imagen: ''
  })

  // Cargar categorías desde Firestore
  useEffect(() => {
    const cargarCategorias = async () => {
      const snapshot = await getDocs(collection(db, 'categorias'))
      const cats = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      setCategorias(cats)
    }
    cargarCategorias()
  }, [])

  const handleChange = (e) => {
    setNuevaCategoria({
      ...nuevaCategoria,
      [e.target.name]: e.target.value
    })
  }

  const agregarCategoria = async (e) => {
    e.preventDefault()
    if (
      !nuevaCategoria.titulo.trim() ||
      !nuevaCategoria.descripcion.trim() ||
      !nuevaCategoria.imagen.trim()
    ) {
      alert('Completá todos los campos.')
      return
    }
    try {
      const docRef = await addDoc(collection(db, 'categorias'), nuevaCategoria)
      setCategorias([...categorias, { id: docRef.id, ...nuevaCategoria }])
      setNuevaCategoria({ titulo: '', descripcion: '', imagen: '' })
    } catch (error) {
      alert('Error al agregar la categoría.')
    }
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
        {categorias.map((cat) => (
          <li key={cat.id} style={{ marginBottom: '1rem' }}>
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
