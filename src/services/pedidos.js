const STORAGE_ORDERS_KEY = 'huertoPedidos'

function leerPedidos() {
    return JSON.parse(localStorage.getItem(STORAGE_ORDERS_KEY)) || []
}

function guardarPedidos(pedidos) {
    localStorage.setItem(STORAGE_ORDERS_KEY, JSON.stringify(pedidos))
}

export function getPedidos() {
    return leerPedidos()
}

export function getPedidoPorNumero(numero) {
    return leerPedidos().find(p => p.numero === numero)
}

export function getUltimoPedido() {
    const pedidos = leerPedidos()
    return pedidos[pedidos.length - 1] || null
}

export function crearPedido(datos, carrito) {
    const total = carrito.reduce((acc, i) => acc + i.precio * i.cantidad, 0)
    const exito = Math.random() > 0.15

    const pedido = {
        numero: 'HH-' + Math.floor(100000 + Math.random() * 900000),
        fecha: new Date().toLocaleDateString('es-CL'),
        items: carrito,
        total,
        ...datos,
        estado: exito ? 'Pagado' : 'Fallido'
    }

    const pedidos = leerPedidos()
    pedidos.push(pedido)
    guardarPedidos(pedidos)

    return { exito, pedido }
}

export function reintentarPago(numero, datos) {
    const pedidos = leerPedidos()
    const idx = pedidos.findIndex(p => p.numero === numero)
    if (idx === -1) return { exito: false, pedido: null }

    const exito = Math.random() > 0.15
    pedidos[idx] = { ...pedidos[idx], ...datos, estado: exito ? 'Pagado' : 'Fallido' }
    guardarPedidos(pedidos)

    return { exito, pedido: pedidos[idx] }
}
