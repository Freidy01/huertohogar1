import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getCarrito, modificarCantidad, eliminarItem, vaciarCarrito } from '../services/carrito'
import { getProductoPorCodigo } from '../services/api'

function Carrito() {
    const [carrito, setCarrito] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        setCarrito(getCarrito())
    }, [])

    function handleModificar(codigo, cambio) {
        const producto = getProductoPorCodigo(codigo)
        const resultado = modificarCantidad(codigo, cambio, producto?.stock)
        if (!resultado.ok && resultado.error === 'stock') {
            alert(`Solo hay ${producto.stock} unidades disponibles.`)
        }
        setCarrito(resultado.carrito)
    }

    function handleEliminar(codigo) {
        const resultado = eliminarItem(codigo)
        setCarrito(resultado.carrito)
    }

    function handleVaciar() {
        if (!confirm('¿Vaciar el carrito?')) return
        setCarrito(vaciarCarrito())
    }

    if (carrito.length === 0) {
        return (
            <div className="container py-5 text-center">
                <p className="fs-5">Tu carrito está vacío.</p>
                <Link to="/productos" className="btn btn-success">Ir a Productos</Link>
            </div>
        )
    }

    const total = carrito.reduce((acc, i) => acc + i.precio * i.cantidad, 0)

    return (
        <div className="container py-5">
            <h1 className="fw-bold mb-4">Tu Carrito</h1>
            <table className="table align-middle">
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Subtotal</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {carrito.map(item => (
                        <tr key={item.codigo}>
                            <td>{item.nombre}</td>
                            <td>${item.precio.toLocaleString('es-CL')}</td>
                            <td>
                                <div className="d-flex align-items-center gap-2">
                                    <button className="btn btn-sm btn-outline-secondary" onClick={() => handleModificar(item.codigo, -1)}>-</button>
                                    <span>{item.cantidad}</span>
                                    <button className="btn btn-sm btn-outline-secondary" onClick={() => handleModificar(item.codigo, 1)}>+</button>
                                </div>
                            </td>
                            <td>${(item.precio * item.cantidad).toLocaleString('es-CL')}</td>
                            <td>
                                <button className="btn btn-sm btn-outline-danger" onClick={() => handleEliminar(item.codigo)}>Quitar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="d-flex justify-content-between align-items-center">
                <button className="btn btn-outline-danger" onClick={handleVaciar}>Vaciar Carrito</button>
                <div className="text-end">
                    <p className="fs-5 mb-2">Total: <strong>${total.toLocaleString('es-CL')}</strong></p>
                    <button className="btn btn-success" onClick={() => navigate('/checkout')}>Continuar a Checkout</button>
                </div>
            </div>
        </div>
    )
}

export default Carrito
