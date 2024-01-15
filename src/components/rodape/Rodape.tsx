import React from 'react'
import Github from '../../assets/svgs/Github'
import Linkedin from '../../assets/svgs/Linkedin'

export default function Rodape() {
    return (
        <div className='flex gap-8 items-center p-8'>
            <div className=''>
                <p className='text-yellow-500 text-lg font-semibold'>Sites</p>
                <div className='flex flex-col'>
                    <p className='cursor-pointer font-mulish'>XP Investimentos</p>
                    <p className='cursor-pointer font-mulish'>Status Invest</p>
                </div>
            </div>
            <div className=''>
                <p className='text-yellow-500 text-lg font-semibold'>Canais</p>
                <div className='flex flex-col'>
                    <p className='cursor-pointer font-mulish'>Bruno Perini</p>
                    <p className='cursor-pointer font-mulish'>Fernando Ulrich</p>
                </div>
            </div>
            <div className='flex flex-col'>
                <p className='text-yellow-500 text-lg font-semibold'>Contato</p>
                <div className='flex items-center'>
                    <Github />
                    <Linkedin />
                </div>
            </div>
        </div>
    )
}
