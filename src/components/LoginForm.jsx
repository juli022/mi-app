import { useState } from 'react'

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mensaje, setMensaje] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || []
    const usuario = usuarios.find(
      (u) => u.email === email && u.password === password
    )

    if (usuario) {
      localStorage.setItem('usuarioActual', JSON.stringify(usuario))
      setMensaje('¡Inicio de sesión exitoso!')
      onLogin(usuario)
    } else {
      setMensaje('Credenciales incorrectas. Revisá tu email y contraseña.')
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto' }}>
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Ingresar</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  )
}

export default LoginForm
