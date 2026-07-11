import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { login } from '../services/usuarios'

const dominiosLogin = ['@inacap.cl', '@inacapmail.cl', '@gmail.com']

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorEmail, setErrorEmail] = useState('')
    const [errorPassword, setErrorPassword] = useState('')
    const navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault()
        setErrorEmail('')
        setErrorPassword('')

        const emailLimpio = email.trim().toLowerCase()
        const esAdmin = emailLimpio === 'admin@inacap.cl'
        let valido = true

        if (!emailLimpio || emailLimpio.length > 100 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailLimpio) || !dominiosLogin.some(d => emailLimpio.endsWith(d))) {
            setErrorEmail('Correo inválido. Dominios permitidos: @gmail.com, @inacap.cl, @inacapmail.cl.')
            valido = false
        }

        if (!password) {
            setErrorPassword('Ingresa tu contraseña.')
            valido = false
        } else if (!esAdmin && (password.length < 4 || password.length > 10)) {
            setErrorPassword('La contraseña debe tener entre 4 y 10 caracteres.')
            valido = false
        }

        if (!valido) return

        const resultado = login(emailLimpio, password)
        if (!resultado.ok) {
            if (resultado.error === 'email') setErrorEmail('No existe una cuenta con ese correo. Regístrate primero.')
            else setErrorPassword('Contraseña incorrecta. Intenta nuevamente.')
            return
        }

        navigate(resultado.sesion.rol === 'Administrador' ? '/admin' : '/')
    }

    return (
        <div className="container py-5" style={{ maxWidth: '480px' }}>
            <h1 className="fw-bold mb-4">Iniciar Sesión</h1>
            <form onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                    <label className="form-label">Correo</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    {errorEmail && <div className="text-danger small mt-1">{errorEmail}</div>}
                </div>
                <div className="mb-3">
                    <label className="form-label">Contraseña</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    {errorPassword && <div className="text-danger small mt-1">{errorPassword}</div>}
                </div>
                <button type="submit" className="btn btn-success w-100">Entrar</button>
            </form>
            <p className="text-center mt-3">
                ¿No tienes cuenta? <Link to="/registro">Regístrate</Link>
            </p>
        </div>
    )
}

export default Login
