const STORAGE_USERS_KEY = 'huertoUsuarios'
const STORAGE_SESSION_KEY = 'huertoSesion'

const ADMIN_EMAIL = 'admin@inacap.cl'
const ADMIN_PASSWORD = 'evaluacion 2 inacap'
const usuarioAdmin = { run: 'ADMIN', nombre: 'Administrador', apellidos: 'Sistema', rol: 'Administrador', email: ADMIN_EMAIL, password: ADMIN_PASSWORD }

function leerUsuarios() {
    return JSON.parse(localStorage.getItem(STORAGE_USERS_KEY)) || []
}

function guardarUsuarios(usuarios) {
    localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(usuarios))
}

export function getUsuarios() {
    return leerUsuarios()
}

export function existeRun(run) {
    return leerUsuarios().some(u => u.run === run)
}

export function existeEmail(email) {
    return leerUsuarios().some(u => u.email && u.email.toLowerCase() === email.toLowerCase())
}

export function registrarUsuario(usuario) {
    const usuarios = leerUsuarios()
    usuarios.push({ ...usuario, rol: usuario.rol || 'Cliente' })
    guardarUsuarios(usuarios)
    return usuarios
}

export function eliminarUsuario(run) {
    const usuarios = leerUsuarios().filter(u => u.run !== run)
    guardarUsuarios(usuarios)
    return usuarios
}

export function login(email, password) {
    const emailLower = email.toLowerCase()
    const usuarios = leerUsuarios()
    let encontrado = usuarios.find(u => u.email && u.email.toLowerCase() === emailLower)
    if (!encontrado && emailLower === ADMIN_EMAIL) encontrado = usuarioAdmin

    if (!encontrado) return { ok: false, error: 'email' }
    if (encontrado.password !== password) return { ok: false, error: 'password' }

    const sesion = { run: encontrado.run, nombre: encontrado.nombre, rol: encontrado.rol, email: encontrado.email }
    setSesion(sesion)
    return { ok: true, sesion }
}

export function getSesion() {
    return JSON.parse(sessionStorage.getItem(STORAGE_SESSION_KEY)) || null
}

export function setSesion(usuario) {
    sessionStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(usuario))
}

export function cerrarSesion() {
    sessionStorage.removeItem(STORAGE_SESSION_KEY)
}
