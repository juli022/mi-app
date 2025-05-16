import { useState } from 'react'

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setMensaje('')

    if (!email.trim() || !password.trim()) {
      setMensaje('Completá todos los campos.')
      setError(true)
      return
    }

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || []

    // Buscar usuario ignorando mayúsculas y espacios en email
    const usuario = usuarios.find(
      u => u.email.trim().toLowerCase() === email.trim().toLowerCase() && u.password === password
    )

    if (usuario) {
      localStorage.setItem('usuarioActual', JSON.stringify(usuario))
      setMensaje('¡Inicio de sesión exitoso!')
      setError(false)
      onLogin(usuario)
    } else {
      setMensaje('Credenciales incorrectas. Revisá tu email y contraseña.')
      setError(true)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Iniciar sesión</h2>
      <input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button type="submit">Ingresar</button>

      {mensaje && (
        <p className={error ? 'mensaje-error' : 'mensaje-exito'}>
          {mensaje}
        </p>
      )}
    </form>
  )
}

export default LoginForm
