import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getUsuarios } from '../services/usuarios'
import { getProductos } from '../services/api'
import { contarItems } from '../services/carrito'
import { getSesion } from '../services/usuarios'

function AdminHome() {
    const [stats, setStats] = useState({ usuarios: 0, productos: 0, carrito: 0 })
    const sesion = getSesion()

    useEffect(() => {
        setStats({
            usuarios: getUsuarios().length,
            productos: getProductos().length,
            carrito: contarItems()
        })
    }, [])

    return (
        <div className="container py-5">
            <h1 className="fw-bold mb-1">Panel Administrador</h1>
            <p className="text-muted mb-4">👤 {sesion?.nombre} ({sesion?.rol})</p>

            <div className="row g-4 mb-4">
                <div className="col-md-4">
                    <div className="card text-center p-4 shadow-sm">
                        <h2 className="fw-bold">{stats.usuarios}</h2>
                        <p className="text-muted mb-0">Usuarios registrados</p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card text-center p-4 shadow-sm">
                        <h2 className="fw-bold">{stats.productos}</h2>
                        <p className="text-muted mb-0">Productos en catálogo</p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card text-center p-4 shadow-sm">
                        <h2 className="fw-bold">{stats.carrito}</h2>
                        <p className="text-muted mb-0">Items en carrito activo</p>
                    </div>
                </div>
            </div>

            <div className="d-flex gap-3">
                <Link to="/admin/usuarios" className="btn btn-outline-success">Gestionar Usuarios</Link>
                <Link to="/admin/productos" className="btn btn-outline-success">Gestionar Productos</Link>
            </div>
        </div>
    )
}

export default AdminHome
