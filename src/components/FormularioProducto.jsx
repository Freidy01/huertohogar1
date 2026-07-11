import { useState } from 'react'
import { crearProducto, existeCodigo } from '../services/api'

function FormularioProducto({ onProductoCreado }) {
    const [codigo, setCodigo] = useState('')
    const [nombre, setNombre] = useState('')
    const [categoria, setCategoria] = useState('')
    const [precio, setPrecio] = useState('')
    const [stock, setStock] = useState('')
    const [stockCritico, setStockCritico] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [error, setError] = useState('')
    const [exito, setExito] = useState('')

    function handleSubmit(e) {
        e.preventDefault()
        setError('')
        setExito('')

        const codigoLimpio = codigo.trim().toUpperCase()

        if (codigoLimpio.length < 3) {
            setError('El código debe tener al menos 3 caracteres.')
            return
        }
        if (existeCodigo(codigoLimpio)) {
            setError('Ya existe un producto con ese código.')
            return
        }
        if (!nombre.trim() || !categoria || precio === '' || stock === '') {
            setError('Nombre, categoría, precio y stock son obligatorios.')
            return
        }
        if (Number(precio) < 0 || Number(stock) < 0) {
            setError('Precio y stock no pueden ser negativos.')
            return
        }

        crearProducto({
            codigo: codigoLimpio,
            nombre: nombre.trim(),
            categoria,
            precio: Number(precio),
            stock: Number(stock),
            stockCritico: stockCritico === '' ? null : Number(stockCritico),
            descripcion: descripcion.trim(),
            imagen: '/assets/manzanas.jpg',
            unidad: 'kg'
        })

        setCodigo('')
        setNombre('')
        setCategoria('')
        setPrecio('')
        setStock('')
        setStockCritico('')
        setDescripcion('')
        setExito('Producto registrado exitosamente.')
        onProductoCreado()
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Nuevo Producto</h2>
            {error && <p className="error-box">{error}</p>}
            {exito && <p className="success-box">{exito}</p>}
            <input
                type="text"
                placeholder="Código (Ej: FR004)"
                value={codigo}
                onChange={e => setCodigo(e.target.value)}
            />
            <input
                type="text"
                placeholder="Nombre"
                value={nombre}
                onChange={e => setNombre(e.target.value)}
            />
            <input
                type="number"
                placeholder="Precio"
                value={precio}
                onChange={e => setPrecio(e.target.value)}
            />
            <input
                type="number"
                placeholder="Stock"
                value={stock}
                onChange={e => setStock(e.target.value)}
            />
            <input
                type="number"
                placeholder="Stock crítico (opcional)"
                value={stockCritico}
                onChange={e => setStockCritico(e.target.value)}
            />
            <select value={categoria} onChange={e => setCategoria(e.target.value)}>
                <option value="">Seleccione categoría</option>
                <option value="frutas">Frutas</option>
                <option value="verduras">Verduras</option>
                <option value="organicos">Orgánicos</option>
                <option value="lacteos">Lácteos</option>
            </select>
            <textarea
                placeholder="Descripción (opcional)"
                value={descripcion}
                onChange={e => setDescripcion(e.target.value)}
            />
            <button type="submit">Guardar</button>
        </form>
    )
}

export default FormularioProducto
