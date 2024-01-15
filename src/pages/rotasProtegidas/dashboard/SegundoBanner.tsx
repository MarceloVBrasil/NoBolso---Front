import React from 'react'

export default function SegundoBanner({ aba, setAba }: { aba: string, setAba: (v: string) => void }) {
    return (
        <div className='flex justify-center items-center gap-8 min-h-[5rem] bg-red-300 relative'>
            <div className='flex flex-col'>
                <p className='font-mulish text-xl cursor-pointer' onClick={() => setAba("somente este mes")}>Somente este mês</p>
                <div className={`w-44 h-1 transition-all duration-300 bg-red-500 ${aba === "somente este mes" ? '' : 'translate-x-[12rem]'}`}></div>
            </div>
            <p className='font-mulish text-xl cursor-pointer' onClick={() => setAba("ultimos 12 meses")}>Últimos 12 meses</p>
        </div>
    )
}
