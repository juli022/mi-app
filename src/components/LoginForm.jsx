import { useState } from 'react'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '../firebase'
import Alerta from './Alerta'

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMensaje('')

    if (!email.trim() || !password.trim()) {
      setMensaje('Completá todos los campos.')
      setError(true)
      return
    }

    try {
      const q = query(collection(db, 'usuarios'), where('email', '==', email), where('password', '==', password))
      const querySnapshot = await getDocs(q)

      if (!querySnapshot.empty) {
        const usuario = querySnapshot.docs[0].data()
        localStorage.setItem('usuarioActual', JSON.stringify(usuario))
        setMensaje('¡Inicio de sesión exitoso!')
        setError(false)
        onLogin(usuario)
      } else {
        setMensaje('Credenciales incorrectas. Revisá tu email y contraseña.')
        setError(true)
      }
    } catch (error) {
      setMensaje('Error al conectar con la base de datos.')
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
        <Alerta tipo={error ? 'error' : 'exito'} mensaje={mensaje} onClose={() => setMensaje('')} />
      )}
    </form>
  )
}

export default LoginForm
