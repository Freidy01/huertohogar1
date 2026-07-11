const STORAGE_CART_KEY = 'huertoCarrito'

function leerCarrito() {
    return JSON.parse(localStorage.getItem(STORAGE_CART_KEY)) || []
}

function guardarCarrito(carrito) {
    localStorage.setItem(STORAGE_CART_KEY, JSON.stringify(carrito))
}

export function getCarrito() {
    return leerCarrito()
}

export function contarItems() {
    return leerCarrito().reduce((acc, i) => acc + i.cantidad, 0)
}

export function agregarAlCarrito(producto, cantidad = 1) {
    const carrito = leerCarrito()
    const existente = carrito.find(i => i.codigo === producto.codigo)

    if (existente) {
        if (existente.cantidad + cantidad > producto.stock) {
            return { ok: false, error: 'stock' }
        }
        existente.cantidad += cantidad
    } else {
        if (cantidad > producto.stock) return { ok: false, error: 'stock' }
        carrito.push({
            codigo: producto.codigo,
            nombre: producto.nombre,
            precio: producto.precio,
            imagen: producto.imagen,
            unidad: producto.unidad,
            cantidad
        })
    }

    guardarCarrito(carrito)
    return { ok: true, carrito }
}

export function modificarCantidad(codigo, cambio, stockDisponible) {
    const carrito = leerCarrito()
    const item = carrito.find(i => i.codigo === codigo)
    if (!item) return { ok: false, carrito }

    const nueva = item.cantidad + cambio
    if (nueva <= 0) return eliminarItem(codigo)
    if (cambio > 0 && stockDisponible !== undefined && nueva > stockDisponible) {
        return { ok: false, error: 'stock', carrito }
    }

    item.cantidad = nueva
    guardarCarrito(carrito)
    return { ok: true, carrito }
}

export function eliminarItem(codigo) {
    const carrito = leerCarrito().filter(i => i.codigo !== codigo)
    guardarCarrito(carrito)
    return { ok: true, carrito }
}

export function vaciarCarrito() {
    localStorage.removeItem(STORAGE_CART_KEY)
    return []
}
