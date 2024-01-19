import { useState } from 'react'
import Money from '../../../assets/svgs/Money'
import ReceitaPortal from '../portals/ReceitaPortal'

export default function SextoBanner() {
    const [portalAberto, setPortalAberto] = useState(false)
    return (
        <>
            {portalAberto && <ReceitaPortal aberto={portalAberto} setPortalAberto={setPortalAberto} />}
            <div className='bg-yellow-500 relative min-h-[30rem] flex justify-center gap-2 items-center w-screen  overflow-x-scroll'>
                <p className='text-5xl font-mulish text-blue-500 absolute right-8 top-8'>Receitas</p>
                <button data-testid="open-revenue-portal-button" className='w-80 h-80 rounded-full shadow-2xl flex flex-col justify-center items-center gap-4 bg-yellow-300 absolute right-8 top-24 cursor-pointer hover:shadow-yellow-300'
                    onClick={() => setPortalAberto(true)}>
                    <Money width='30' height='30' classname='absolute top-8 right-[9.5rem]' />
                    <p className='text-xl font-mulish'>Controle suas receitas</p>
                    <p className='text-xl font-mulish'>de forma simples</p>
                    <p className='text-xl font-mulish'>clicando aqui.</p>
                    <Money width='30' height='30' classname='absolute bottom-8 right-[9.5rem]' />
                </button>
            </div>
        </>
    )
}
