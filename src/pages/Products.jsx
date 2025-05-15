import ListaProductos from '../components/ListaProductos'

function Products() {
  return (
    <div style={{ padding: '2rem', color: 'white', minHeight: '100vh', backgroundColor: '#1e1e1e' }}>
      <h1>Estos son los productos</h1>
      <ListaProductos />
    </div>
  )
}

export default Products
