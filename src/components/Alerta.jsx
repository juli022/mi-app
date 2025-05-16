function Alerta({ tipo = 'info', mensaje, onClose }) {
  const colores = {
    exito: '#38b000',
    error: '#e63946',
    info: '#0077cc',
    advertencia: '#f4a261',
  }

  const fondo = colores[tipo] || '#0077cc'

  return (
    <div style={{
      backgroundColor: fondo,
      color: 'white',
      padding: '1rem',
      borderRadius: '6px',
      marginBottom: '1rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
      <span>{mensaje}</span>
      {onClose && (
        <button
          onClick={onClose}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'white',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            marginLeft: '1rem'
          }}
        >
          ×
        </button>
      )}
    </div>
  )
}

export default Alerta
