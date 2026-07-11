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
        <div className="container py-5 text-center" style={{ maxWidth: '560px' }}>
            <div className="fs-1 mb-3">✅</div>
            <h1 className="fw-bold text-success">¡Compra Exitosa!</h1>
            <p className="text-muted">Gracias por tu compra, {pedido.nombre}. Te enviaremos la confirmación a {pedido.email}.</p>

            <div className="card p-4 shadow-sm text-start mt-4">
                <p className="mb-1"><strong>N° de Pedido:</strong> {pedido.numero}</p>
                <p className="mb-1"><strong>Fecha:</strong> {pedido.fecha}</p>
                <p className="mb-1"><strong>Entrega:</strong> {pedido.entrega === 'domicilio' ? 'Despacho a domicilio' : 'Retiro en tienda'}</p>
                <p className="mb-3"><strong>Dirección:</strong> {pedido.direccion}</p>
                <hr />
                {pedido.items.map(item => (
                    <div className="d-flex justify-content-between small mb-1" key={item.codigo}>
                        <span>{item.nombre} x{item.cantidad}</span>
                        <span>${(item.precio * item.cantidad).toLocaleString('es-CL')}</span>
                    </div>
                ))}
                <hr />
                <div className="d-flex justify-content-between fw-bold">
                    <span>Total</span>
                    <span>${pedido.total.toLocaleString('es-CL')}</span>
                </div>
            </div>

            <Link to="/" className="btn btn-success mt-4">Volver al Inicio</Link>
        </div>
    )
}

export default CompraExitosa
