import { useState } from 'react'

function RegisterForm() {
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: ''
  })

  const [mensaje, setMensaje] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || []
    const yaExiste = usuarios.find(u => u.email === form.email)

    if (yaExiste) {
      setMensaje('Ese usuario ya existe. Probá con otro email.')
      return
    }

    const nuevoUsuario = {
      ...form,
      rol: 'usuario'
    }

    localStorage.setItem('usuarios', JSON.stringify([...usuarios, nuevoUsuario]))
    setMensaje('¡Registro exitoso! Ahora podés iniciar sesión.')
    setForm({ nombre: '', apellido: '', email: '', password: '' })
  }

  return (
    <div style={{ marginTop: '2rem' }}>
      <h3>Formulario de Registro</h3>
      <form onSubmit={handleSubmit}>
        <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} />
        <input name="apellido" placeholder="Apellido" value={form.apellido} onChange={handleChange} />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <input name="password" type="password" placeholder="Contraseña" value={form.password} onChange={handleChange} />
        <button type="submit">Registrarse</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  )
}

export default RegisterForm
