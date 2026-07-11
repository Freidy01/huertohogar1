import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { registrarUsuario, existeRun, existeEmail } from '../services/usuarios'
import { validarRUT, formatoRUTValido } from '../utils/validarRut'
import { chileGeografia } from '../utils/chileGeografia'

const dominios = ['@inacap.cl', '@inacapmail.cl', '@profesor.inacap.cl', '@gmail.com']

function Registro() {
    const [run, setRun] = useState('')
    const [nombre, setNombre] = useState('')
    const [apellidos, setApellidos] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [region, setRegion] = useState('')
    const [comuna, setComuna] = useState('')
    const [direccion, setDireccion] = useState('')
    const [errores, setErrores] = useState({})
    const navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault()
        const runLimpio = run.trim().toUpperCase()
        const emailLimpio = email.trim().toLowerCase()
        const nuevosErrores = {}

        if (!formatoRUTValido(runLimpio) || !validarRUT(runLimpio)) {
            nuevosErrores.run = 'RUN inválido. Sin puntos ni guion (ej: 12345678K).'
        }
        if (!nombre.trim()) nuevosErrores.nombre = 'El nombre es obligatorio.'
        else if (nombre.length > 50) nuevosErrores.nombre = 'El nombre no puede superar 50 caracteres.'

        if (!apellidos.trim()) nuevosErrores.apellidos = 'Los apellidos son obligatorios.'
        else if (apellidos.length > 100) nuevosErrores.apellidos = 'Los apellidos no pueden superar 100 caracteres.'

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailLimpio) || !dominios.some(d => emailLimpio.endsWith(d))) {
            nuevosErrores.email = 'Correo inválido. Dominios aceptados: @gmail.com, @inacap.cl, @inacapmail.cl, @profesor.inacap.cl'
        }
        if (password.length < 4 || password.length > 10) {
            nuevosErrores.password = 'La contraseña debe tener entre 4 y 10 caracteres.'
        }
        if (!region) nuevosErrores.region = 'Selecciona una región.'
        if (!comuna) nuevosErrores.comuna = 'Selecciona una comuna.'
        if (!direccion.trim()) nuevosErrores.direccion = 'La dirección es obligatoria.'
        else if (direccion.length > 300) nuevosErrores.direccion = 'La dirección no puede superar 300 caracteres.'

        if (Object.keys(nuevosErrores).length === 0) {
            if (existeRun(runLimpio)) nuevosErrores.run = 'Ya existe una cuenta con ese RUN.'
            else if (existeEmail(emailLimpio)) nuevosErrores.email = 'Ya existe una cuenta con ese correo electrónico.'
        }

        setErrores(nuevosErrores)
        if (Object.keys(nuevosErrores).length > 0) return

        registrarUsuario({
            run: runLimpio,
            nombre: nombre.trim(),
            apellidos: apellidos.trim(),
            rol: 'Cliente',
            email: emailLimpio,
            password,
            region,
            comuna,
            direccion: direccion.trim(),
            fecha: new Date().toISOString().split('T')[0]
        })

        alert('¡Registro exitoso! Bienvenido/a a HuertoHogar. Ya puedes iniciar sesión.')
        navigate('/login')
    }

    return (
        <div className="container py-5" style={{ maxWidth: '560px' }}>
            <h1 className="fw-bold mb-4">Crear Cuenta</h1>
            <form onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                    <label className="form-label">RUN</label>
                    <input className="form-control" placeholder="12345678K" value={run} onChange={e => setRun(e.target.value)} />
                    {errores.run && <div className="text-danger small mt-1">{errores.run}</div>}
                </div>
                <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input className="form-control" value={nombre} onChange={e => setNombre(e.target.value)} />
                    {errores.nombre && <div className="text-danger small mt-1">{errores.nombre}</div>}
                </div>
                <div className="mb-3">
                    <label className="form-label">Apellidos</label>
                    <input className="form-control" value={apellidos} onChange={e => setApellidos(e.target.value)} />
                    {errores.apellidos && <div className="text-danger small mt-1">{errores.apellidos}</div>}
                </div>
                <div className="mb-3">
                    <label className="form-label">Correo</label>
                    <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} />
                    {errores.email && <div className="text-danger small mt-1">{errores.email}</div>}
                </div>
                <div className="mb-3">
                    <label className="form-label">Contraseña</label>
                    <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} />
                    {errores.password && <div className="text-danger small mt-1">{errores.password}</div>}
                </div>
                <div className="mb-3">
                    <label className="form-label">Región</label>
                    <select className="form-select" value={region} onChange={e => { setRegion(e.target.value); setComuna('') }}>
                        <option value="">Selecciona una región</option>
                        {Object.keys(chileGeografia).map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                    {errores.region && <div className="text-danger small mt-1">{errores.region}</div>}
                </div>
                <div className="mb-3">
                    <label className="form-label">Comuna</label>
                    <select className="form-select" value={comuna} onChange={e => setComuna(e.target.value)} disabled={!region}>
                        <option value="">Selecciona una comuna</option>
                        {(chileGeografia[region] || []).map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    {errores.comuna && <div className="text-danger small mt-1">{errores.comuna}</div>}
                </div>
                <div className="mb-3">
                    <label className="form-label">Dirección</label>
                    <input className="form-control" value={direccion} onChange={e => setDireccion(e.target.value)} />
                    {errores.direccion && <div className="text-danger small mt-1">{errores.direccion}</div>}
                </div>
                <button type="submit" className="btn btn-success w-100">Registrarme</button>
            </form>
            <p className="text-center mt-3">
                ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
            </p>
        </div>
    )
}

export default Registro
