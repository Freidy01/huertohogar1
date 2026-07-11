import { Link } from 'react-router-dom'

function ProductoCard({ producto, onAgregar }) {
    let stockHTML
    if (producto.stock === 0) {
        stockHTML = <span className="text-danger fw-semibold">⚠ Agotado</span>
    } else if (producto.stock <= (producto.stockCritico ?? 5)) {
        stockHTML = <span className="text-warning fw-semibold">⚠ Solo quedan {producto.stock}</span>
    } else {
        stockHTML = <span className="text-success fw-semibold">✓ En stock ({producto.stock} {producto.unidad})</span>
    }

    return (
        <div className="card h-100 shadow-sm">
            <div className="card-body d-flex flex-column">
                <span className="badge bg-light text-dark mb-2 align-self-start">{producto.categoria}</span>
                <h5 className="card-title">{producto.nombre}</h5>
                <p className="card-text small text-muted flex-grow-1">{producto.descripcion}</p>
                <div className="fw-bold mb-1">${producto.precio.toLocaleString('es-CL')} / {producto.unidad}</div>
                <div className="mb-3">{stockHTML}</div>
                <div className="d-grid gap-2">
                    <Link to={`/productos/${producto.codigo}`} className="btn btn-outline-success btn-sm">
                        Ver Detalle
                    </Link>
                    <button
                        className="btn btn-success btn-sm"
                        disabled={producto.stock === 0}
                        onClick={() => onAgregar(producto)}
                    >
                        {producto.stock === 0 ? 'Sin Stock' : '+ Agregar al Carrito'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductoCard
