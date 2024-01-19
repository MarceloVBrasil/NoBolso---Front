import { useState } from 'react'
import Input from '../../components/input/Input'
import Botao from '../../components/botao/Botao'
import { Link } from 'react-router-dom'

export default function Formulario() {
    const [email, setEmail] = useState('')
    const [confirmarEmail, setConfirmarEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [confirmarSenha, setConfirmarSenha] = useState('')
    const [nomeCompleto, setNomeCompleto] = useState('')
    return (
        <div className='flex flex-col font-mulish justify-center items-center p-8 bg-blue-500 min-h-[20rem]'>
            <div className='w-[90%] max-w-[60rem] bg-white shadow-xl flex flex-col gap-5 p-8'>
                <div className='w-full relative'>
                    <Input type='user' placeholder='nome completo' onChange={(e) => setNomeCompleto((e.target as any).value)} classname={!validateName(nomeCompleto) && nomeCompleto ? 'outline-red-500' : ''} />
                    <p className={`text-red-500 text-xs absolute bottom-[-1.1rem] left-1 ${!validateName(nomeCompleto) && nomeCompleto ? '' : 'hidden'}`}>Nome Inválido</p>
                </div>
                <div className='flex flex-col sm:flex-row justify-between gap-4'>
                    <div className='w-full relative'>
                        <Input type='email' placeholder='email' onChange={(e) => setEmail((e.target as any).value)} classname={!isValidEmail(email) && email ? 'outline-red-500' : ''} />
                        <p className={`text-red-500 text-xs absolute bottom-[-1.1rem] left-1 ${!isValidEmail(email) && email ? '' : 'hidden'}`}>Email inválido</p>
                    </div>
                    <div className='w-full relative'>
                        <Input type='email' placeholder='confirmar email' onChange={(e) => setConfirmarEmail((e.target as any).value)} classname={email !== confirmarEmail && confirmarEmail ? 'outline-red-500' : ''} />
                        <p className={`text-red-500 text-xs absolute bottom-[-1.1rem] right-1 ${email != confirmarEmail && confirmarEmail ? '' : 'hidden'}`}>Email de confirmaçao diferente</p>
                    </div>
                </div>
                <div className='flex flex-col sm:flex-row justify-between gap-4'>
                    <Input type='senha' placeholder='senha' onChange={(e) => setSenha((e.target as any).value)} />
                    <div className='w-full relative'>
                        <Input type='senha' placeholder='confirmar senha' onChange={(e) => setConfirmarSenha((e.target as any).value)} classname={senha != confirmarSenha && confirmarSenha ? 'outline-red-500' : ''} />
                        <p className={`text-xs text-red-500 absolute bottom-[-1.1rem] right-1 ${senha != confirmarSenha && confirmarSenha ? '' : 'hidden'}`}>Senha de confirmação diferente</p>
                    </div>
                </div>
                <Botao classname='font-mulish bg-yellow-300 p-4 shadow-xl active:bg-yellow-200' texto='Cadastrar' onClick={() => ''} />
                <p className='text-center'>Já é cadastrado? <Link to={'/login'} className='underline text-yellow-500'>Faça seu login</Link></p>
            </div>
        </div>
    )

    function validateName(nomeCompleto: string) {
        if (nomeCompleto.split('').some(ch => !isLetter(ch) && !isSpace(ch))) return false
        return true
    }

    function isLetter(ch: string) {
        return ch.toLowerCase() != ch.toUpperCase()
    }

    function isSpace(ch: string) {
        return ch == ' '
    }

    function isValidEmail(email: string) {
        return /\S+@\S+\.\S+/.test(email);
    }
}
