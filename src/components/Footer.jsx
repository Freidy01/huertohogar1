import { Link } from 'react-router-dom'

function Footer() {
    return (
        <footer className="bg-dark text-white pt-5 pb-3 mt-5">
            <div className="container">
                <div className="row g-4">
                    <div className="col-md-4">
                        <h5 className="fw-bold">🌿 HuertoHogar</h5>
                        <p className="text-white-50 small">
                            Conectamos lo mejor del campo chileno con tu hogar. Productos frescos, naturales y de temporada, directo del agricultor a ti.
                        </p>
                    </div>
                    <div className="col-md-4">
                        <h6 className="fw-bold">Navegación</h6>
                        <ul className="list-unstyled">
                            <li><Link className="text-white-50 text-decoration-none" to="/">Inicio</Link></li>
                            <li><Link className="text-white-50 text-decoration-none" to="/nosotros">Nosotros</Link></li>
                            <li><Link className="text-white-50 text-decoration-none" to="/productos">Productos</Link></li>
                            <li><Link className="text-white-50 text-decoration-none" to="/blog">Blog</Link></li>
                            <li><Link className="text-white-50 text-decoration-none" to="/contacto">Contacto</Link></li>
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <h6 className="fw-bold">Mi Cuenta</h6>
                        <ul className="list-unstyled">
                            <li><Link className="text-white-50 text-decoration-none" to="/registro">Registrarse</Link></li>
                            <li><Link className="text-white-50 text-decoration-none" to="/login">Iniciar Sesión</Link></li>
                            <li><Link className="text-white-50 text-decoration-none" to="/carrito">Mi Carrito</Link></li>
                            <li><Link className="text-white-50 text-decoration-none" to="/admin">Admin</Link></li>
                        </ul>
                    </div>
                </div>
                <hr className="border-secondary" />
                <p className="text-center text-white-50 small mb-0">
                    &copy; 2026 HuertoHogar. Todos los derechos reservados.
                </p>
            </div>
        </footer>
    )
}

export default Footer
