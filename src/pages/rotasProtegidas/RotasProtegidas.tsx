import { Outlet } from "react-router"
import useAuth from './useAuth'
import { Navigate, useLocation } from 'react-router-dom'
import { verificarToken } from "./helpers/AuthHelper"

export default function RotasProtegidas() {
    const { auth } = useAuth()
    const location = useLocation()
    return verificarToken(auth.refreshToken) ? <Outlet /> : <Navigate to="/" replace state={{ from: location }} />
}
