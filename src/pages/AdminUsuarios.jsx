import { useState, useEffect } from 'react'
import { getUsuarios, registrarUsuario, eliminarUsuario, existeRun, existeEmail } from '../services/usuarios'
import { validarRUT, formatoRUTValido } from '../utils/validarRut'

const dominios = ['@inacap.cl', '@profesor.inacap.cl', '@gmail.com']

function AdminUsuarios() {
    const [usuarios, setUsuarios] = useState([])
    const [run, setRun] = useState('')
    const [nombre, setNombre] = useState('')
    const [apellidos, setApellidos] = useState('')
    const [rol, setRol] = useState('Cliente')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [direccion, setDireccion] = useState('')
    const [errores, setErrores] = useState({})
    const [exito, setExito] = useState('')

    useEffect(() => {
        setUsuarios(getUsuarios())
    }, [])

    function handleSubmit(e) {
        e.preventDefault()
        setExito('')
        const runLimpio = run.trim().toUpperCase()
        const emailLimpio = email.trim().toLowerCase()
        const nuevosErrores = {}

        if (!formatoRUTValido(runLimpio) || !validarRUT(runLimpio)) {
            nuevosErrores.run = 'RUN inválido. Sin puntos ni guion (ej: 12345678K).'
        } else if (existeRun(runLimpio)) {
            nuevosErrores.run = 'Ya existe un usuario con ese RUN.'
        }
        if (!nombre.trim() || nombre.length > 50) nuevosErrores.nombre = 'Nombre requerido, máximo 50 caracteres.'
        if (!apellidos.trim() || apellidos.length > 100) nuevosErrores.apellidos = 'Apellidos requeridos, máximo 100 caracteres.'
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailLimpio) || !dominios.some(d => emailLimpio.endsWith(d))) {
            nuevosErrores.email = 'Correo inválido. Dominios: @gmail.com, @inacap.cl, @profesor.inacap.cl'
        } else if (existeEmail(emailLimpio)) {
            nuevosErrores.email = 'Ya existe un usuario con ese correo.'
        }
        if (password.length < 4 || password.length > 10) nuevosErrores.password = 'Contraseña entre 4 y 10 caracteres.'
        if (!direccion.trim() || direccion.length > 300) nuevosErrores.direccion = 'Dirección requerida, máximo 300 caracteres.'

        setErrores(nuevosErrores)
        if (Object.keys(nuevosErrores).length > 0) return

        registrarUsuario({
            run: runLimpio,
            nombre: nombre.trim(),
            apellidos: apellidos.trim(),
            rol,
            email: emailLimpio,
            password,
            direccion: direccion.trim(),
            fecha: new Date().toISOString().split('T')[0]
        })

        setUsuarios(getUsuarios())
        setExito('Usuario creado exitosamente.')
        setRun(''); setNombre(''); setApellidos(''); setRol('Cliente'); setEmail(''); setPassword(''); setDireccion('')
    }

    function handleEliminar(runUsuario) {
        if (!confirm(`¿Eliminar usuario con RUN ${runUsuario}?`)) return
        eliminarUsuario(runUsuario)
        setUsuarios(getUsuarios())
    }

    const badgeClase = { Administrador: 'bg-danger', Vendedor: 'bg-warning text-dark', Cliente: 'bg-secondary' }

    return (
        <div className="container py-5">
            <h1 className="fw-bold mb-4">Mantenedor de Usuarios</h1>
            <div className="row g-4">
                <div className="col-lg-4">
                    <form onSubmit={handleSubmit} noValidate>
                        {exito && <p className="text-success">{exito}</p>}
                        <div className="mb-2">
                            <input className="form-control" placeholder="RUN (Ej: 12345678K)" value={run} onChange={e => setRun(e.target.value)} />
                            {errores.run && <div className="text-danger small">{errores.run}</div>}
                        </div>
                        <div className="mb-2">
                            <input className="form-control" placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} />
                            {errores.nombre && <div className="text-danger small">{errores.nombre}</div>}
                        </div>
                        <div className="mb-2">
                            <input className="form-control" placeholder="Apellidos" value={apellidos} onChange={e => setApellidos(e.target.value)} />
                            {errores.apellidos && <div className="text-danger small">{errores.apellidos}</div>}
                        </div>
                        <div className="mb-2">
                            <select className="form-select" value={rol} onChange={e => setRol(e.target.value)}>
                                <option value="Cliente">Cliente</option>
                                <option value="Vendedor">Vendedor</option>
                                <option value="Administrador">Administrador</option>
                            </select>
                        </div>
                        <div className="mb-2">
                            <input type="email" className="form-control" placeholder="Correo" value={email} onChange={e => setEmail(e.target.value)} />
                            {errores.email && <div className="text-danger small">{errores.email}</div>}
                        </div>
                        <div className="mb-2">
                            <input type="password" className="form-control" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} />
                            {errores.password && <div className="text-danger small">{errores.password}</div>}
                        </div>
                        <div className="mb-3">
                            <input className="form-control" placeholder="Dirección" value={direccion} onChange={e => setDireccion(e.target.value)} />
                            {errores.direccion && <div className="text-danger small">{errores.direccion}</div>}
                        </div>
                        <button type="submit" className="btn btn-success w-100">Crear Usuario</button>
                    </form>
                </div>
                <div className="col-lg-8">
                    <table className="table align-middle">
                        <thead>
                            <tr>
                                <th>RUN</th>
                                <th>Nombre</th>
                                <th>Rol</th>
                                <th>Correo</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuarios.length === 0 ? (
                                <tr><td colSpan="5" className="text-center text-muted py-4">No hay usuarios registrados.</td></tr>
                            ) : usuarios.map(u => (
                                <tr key={u.run}>
                                    <td><strong>{u.run}</strong></td>
                                    <td>{u.nombre} {u.apellidos}</td>
                                    <td><span className={`badge ${badgeClase[u.rol]}`}>{u.rol}</span></td>
                                    <td>{u.email}</td>
                                    <td><button className="btn btn-sm btn-outline-danger" onClick={() => handleEliminar(u.run)}>Eliminar</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default AdminUsuarios
