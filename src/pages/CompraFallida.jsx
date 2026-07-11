import { useState, useEffect } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { getPedidoPorNumero, reintentarPago } from '../services/pedidos'
import { chileGeografia } from '../utils/chileGeografia'

function CompraFallida() {
    const navigate = useNavigate()
    const location = useLocation()
    const [pedido, setPedido] = useState(null)

    const [nombre, setNombre] = useState('')
    const [apellidos, setApellidos] = useState('')
    const [email, setEmail] = useState('')
    const [calle, setCalle] = useState('')
    const [departamento, setDepartamento] = useState('')
    const [region, setRegion] = useState('')
    const [comuna, setComuna] = useState('')
    const [indicaciones, setIndicaciones] = useState('')
    const [errores, setErrores] = useState({})

    useEffect(() => {
        const numero = location.state?.numero
        const encontrado = numero ? getPedidoPorNumero(numero) : null
        if (!encontrado) {
            navigate('/carrito')
            return
        }
        setPedido(encontrado)
        setNombre(encontrado.nombre || '')
        setApellidos(encontrado.apellidos || '')
        setEmail(encontrado.email || '')
        setCalle(encontrado.calle || '')
        setDepartamento(encontrado.departamento || '')
        setRegion(encontrado.region || '')
        setComuna(encontrado.comuna || '')
        setIndicaciones(encontrado.indicaciones || '')
    }, [location, navigate])

    if (!pedido) return null

    function handleReintentar(e) {
        e.preventDefault()
        const nuevosErrores = {}

        if (!nombre.trim()) nuevosErrores.nombre = 'Ingresa tu nombre.'
        if (!apellidos.trim()) nuevosErrores.apellidos = 'Ingresa tus apellidos.'
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) nuevosErrores.email = 'Ingresa un correo válido.'
        if (!calle.trim()) nuevosErrores.calle = 'Ingresa tu calle.'
        if (!region) nuevosErrores.region = 'Selecciona una región.'
        if (!comuna) nuevosErrores.comuna = 'Selecciona una comuna.'

        setErrores(nuevosErrores)
        if (Object.keys(nuevosErrores).length > 0) return

        const datos = {
            nombre, apellidos, email, calle, departamento, region, comuna, indicaciones,
            direccion: `${calle}${departamento ? ', ' + departamento : ''}, ${comuna}, ${region}`
        }

        const { exito } = reintentarPago(pedido.numero, datos)

        if (exito) {
            navigate('/compra-exitosa', { state: { numero: pedido.numero } })
        } else {
            navigate('/compra-fallida', { state: { numero: pedido.numero } })
        }
    }

    return (
        <div className="container py-5" style={{ maxWidth: '640px' }}>
            <div className="alert alert-danger d-flex justify-content-between align-items-center">
                <div>
                    <strong>⊘ No se pudo realizar el pago.</strong> nro {pedido.numero}
                    <div className="small">Detalle de compra</div>
                </div>
            </div>

            <form onSubmit={handleReintentar} noValidate>
                <button type="submit" className="btn btn-success w-100 mb-4">Volver a Realizar el Pago</button>

                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Nombre*</label>
                        <input className="form-control" value={nombre} onChange={e => setNombre(e.target.value)} />
                        {errores.nombre && <div className="text-danger small">{errores.nombre}</div>}
                    </div>
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Apellidos*</label>
                        <input className="form-control" value={apellidos} onChange={e => setApellidos(e.target.value)} />
                        {errores.apellidos && <div className="text-danger small">{errores.apellidos}</div>}
                    </div>
                </div>
                <div className="mb-3">
                    <label className="form-label">Correo*</label>
                    <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} />
                    {errores.email && <div className="text-danger small">{errores.email}</div>}
                </div>

                <h6 className="fw-bold">Dirección de entrega de los productos</h6>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Calle*</label>
                        <input className="form-control" value={calle} onChange={e => setCalle(e.target.value)} />
                        {errores.calle && <div className="text-danger small">{errores.calle}</div>}
                    </div>
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Departamento (opcional)</label>
                        <input className="form-control" value={departamento} onChange={e => setDepartamento(e.target.value)} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Región*</label>
                        <select className="form-select" value={region} onChange={e => { setRegion(e.target.value); setComuna('') }}>
                            <option value="">Selecciona una región</option>
                            {Object.keys(chileGeografia).map(r => <option key={r} value={r}>{r}</option>)}
                        </select>
                        {errores.region && <div className="text-danger small">{errores.region}</div>}
                    </div>
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Comuna*</label>
                        <select className="form-select" value={comuna} onChange={e => setComuna(e.target.value)} disabled={!region}>
                            <option value="">Selecciona una comuna</option>
                            {(chileGeografia[region] || []).map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                        {errores.comuna && <div className="text-danger small">{errores.comuna}</div>}
                    </div>
                </div>
                <div className="mb-4">
                    <label className="form-label">Indicaciones para la entrega (opcional)</label>
                    <textarea className="form-control" rows="2" value={indicaciones} onChange={e => setIndicaciones(e.target.value)}></textarea>
                </div>

                <table className="table table-sm align-middle">
                    <thead>
                        <tr><th>Imagen</th><th>Nombre</th><th>Precio</th><th>Cantidad</th><th>Subtotal</th></tr>
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

                <div className="d-flex justify-content-between align-items-center bg-light p-3 rounded">
                    <strong>Total pagado</strong>
                    <strong>${pedido.total.toLocaleString('es-CL')}</strong>
                </div>
            </form>

            <div className="text-center mt-4">
                <Link to="/carrito" className="text-muted small">← Volver al carrito</Link>
            </div>
        </div>
    )
}

export default CompraFallida
