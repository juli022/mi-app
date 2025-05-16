import { useState } from 'react'
import Alerta from './Alerta'

function RegisterForm() {
  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setMensaje('')

    if (!nombre || !apellido || !email || !password) {
      setMensaje('Completá todos los campos.')
      setError(true)
      return
    }

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || []
    const yaExiste = usuarios.some((u) => u.email === email)

    if (yaExiste) {
      setMensaje('Este email ya está registrado.')
      setError(true)
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
    setError(false)

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

      {mensaje && (
        <Alerta
          tipo={error ? 'error' : 'exito'}
          mensaje={mensaje}
          onClose={() => setMensaje('')}
        />
      )}

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
    </div>
  )
}

export default RegisterForm
