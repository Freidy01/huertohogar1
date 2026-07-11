import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { getCarrito, vaciarCarrito } from '../services/carrito'
import { getSesion, getUsuarios } from '../services/usuarios'
import { crearPedido } from '../services/pedidos'
import { chileGeografia } from '../utils/chileGeografia'

function Checkout() {
    const [carrito, setCarrito] = useState([])
    const [nombre, setNombre] = useState('')
    const [email, setEmail] = useState('')
    const [region, setRegion] = useState('')
    const [comuna, setComuna] = useState('')
    const [direccion, setDireccion] = useState('')
    const [entrega, setEntrega] = useState('domicilio')
    const [pago, setPago] = useState('tarjeta')
    const [errores, setErrores] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        const items = getCarrito()
        setCarrito(items)

        const sesion = getSesion()
        if (sesion) {
            setNombre(sesion.nombre || '')
            setEmail(sesion.email || '')
            const usuarioCompleto = getUsuarios().find(u => u.run === sesion.run)
            if (usuarioCompleto) {
                setRegion(usuarioCompleto.region || '')
                setComuna(usuarioCompleto.comuna || '')
                setDireccion(usuarioCompleto.direccion || '')
            }
        }
    }, [])

    if (carrito.length === 0) {
        return (
            <div className="container py-5 text-center">
                <p className="fs-5">Tu carrito está vacío, no hay nada que pagar.</p>
                <Link to="/productos" className="btn btn-success">Ir a Productos</Link>
            </div>
        )
    }

    const total = carrito.reduce((acc, i) => acc + i.precio * i.cantidad, 0)

    function handleSubmit(e) {
        e.preventDefault()
        const nuevosErrores = {}

        if (!nombre.trim()) nuevosErrores.nombre = 'Ingresa tu nombre.'
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) nuevosErrores.email = 'Ingresa un correo válido.'
        if (!region) nuevosErrores.region = 'Selecciona una región.'
        if (!comuna) nuevosErrores.comuna = 'Selecciona una comuna.'
        if (!direccion.trim()) nuevosErrores.direccion = 'Ingresa tu dirección.'

        setErrores(nuevosErrores)
        if (Object.keys(nuevosErrores).length > 0) return

        const pedido = {
            numero: 'HH-' + Math.floor(100000 + Math.random() * 900000),
            fecha: new Date().toLocaleDateString('es-CL'),
            items: carrito,
            total,
            nombre,
            email,
            direccion: `${direccion}, ${comuna}, ${region}`,
            entrega,
            pago
        }

        const exito = Math.random() > 0.15
        const pedidoCompleto = { ...pedido, estado: exito ? 'Pagado' : 'Fallido' }
        crearPedido(pedidoCompleto)

        if (exito) {
            vaciarCarrito()
            navigate('/compra-exitosa', { state: { numero: pedido.numero } })
        } else {
            navigate('/compra-fallida', { state: { numero: pedido.numero } })
        }
    }

    return (
        <div className="container py-5">
            <h1 className="fw-bold mb-4">Checkout</h1>
            <div className="row g-4">
                <div className="col-md-7">
                    <form onSubmit={handleSubmit} noValidate>
                        <h5 className="fw-bold">Datos de contacto</h5>
                        <div className="mb-3">
                            <label className="form-label">Nombre Completo</label>
                            <input className="form-control" value={nombre} onChange={e => setNombre(e.target.value)} />
                            {errores.nombre && <div className="text-danger small">{errores.nombre}</div>}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Correo</label>
                            <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} />
                            {errores.email && <div className="text-danger small">{errores.email}</div>}
                        </div>

                        <h5 className="fw-bold mt-4">Dirección de envío</h5>
                        <div className="mb-3">
                            <label className="form-label">Región</label>
                            <select className="form-select" value={region} onChange={e => { setRegion(e.target.value); setComuna('') }}>
                                <option value="">Selecciona una región</option>
                                {Object.keys(chileGeografia).map(r => <option key={r} value={r}>{r}</option>)}
                            </select>
                            {errores.region && <div className="text-danger small">{errores.region}</div>}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Comuna</label>
                            <select className="form-select" value={comuna} onChange={e => setComuna(e.target.value)} disabled={!region}>
                                <option value="">Selecciona una comuna</option>
                                {(chileGeografia[region] || []).map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                            {errores.comuna && <div className="text-danger small">{errores.comuna}</div>}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Dirección</label>
                            <input className="form-control" value={direccion} onChange={e => setDireccion(e.target.value)} />
                            {errores.direccion && <div className="text-danger small">{errores.direccion}</div>}
                        </div>

                        <h5 className="fw-bold mt-4">Opciones de entrega</h5>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="entrega" id="domicilio" checked={entrega === 'domicilio'} onChange={() => setEntrega('domicilio')} />
                            <label className="form-check-label" htmlFor="domicilio">Despacho a domicilio (2-4 días hábiles)</label>
                        </div>
                        <div className="form-check mb-3">
                            <input className="form-check-input" type="radio" name="entrega" id="retiro" checked={entrega === 'retiro'} onChange={() => setEntrega('retiro')} />
                            <label className="form-check-label" htmlFor="retiro">Retiro en tienda (Santiago)</label>
                        </div>

                        <h5 className="fw-bold mt-4">Método de pago</h5>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="pago" id="tarjeta" checked={pago === 'tarjeta'} onChange={() => setPago('tarjeta')} />
                            <label className="form-check-label" htmlFor="tarjeta">Tarjeta de crédito / débito</label>
                        </div>
                        <div className="form-check mb-4">
                            <input className="form-check-input" type="radio" name="pago" id="transferencia" checked={pago === 'transferencia'} onChange={() => setPago('transferencia')} />
                            <label className="form-check-label" htmlFor="transferencia">Transferencia bancaria</label>
                        </div>

                        <button type="submit" className="btn btn-success w-100">Confirmar Pedido</button>
                    </form>
                </div>

                <div className="col-md-5">
                    <div className="card p-4 shadow-sm">
                        <h5 className="fw-bold">Resumen del Pedido</h5>
                        {carrito.map(item => (
                            <div className="d-flex justify-content-between small mb-1" key={item.codigo}>
                                <span>{item.nombre} x{item.cantidad}</span>
                                <span>${(item.precio * item.cantidad).toLocaleString('es-CL')}</span>
                            </div>
                        ))}
                        <hr />
                        <div className="d-flex justify-content-between fw-bold fs-5">
                            <span>Total</span>
                            <span>${total.toLocaleString('es-CL')}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout
