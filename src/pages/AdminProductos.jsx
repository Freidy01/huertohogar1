import { useState, useEffect } from 'react'
import FormularioProducto from '../components/FormularioProducto'
import ListaProductos from '../components/ListaProductos'
import { getProductos } from '../services/api'

function AdminProductos() {
    const [productos, setProductos] = useState([])

    useEffect(() => {
        setProductos(getProductos())
    }, [])

    function recargar() {
        setProductos(getProductos())
    }

    return (
        <div className="container py-5">
            <h1 className="fw-bold mb-4">Mantenedor de Productos</h1>
            <div className="row g-4">
                <div className="col-lg-4">
                    <FormularioProducto onProductoCreado={recargar} />
                </div>
                <div className="col-lg-8">
                    <ListaProductos productos={productos} onProductoEliminado={recargar} />
                </div>
            </div>
        </div>
    )
}

export default AdminProductos
