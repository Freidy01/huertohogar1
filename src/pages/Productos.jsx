import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
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

function Productos() {
    const [productos, setProductos] = useState([])
    const [searchParams, setSearchParams] = useSearchParams()
    const filtro = searchParams.get('categoria') || 'all'

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

    function cambiarFiltro(valor) {
        if (valor === 'all') setSearchParams({})
        else setSearchParams({ categoria: valor })
    }

    const lista = filtro === 'all' ? productos : productos.filter(p => p.categoria === filtro)

    return (
        <div className="container py-5">
            <h1 className="fw-bold mb-4">Nuestros Productos</h1>

            <div className="d-flex flex-wrap gap-2 mb-4">
                {categorias.map(c => (
                    <button
                        key={c.valor}
                        className={`btn btn-sm ${filtro === c.valor ? 'btn-success' : 'btn-outline-success'}`}
                        onClick={() => cambiarFiltro(c.valor)}
                    >
                        {c.label}
                    </button>
                ))}
            </div>

            {lista.length === 0 ? (
                <p className="text-muted">No hay productos en esta categoría.</p>
            ) : (
                <div className="row g-4">
                    {lista.map(p => (
                        <div className="col-sm-6 col-lg-4" key={p.codigo}>
                            <ProductoCard producto={p} onAgregar={handleAgregar} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Productos
