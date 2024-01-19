import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import PrimeiroBanner from './PrimeiroBanner'
import Formulario from './Formulario'
import useAuth from '../rotasProtegidas/useAuth'
import { verificarToken } from '../rotasProtegidas/helpers/AuthHelper'

export default function Login() {
    document.title = 'No Bolso | Login'
    const { auth } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (verificarToken(auth.refreshToken)) {
            navigate(`/dashboard`)
        }
    }, [auth])

    return (
        <>
            <PrimeiroBanner />
            <Formulario />
        </>
    )
}
