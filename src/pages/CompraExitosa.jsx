import { useEffect, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { getPedidoPorNumero, getUltimoPedido } from '../services/pedidos'

function CompraExitosa() {
    const [pedido, setPedido] = useState(null)
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const numero = location.state?.numero
        const encontrado = numero ? getPedidoPorNumero(numero) : getUltimoPedido()

        if (!encontrado) {
            navigate('/')
            return
        }
        setPedido(encontrado)
    }, [location, navigate])

    if (!pedido) return null

    return (
        <div className="container py-5" style={{ maxWidth: '640px' }}>
            <div className="text-center mb-4">
                <div className="fs-1 mb-3">✅</div>
                <h1 className="fw-bold text-success">¡Compra Exitosa! nro {pedido.numero}</h1>
                <p className="text-muted">Gracias por tu compra, {pedido.nombre}. Te enviaremos la confirmación a {pedido.email}.</p>
            </div>

            <div className="card p-4 shadow-sm">
                <p className="mb-1"><strong>Fecha:</strong> {pedido.fecha}</p>
                <p className="mb-1"><strong>Entrega:</strong> {pedido.entrega === 'domicilio' ? 'Despacho a domicilio' : 'Retiro en tienda'}</p>
                <p className="mb-3"><strong>Dirección:</strong> {pedido.direccion}</p>
                <hr />
                <table className="table table-sm align-middle">
                    <thead>
                        <tr><th>Imagen</th><th>Nombre</th><th>Precio</th><th>Cant.</th><th>Subtotal</th></tr>
                    </thead>
                    <tbody>
                        {pedido.items.map(item => (
                            <tr key={item.codigo}>
                                <td><img src={item.imagen} alt={item.nombre} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} /></td>
                                <td className="small">{item.nombre}</td>
                                <td className="small">${item.precio.toLocaleString('es-CL')}</td>
                                <td className="small">{item.cantidad}</td>
                                <td className="small">${(item.precio * item.cantidad).toLocaleString('es-CL')}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <hr />
                <div className="d-flex justify-content-between fw-bold fs-5">
                    <span>Total pagado</span>
                    <span>${pedido.total.toLocaleString('es-CL')}</span>
                </div>
            </div>

            <div className="text-center mt-4">
                <Link to="/" className="btn btn-success">Volver al Inicio</Link>
            </div>
        </div>
    )
}

export default CompraExitosa
