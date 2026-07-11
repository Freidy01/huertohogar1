import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getProductos } from '../services/api'
import { agregarAlCarrito } from '../services/carrito'
import ProductoCard from '../components/ProductoCard'

const categorias = [
    { valor: 'all', label: 'Todos' },
    { valor: 'frutas', label: 'Frutas' },
    { valor: 'verduras', label: 'Verduras' },
    { valor: 'organicos', label: 'Orgánicos' },
    { valor: 'lacteos', label: 'Lácteos' }
]

function Home() {
    const [productos, setProductos] = useState([])
    const [filtro, setFiltro] = useState('all')

    useEffect(() => {
        setProductos(getProductos())
    }, [])

    function handleAgregar(producto) {
        const resultado = agregarAlCarrito(producto, 1)
        if (!resultado.ok) {
            alert(`Sin más stock disponible para "${producto.nombre}".`)
            return
        }
        alert(`"${producto.nombre}" añadido al carrito ✓`)
    }

    const lista = filtro === 'all' ? productos : productos.filter(p => p.categoria === filtro)

    return (
        <div>
            <section className="bg-success bg-opacity-10 py-5 text-center">
                <div className="container">
                    <h1 className="fw-bold">Del Campo Chileno<br />Directo a tu Mesa</h1>
                    <p className="lead">Productos frescos, naturales y de temporada. Apoyamos a agricultores locales para llevar lo mejor de la tierra a tu hogar.</p>
                    <Link to="/productos" className="btn btn-success btn-lg mb-3">Ver Cosecha de Hoy</Link>
                    <div className="d-flex flex-wrap gap-2 justify-content-center">
                        <span className="badge bg-success">🌱 100% Natural</span>
                        <span className="badge bg-success">🚚 Despacho Gratis en RM</span>
                        <span className="badge bg-success">🤝 Agricultores Locales</span>
                    </div>
                </div>
            </section>

            <div className="row text-center g-3 py-4 container mx-auto">
                <div className="col-6 col-md-3">✅ Sin intermediarios</div>
                <div className="col-6 col-md-3">🌿 Productos orgánicos</div>
                <div className="col-6 col-md-3">📦 Despacho a todo Chile</div>
                <div className="col-6 col-md-3">⭐ Calidad garantizada</div>
            </div>

            <section className="container py-5">
                <h2 className="text-center fw-bold">Productos Destacados</h2>
                <p className="text-center text-muted">Lo mejor de nuestra cosecha, seleccionado para ti</p>
                <div className="d-flex flex-wrap gap-2 justify-content-center mb-4">
                    {categorias.map(c => (
                        <button
                            key={c.valor}
                            className={`btn btn-sm ${filtro === c.valor ? 'btn-success' : 'btn-outline-success'}`}
                            onClick={() => setFiltro(c.valor)}
                        >
                            {c.label}
                        </button>
                    ))}
                </div>

                <div className="row g-4">
                    {lista.map(p => (
                        <div className="col-sm-6 col-lg-4" key={p.codigo}>
                            <ProductoCard producto={p} onAgregar={handleAgregar} />
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}

export default Home
