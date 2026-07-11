import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getOfertas, precioFinal } from '../services/api'
import { agregarAlCarrito } from '../services/carrito'

function Ofertas() {
    const [ofertas, setOfertas] = useState([])

    useEffect(() => {
        setOfertas(getOfertas())
    }, [])

    function handleAgregar(producto) {
        const productoConDescuento = { ...producto, precio: precioFinal(producto) }
        const resultado = agregarAlCarrito(productoConDescuento, 1)
        if (!resultado.ok) {
            alert(`Sin más stock disponible para "${producto.nombre}".`)
            return
        }
        alert(`"${producto.nombre}" añadido al carrito con descuento ✓`)
    }

    return (
        <div>
            <section className="bg-danger bg-opacity-10 py-5 text-center">
                <div className="container">
                    <h1 className="fw-bold">🔥 Ofertas</h1>
                    <p className="lead">Aprovecha estos precios especiales por tiempo limitado</p>
                </div>
            </section>

            <section className="container py-5">
                {ofertas.length === 0 ? (
                    <p className="text-center text-muted">No hay ofertas activas por el momento.</p>
                ) : (
                    <div className="row g-4">
                        {ofertas.map(p => (
                            <div className="col-sm-6 col-lg-4" key={p.codigo}>
                                <div className="card h-100 shadow-sm border-danger">
                                    <div className="card-body d-flex flex-column">
                                        <span className="badge bg-danger mb-2 align-self-start">-{p.descuento}%</span>
                                        <h5 className="card-title">{p.nombre}</h5>
                                        <p className="card-text small text-muted flex-grow-1">{p.descripcion}</p>
                                        <div className="mb-2">
                                            <span className="text-decoration-line-through text-muted me-2">
                                                ${p.precio.toLocaleString('es-CL')}
                                            </span>
                                            <span className="fw-bold text-danger fs-5">
                                                ${precioFinal(p).toLocaleString('es-CL')}
                                            </span>
                                            <span className="text-muted"> / {p.unidad}</span>
                                        </div>
                                        <div className="d-grid gap-2">
                                            <Link to={`/productos/${p.codigo}`} className="btn btn-outline-danger btn-sm">Ver Detalle</Link>
                                            <button className="btn btn-danger btn-sm" onClick={() => handleAgregar(p)}>
                                                + Agregar al Carrito
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    )
}

export default Ofertas
