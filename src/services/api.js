const STORAGE_PRODUCTS_KEY = 'huertoProductos'

const dbProductos = [
    { codigo: "FR001", nombre: "Manzanas Fuji", precio: 1200, stock: 150, stockCritico: 20, categoria: "frutas", imagen: "/assets/manzanas.jpg", descripcion: "Manzanas Fuji crujientes y dulces, cultivadas en el Valle del Maule.", origen: "Valle del Maule", unidad: "kg", base: true, enOferta: true, descuento: 15 },
    { codigo: "FR002", nombre: "Naranjas Valencia", precio: 1000, stock: 200, stockCritico: 25, categoria: "frutas", imagen: "/assets/naranjas.jpg", descripcion: "Jugosas y ricas en vitamina C, ideales para zumos frescos.", origen: "Región de O'Higgins", unidad: "kg", base: true },
    { codigo: "FR003", nombre: "Plátanos Cavendish", precio: 800, stock: 250, stockCritico: 30, categoria: "frutas", imagen: "/assets/platano.jpg", descripcion: "Plátanos maduros y dulces, perfectos para el desayuno.", origen: "Importado selecto", unidad: "kg", base: true },
    { codigo: "VR001", nombre: "Zanahorias Orgánicas", precio: 900, stock: 100, stockCritico: 15, categoria: "verduras", imagen: "/assets/zanahorias.jpg", descripcion: "Zanahorias crujientes cultivadas sin pesticidas.", origen: "Región de O'Higgins", unidad: "kg", base: true },
    { codigo: "VR002", nombre: "Espinacas Frescas", precio: 700, stock: 80, stockCritico: 10, categoria: "verduras", imagen: "/assets/espinaca.jpg", descripcion: "Espinacas frescas y nutritivas, perfectas para ensaladas.", origen: "Región de Valparaíso", unidad: "bolsa 500g", base: true, enOferta: true, descuento: 20 },
    { codigo: "VR003", nombre: "Pimientos Tricolores", precio: 1500, stock: 120, stockCritico: 15, categoria: "verduras", imagen: "/assets/pimientos.jpg", descripcion: "Pimientos rojos, amarillos y verdes, ideales para salteados.", origen: "Región del Maule", unidad: "kg", base: true },
    { codigo: "PO001", nombre: "Miel Orgánica", precio: 5000, stock: 50, stockCritico: 8, categoria: "organicos", imagen: "/assets/miel.png", descripcion: "Miel pura y orgánica producida por apicultores locales.", origen: "Región de Los Lagos", unidad: "frasco 500g", base: true, enOferta: true, descuento: 10 },
    { codigo: "PO003", nombre: "Quinua Orgánica", precio: 3800, stock: 60, stockCritico: 10, categoria: "organicos", imagen: "/assets/quinoa.jpg", descripcion: "Superalimento andino libre de gluten y alto en proteínas.", origen: "Región de Atacama", unidad: "bolsa 500g", base: true },
    { codigo: "PL001", nombre: "Leche Entera", precio: 1290, stock: 180, stockCritico: 25, categoria: "lacteos", imagen: "/assets/leche.jpg", descripcion: "Leche entera natural sin reconstitución, directa de granjas locales.", origen: "Región del Bío-Bío", unidad: "litro", base: true }
]

function leerExtras() {
    return JSON.parse(localStorage.getItem(STORAGE_PRODUCTS_KEY)) || []
}

function guardarExtras(productos) {
    localStorage.setItem(STORAGE_PRODUCTS_KEY, JSON.stringify(productos))
}

export function getProductos() {
    return [...dbProductos, ...leerExtras()]
}

export function getOfertas() {
    return getProductos().filter(p => p.enOferta)
}

export function precioFinal(producto) {
    if (!producto.enOferta) return producto.precio
    return Math.round(producto.precio * (1 - producto.descuento / 100))
}

export function getProductoPorCodigo(codigo) {
    return getProductos().find(p => p.codigo.toUpperCase() === codigo.toUpperCase())
}

export function existeCodigo(codigo) {
    return getProductos().some(p => p.codigo.toUpperCase() === codigo.toUpperCase())
}

export function crearProducto(producto) {
    const extras = leerExtras()
    extras.push({ ...producto, base: false })
    guardarExtras(extras)
    return getProductos()
}

export function actualizarProducto(codigo, cambios) {
    const extras = leerExtras()
    const idx = extras.findIndex(p => p.codigo.toUpperCase() === codigo.toUpperCase())
    if (idx === -1) return getProductos()
    extras[idx] = { ...extras[idx], ...cambios }
    guardarExtras(extras)
    return getProductos()
}

export function eliminarProducto(codigo) {
    const extras = leerExtras().filter(p => p.codigo.toUpperCase() !== codigo.toUpperCase())
    guardarExtras(extras)
    return getProductos()
}
