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

export function crearPedido(pedido) {
    const pedidos = leerPedidos()
    pedidos.push(pedido)
    guardarPedidos(pedidos)
    return pedido
}
