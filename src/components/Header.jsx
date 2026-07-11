import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getSesion, cerrarSesion } from '../services/usuarios'
import { contarItems } from '../services/carrito'

function Header() {
    const [menuAbierto, setMenuAbierto] = useState(false)
    const [sesion, setSesion] = useState(getSesion())
    const [totalCarrito, setTotalCarrito] = useState(contarItems())
    const navigate = useNavigate()

    useEffect(() => {
        function actualizar() {
            setSesion(getSesion())
            setTotalCarrito(contarItems())
        }
        window.addEventListener('storage', actualizar)
        actualizar()
        return () => window.removeEventListener('storage', actualizar)
    }, [])

    function handleLogout() {
        cerrarSesion()
        setSesion(null)
        navigate('/login')
    }

    return (
        <header className="navbar navbar-expand-lg bg-white shadow-sm sticky-top">
            <div className="container">
                <Link className="navbar-brand fw-bold d-flex align-items-center gap-2" to="/">
                    <img src="/assets/logo.jpg" alt="Logo HuertoHogar" style={{ height: '36px', borderRadius: '50%' }} />
                    HuertoHogar
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    onClick={() => setMenuAbierto(!menuAbierto)}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`collapse navbar-collapse ${menuAbierto ? 'show' : ''}`}>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/productos">Productos</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/categorias">Categorías</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/ofertas">Ofertas</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/nosotros">Nosotros</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/blog">Blog</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/contacto">Contacto</Link></li>
                    </ul>
                    <ul className="navbar-nav align-items-lg-center">
                        <li className="nav-item">
                            <Link className="nav-link position-relative" to="/carrito">
                                🛒 Carrito
                                {totalCarrito > 0 && (
                                    <span className="badge bg-success ms-1">{totalCarrito}</span>
                                )}
                            </Link>
                        </li>
                        {sesion ? (
                            <>
                                {sesion.rol === 'Administrador' && (
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/admin">Admin</Link>
                                    </li>
                                )}
                                <li className="nav-item d-flex align-items-center gap-2">
                                    <span className="text-muted small">{sesion.nombre}</span>
                                    <button className="btn btn-outline-secondary btn-sm" onClick={handleLogout}>
                                        Salir
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item"><Link className="nav-link" to="/login">Iniciar sesión</Link></li>
                                <li className="nav-item"><Link className="nav-link" to="/registro">Registrarse</Link></li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </header>
    )
}

export default Header
