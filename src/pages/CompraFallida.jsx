import { Link, useNavigate } from 'react-router-dom'

function CompraFallida() {
    const navigate = useNavigate()

    return (
        <div className="container py-5 text-center" style={{ maxWidth: '520px' }}>
            <div className="fs-1 mb-3">❌</div>
            <h1 className="fw-bold text-danger">No se pudo procesar el pago</h1>
            <p className="text-muted">
                Hubo un problema al validar tu método de pago. No se realizó ningún cargo. Puedes intentarlo nuevamente o elegir otro método de pago.
            </p>
            <div className="d-flex gap-2 justify-content-center mt-4">
                <button className="btn btn-success" onClick={() => navigate('/checkout')}>Reintentar Pago</button>
                <Link to="/carrito" className="btn btn-outline-secondary">Volver al Carrito</Link>
            </div>
        </div>
    )
}

export default CompraFallida
