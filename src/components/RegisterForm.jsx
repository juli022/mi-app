import { useState } from 'react'

function RegisterForm() {
  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mensaje, setMensaje] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || []

    const yaExiste = usuarios.some((u) => u.email === email)
    if (yaExiste) {
      setMensaje('Este email ya está registrado.')
      return
    }

    const nuevoUsuario = {
      nombre,
      apellido,
      email,
      password,
      rol: 'usuario'
    }

    usuarios.push(nuevoUsuario)
    localStorage.setItem('usuarios', JSON.stringify(usuarios))
    localStorage.setItem('usuarioActual', JSON.stringify(nuevoUsuario))
    setMensaje('¡Registro exitoso! Ahora estás logueada como usuaria.')
    
    // Limpiar campos
    setNombre('')
    setApellido('')
    setEmail('')
    setPassword('')
  }

  return (
    <div style={{
      maxWidth: 400,
      margin: '2rem auto',
      padding: '2rem',
      backgroundColor: '#2a2a2a',
      borderRadius: '10px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
    }}>
      <h2 style={{ textAlign: 'center' }}>Formulario de Registro</h2>
      <form onSubmit={handleSubmit}>
        <label>Nombre</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Tu nombre"
        />

        <label>Apellido</label>
        <input
          type="text"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
          placeholder="Tu apellido"
        />

        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo electrónico"
        />

        <label>Contraseña</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
        />

        <button type="submit" style={{ width: '100%', marginTop: '1rem' }}>
          Registrarse
        </button>
      </form>

      {mensaje && (
        <p
          style={{
            marginTop: '1rem',
            color: mensaje.includes('exitoso') ? 'var(--color-success)' : 'var(--color-danger)',
            textAlign: 'center'
          }}
        >
          {mensaje}
        </p>
      )}
    </div>
  )
}

export default RegisterForm
