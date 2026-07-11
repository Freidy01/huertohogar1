import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { getCarrito, vaciarCarrito } from '../services/carrito'
import { getSesion, getUsuarios } from '../services/usuarios'
import { crearPedido } from '../services/pedidos'
import { chileGeografia } from '../utils/chileGeografia'

function Checkout() {
    const [carrito, setCarrito] = useState([])
    const [nombre, setNombre] = useState('')
    const [apellidos, setApellidos] = useState('')
    const [email, setEmail] = useState('')
    const [calle, setCalle] = useState('')
    const [departamento, setDepartamento] = useState('')
    const [region, setRegion] = useState('')
    const [comuna, setComuna] = useState('')
    const [indicaciones, setIndicaciones] = useState('')
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
                setApellidos(usuarioCompleto.apellidos || '')
                setRegion(usuarioCompleto.region || '')
                setComuna(usuarioCompleto.comuna || '')
                setCalle(usuarioCompleto.direccion || '')
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
        if (!apellidos.trim()) nuevosErrores.apellidos = 'Ingresa tus apellidos.'
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) nuevosErrores.email = 'Ingresa un correo válido.'
        if (!calle.trim()) nuevosErrores.calle = 'Ingresa tu calle.'
        if (!region) nuevosErrores.region = 'Selecciona una región.'
        if (!comuna) nuevosErrores.comuna = 'Selecciona una comuna.'

        setErrores(nuevosErrores)
        if (Object.keys(nuevosErrores).length > 0) return

        const datos = {
            nombre, apellidos, email, calle, departamento, region, comuna, indicaciones, entrega, pago,
            direccion: `${calle}${departamento ? ', ' + departamento : ''}, ${comuna}, ${region}`
        }

        const { exito, pedido } = crearPedido(datos, carrito)

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

                        <h5 className="fw-bold mt-4">Dirección de entrega de los productos</h5>
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
                        <div className="mb-3">
                            <label className="form-label">Indicaciones para la entrega (opcional)</label>
                            <textarea className="form-control" rows="2" value={indicaciones} onChange={e => setIndicaciones(e.target.value)}></textarea>
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
                        <table className="table table-sm align-middle">
                            <thead>
                                <tr><th>Imagen</th><th>Nombre</th><th>Precio</th><th>Cant.</th><th>Subtotal</th></tr>
                            </thead>
                            <tbody>
                                {carrito.map(item => (
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
                            <span>${total.toLocaleString('es-CL')}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout
