import { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

function ListaProductos() {
  const [productos, setProductos] = useState([])
  const [categoriasUnicas, setCategoriasUnicas] = useState([])
  const [caracteristicasUnicas, setCaracteristicasUnicas] = useState([])
  const [filtroCategoria, setFiltroCategoria] = useState('')
  const [filtroCaracteristicas, setFiltroCaracteristicas] = useState([])

  useEffect(() => {
    const fetchProductos = async () => {
      const querySnapshot = await getDocs(collection(db, 'productos'))
      const lista = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setProductos(lista)

      const categorias = [...new Set(lista.map(p => p.categoria))]
      setCategoriasUnicas(categorias)

      const todasCaracteristicas = lista.flatMap(p => p.caracteristicas)
      const caracteristicas = [...new Set(todasCaracteristicas)]
      setCaracteristicasUnicas(caracteristicas)
    }

    fetchProductos()
  }, [])

  const handleCategoriaChange = (e) => setFiltroCategoria(e.target.value)

  const handleCaracteristicaChange = (e) => {
    const valor = e.target.value
    setFiltroCaracteristicas(prev =>
      prev.includes(valor)
        ? prev.filter(c => c !== valor)
        : [...prev, valor]
    )
  }

  const productosFiltrados = productos.filter(p => {
    if (filtroCategoria && p.categoria !== filtroCategoria) return false
    if (filtroCaracteristicas.length > 0) {
      return filtroCaracteristicas.every(fc => p.caracteristicas.includes(fc))
    }
    return true
  })

  return (
    <div style={{ marginTop: '2rem', color: 'white' }}>
      <h2>Productos Disponibles</h2>

      <div style={{ marginBottom: '1.5rem' }}>
        <label>
          Filtrar por categoría:{' '}
          <select value={filtroCategoria} onChange={handleCategoriaChange}>
            <option value="">Todas</option>
            {categoriasUnicas.map((cat, i) => (
              <option key={i} value={cat}>{cat}</option>
            ))}
          </select>
        </label>

        <div style={{ marginTop: '0.5rem' }}>
          <span>Filtrar por características:</span>
          {caracteristicasUnicas.map((car, i) => (
            <label key={i} style={{ marginLeft: '1rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                value={car}
                checked={filtroCaracteristicas.includes(car)}
                onChange={handleCaracteristicaChange}
              />{' '}{car}
            </label>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
        {productosFiltrados.length === 0 ? (
          <p>No hay productos que coincidan con los filtros.</p>
        ) : (
          productosFiltrados.map((p) => (
            <Link
              to={`/productos/${p.id}`}
              key={p.id}
              style={{
                textDecoration: 'none',
                color: 'inherit',
                width: '280px',
                backgroundColor: '#2a2a2a',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-6px)'
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.6)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.4)'
              }}
            >
              {p.imagen && (
                <img
                  src={p.imagen}
                  alt={p.titulo}
                  style={{
                    width: '100%',
                    height: '180px',
                    objectFit: 'cover',
                    borderBottom: '1px solid #444'
                  }}
                />
              )}
              <div style={{ padding: '1rem' }}>
                <h3 style={{ marginBottom: '0.4rem' }}>{p.titulo}</h3>
                <p style={{ fontSize: '0.9rem', color: '#bbb' }}>
                  Categoría: <strong>{p.categoria}</strong>
                </p>
                <ul style={{ paddingLeft: '1.2rem', fontSize: '0.9rem', margin: 0, color: '#ddd' }}>
                  {p.caracteristicas.map((car, j) => (
                    <li key={j}>{car}</li>
                  ))}
                </ul>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}

export default ListaProductos
