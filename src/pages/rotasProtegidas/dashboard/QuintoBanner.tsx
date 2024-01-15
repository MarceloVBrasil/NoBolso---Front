import React, { useState } from 'react'
import Money from '../../../assets/svgs/Money'
import CategoriaPortal from '../portals/CategoriaPortal'

export default function QuintoBanner() {
    const [portalAberto, setPortalAberto] = useState(false)
    return (
        <>
            {portalAberto && <CategoriaPortal aberto={portalAberto} setPortalAberto={setPortalAberto} />}
            <div className='bg-blue-500 relative min-h-[30rem] flex justify-center gap-2 items-center w-screen  overflow-x-scroll'
                onClick={() => setPortalAberto(true)}>
                <p className='text-5xl font-mulish text-yellow-500 absolute left-8 top-8'>Categorias</p>
                <div className='w-80 h-80 rounded-full shadow-2xl flex flex-col justify-center items-center gap-4 bg-blue-300 absolute left-8 top-24 hover:shadow-blue-300 cursor-pointer'>
                    <Money width='30' height='30' classname='absolute top-8 right-[9.5rem]' />
                    <p className='text-xl font-mulish'>Organize as categarias</p>
                    <p className='text-xl font-mulish'>de forma simples</p>
                    <p className='text-xl font-mulish'>clicando aqui.</p>
                    <Money width='30' height='30' classname='absolute bottom-8 right-[9.5rem]' />
                </div>
            </div>
        </>

    )
}
