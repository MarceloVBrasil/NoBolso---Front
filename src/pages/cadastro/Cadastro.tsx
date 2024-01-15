import React, { useEffect } from 'react'
import PrimeiroBanner from './PrimeiroBanner'
import Formulario from './Formulario'
import useAuth from '../rotasProtegidas/useAuth'
import { useNavigate } from 'react-router-dom'

export default function Cadastro() {
    document.title = 'No Bolso | Cadastro'
    const { auth } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (auth.token) {
            navigate(`/usuario/${auth.token}`)
        }
    }, [auth])
    return (
        <div>
            <PrimeiroBanner />
            <Formulario />
        </div>
    )
}
