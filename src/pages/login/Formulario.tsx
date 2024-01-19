import { useState } from 'react'
import Botao from '../../components/botao/Botao'
import Input from '../../components/input/Input'
import { Link } from 'react-router-dom'
import useAuth from '../rotasProtegidas/useAuth'
import { axiosInstance } from '../../utils/axios'

export default function Formulario() {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    const [credenciaisErradas, setCredenciaisErradas] = useState(false)
    const [formularioAlterado, setFormularioAlterado] = useState(false)

    const { setAuth } = useAuth()

    return (
        <div className='flex flex-col font-mulish justify-center items-center p-8 bg-yellow-500 min-h-[20rem]'>
            <div className='w-[90%] max-w-[30rem] bg-white shadow-xl flex flex-col gap-5 p-8'>
                <div className='relative'>
                    <Input type='email' placeholder='email' onChange={changeEmail} classname={!isValidEmail(email) && email ? 'outline-red-500' : ''} />
                    <p className={`text-xs absolute bottom-[-1.1rem] right-1 text-red-500 ${!isValidEmail(email) && email ? '' : 'hidden'}`}>Email inválido</p>
                    <p className={`text-xs absolute bottom-[-1.1rem] right-1 text-red-500 ${credenciaisErradas && !formularioAlterado ? '' : 'hidden'}`}>Credenciais Erradas</p>
                </div>
                <div className='relative'>
                    <Input type='senha' placeholder='senha' onChange={changeSenha} />
                    <p className={`text-xs absolute bottom-[-1.1rem] right-1 text-red-500 ${credenciaisErradas ? '' : 'hidden'}`}>Credenciais Erradas</p>
                </div>
                <Botao classname='font-mulish bg-yellow-300 p-4 shadow-xl active:bg-yellow-200' texto='Login' onClick={login} />
                <p className='text-center'>Não é cadastrado? <Link to={'/cadastro'} className='underline text-yellow-500'>Cadastre-se</Link></p>
            </div>
        </div>
    )

    async function login() {
        try {
            setFormularioAlterado(false)
            setCredenciaisErradas(false)
            const response = await axiosInstance.post('/auth/login', { email, senha })
            setAuth(response.data)
        } catch (error: any) {
            console.log(error)
            setCredenciaisErradas(true)
        }
    }

    function changeEmail(e: any) {
        setFormularioAlterado(true)
        setEmail(e.target.value)
    }

    function changeSenha(e: any) {
        setFormularioAlterado(true)
        setSenha(e.target.value)
    }

    function isValidEmail(email: string) {
        return /\S+@\S+\.\S+/.test(email);
    }

}
