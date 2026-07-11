import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { getProductoPorCodigo } from '../services/api'
import { agregarAlCarrito } from '../services/carrito'

function Detalle() {
    const { codigo } = useParams()
    const navigate = useNavigate()
    const [producto, setProducto] = useState(null)
    const [cantidad, setCantidad] = useState(1)

    useEffect(() => {
        setProducto(getProductoPorCodigo(codigo))
    }, [codigo])

    if (!producto) {
        return (
            <div className="container py-5 text-center">
                <p>Producto no encontrado.</p>
                <Link to="/productos" className="btn btn-success">Volver a Productos</Link>
            </div>
        )
    }

    function handleAgregar() {
        const resultado = agregarAlCarrito(producto, cantidad)
        if (!resultado.ok) {
            alert(`Solo hay ${producto.stock} unidades disponibles.`)
            return
        }
        alert(`"${producto.nombre}" añadido al carrito ✓`)
    }

    return (
        <div className="container py-5">
            <div className="row g-4">
                <div className="col-md-6">
                    <img src={producto.imagen} alt={producto.nombre} className="img-fluid rounded" />
                </div>
                <div className="col-md-6">
                    <span className="badge bg-light text-dark mb-2">{producto.categoria}</span>
                    <h1 className="fw-bold">{producto.nombre}</h1>
                    <p className="text-muted">{producto.descripcion}</p>
                    <p><strong>Origen:</strong> {producto.origen}</p>
                    <p className="fs-4 fw-bold">${producto.precio.toLocaleString('es-CL')} / {producto.unidad}</p>
                    <p>
                        {producto.stock === 0
                            ? <span className="text-danger">Agotado</span>
                            : <span className="text-success">En stock ({producto.stock} {producto.unidad})</span>}
                    </p>

                    {producto.stock > 0 && (
                        <div className="d-flex align-items-center gap-2 mb-3">
                            <button className="btn btn-outline-secondary" onClick={() => setCantidad(Math.max(1, cantidad - 1))}>-</button>
                            <span>{cantidad}</span>
                            <button className="btn btn-outline-secondary" onClick={() => setCantidad(Math.min(producto.stock, cantidad + 1))}>+</button>
                        </div>
                    )}

                    <div className="d-flex gap-2">
                        <button className="btn btn-success" disabled={producto.stock === 0} onClick={handleAgregar}>
                            Agregar al Carrito
                        </button>
                        <button className="btn btn-outline-secondary" onClick={() => navigate('/productos')}>
                            Volver a Productos
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Detalle
