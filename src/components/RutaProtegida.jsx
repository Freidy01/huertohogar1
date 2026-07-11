import { Navigate } from 'react-router-dom'
import { getSesion } from '../services/usuarios'

function RutaProtegida({ children }) {
    const sesion = getSesion()

    if (!sesion) return <Navigate to="/login" replace />
    if (sesion.rol !== 'Administrador') return <Navigate to="/" replace />

    return children
}

export default RutaProtegida
