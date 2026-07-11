import { eliminarProducto } from '../services/api'

function ListaProductos({ productos, onProductoEliminado }) {
    function handleEliminar(codigo) {
        if (!window.confirm(`¿Eliminar producto ${codigo}?`)) return
        eliminarProducto(codigo)
        onProductoEliminado()
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Código</th>
                    <th>Nombre</th>
                    <th>Categoría</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {productos.map(p => {
                    const critico = p.stockCritico !== null && p.stockCritico !== undefined && p.stock <= p.stockCritico
                    return (
                        <tr key={p.codigo}>
                            <td>{p.codigo}</td>
                            <td>{p.nombre}</td>
                            <td>{p.categoria}</td>
                            <td>${p.precio.toLocaleString('es-CL')}</td>
                            <td style={critico ? { color: '#e67e22', fontWeight: 700 } : undefined}>
                                {p.stock === 0 ? 'Agotado' : p.stock}
                            </td>
                            <td>
                                {p.base
                                    ? <span style={{ color: '#999', fontSize: '0.8rem' }}>Base</span>
                                    : <button onClick={() => handleEliminar(p.codigo)}>Eliminar</button>}
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default ListaProductos
