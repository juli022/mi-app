import { useState } from 'react'
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore'
import { db } from '../firebase'
import Alerta from './Alerta'

function RegisterForm({ onRegister }) {
  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMensaje('')

    if (!nombre.trim() || !apellido.trim() || !email.trim() || !password.trim()) {
      setMensaje('Completá todos los campos.')
      setError(true)
      return
    }

    try {
      // Verificar si el email ya existe
      const q = query(collection(db, 'usuarios'), where('email', '==', email))
      const querySnapshot = await getDocs(q)

      if (!querySnapshot.empty) {
        setMensaje('Este email ya está registrado.')
        setError(true)
        return
      }

      // Crear nuevo usuario en Firestore
      const nuevoUsuario = {
        nombre,
        apellido,
        email,
        password,
        rol: 'usuario',
      }

      await addDoc(collection(db, 'usuarios'), nuevoUsuario)

      localStorage.setItem('usuarioActual', JSON.stringify(nuevoUsuario))
      setMensaje('¡Registro exitoso! Ahora estás logueada como usuaria.')
      setError(false)

      // Limpiar campos
      setNombre('')
      setApellido('')
      setEmail('')
      setPassword('')

      if (onRegister) onRegister(nuevoUsuario)

    } catch (error) {
      setMensaje('Error al conectar con la base de datos.')
      setError(true)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Formulario de Registro</h2>
      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={e => setNombre(e.target.value)}
      />
      <input
        type="text"
        placeholder="Apellido"
        value={apellido}
        onChange={e => setApellido(e.target.value)}
      />
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
      <button type="submit">Registrarse</button>

      {mensaje && (
        <Alerta tipo={error ? 'error' : 'exito'} mensaje={mensaje} onClose={() => setMensaje('')} />
      )}
    </form>
  )
}

export default RegisterForm
