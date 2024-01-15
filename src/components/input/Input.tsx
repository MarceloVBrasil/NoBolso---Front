import React, { ChangeEventHandler, useState } from 'react'
import ClosedEye from '../../assets/svgs/ClosedEye'
import OpenedEye from '../../assets/svgs/OpenedEye'
import Email from '../../assets/svgs/Email'
import Lock from '../../assets/svgs/Lock'
import { NumericFormat } from 'react-number-format'
import Money from '../../assets/svgs/Money'
import Person from '../../assets/svgs/Person'

export default function Input({ type, placeholder, classname, onChange, selectOptions, label, value }: { type: string, placeholder: string, classname?: string, onChange: ChangeEventHandler, selectOptions?: any, label?: string, value?: string }) {
    const [mostrarSenha, setMostrarSenha] = useState(false)

    switch (type) {
        case 'text':
            return (
                <input placeholder={placeholder} type={'text'} className={`bg-[#eceff1] p-4 w-full outline-[#CCC] ${classname}`} onChange={onChange} />
            )
        case 'senha':
            return (
                <div className='relative w-full'>
                    <Lock width="20" height="20" classname='absolute top-5 left-4' />
                    <input type={!mostrarSenha ? 'password' : 'text'} placeholder={placeholder} className={`bg-[#eceff1] indent-6 p-4 w-full outline-[#CCC] ${classname}`} onChange={onChange} />
                    <ClosedEye width='20' height='20' classname={mostrarSenha ? 'hidden' : 'absolute right-4 bottom-4 cursor-pointer'} onClick={() => setMostrarSenha(true)} />
                    <OpenedEye width='20' height='20' classname={mostrarSenha ? 'absolute bottom-4 right-4 cursor-pointer' : 'hidden'} onClick={() => setMostrarSenha(false)} />
                </div>
            )
        case 'email':
            return (
                <div className='w-full relative'>
                    <Email classname='absolute top-5 left-4' />
                    <input type="text" placeholder={placeholder} className={`indent-6 bg-[#eceff1] p-4 w-full outline-[#CCC] ${classname}`} onChange={onChange} />
                </div>
            )
        case 'money':
            return (
                <div className='w-full relative'>
                    <Money width='20' height='20' classname='absolute top-5 left-4' />
                    <NumericFormat
                        prefix='$'
                        thousandSeparator="."
                        decimalSeparator=','
                        decimalScale={2}
                        fixedDecimalScale
                        placeholder={placeholder}
                        className={`indent-6 bg-[#eceff1] p-4 w-full outline-[#CCC] ${classname}`} onChange={onChange} />
                </div>
            )
        case 'select':
            return (
                <div className='flex flex-col relative gap-1 w-44'>
                    <label htmlFor="" className={`font-mulish text-sm`}>{label}</label>
                    <select className={`${classname} p-2 w-full border outline-[#CCC] h-10 relative bottom-1 text-cinzaEscuro`} onChange={onChange}>
                        <option hidden value={''}>Categorias</option>
                        {selectOptions?.map((option: { id: string, nome: string }) => {
                            return (
                                <option key={option.id} value={option.id}>{option.nome}</option>
                            )
                        })}
                    </select>
                    <span className='w-10 flex justify-center items-center h-6 absolute bottom-[0.7rem] right-[0.1rem] bg-white rounded-lg pointer-events-none'>
                        <svg height="20" viewBox="0 -960 960 960" width="20" className=''>
                            <path d="M480-345 240-585l43-43 197 198 197-197 43 43-240 239Z" />
                        </svg>
                    </span>
                </div>
            )
        case 'novoGasto':
            return (
                <div className='relative'>
                    <Money width='20' height='20' classname='absolute top-3 left-4' />
                    <NumericFormat
                        prefix='$'
                        thousandSeparator="."
                        decimalSeparator=','
                        decimalScale={2}
                        fixedDecimalScale
                        placeholder={placeholder}
                        value={value}
                        className={`indent-6 p-4 w-40 outline-[#CCC] ${classname}`}
                        onChange={onChange} />
                </div>
            )
        case 'novaCategoria':
            return (
                <input value={value} placeholder={placeholder} type={'text'} className={`border p-4 outline-[#CCC] ${classname}`} onChange={onChange} />
            )
        case 'user':
            return (
                <div className='w-full relative'>
                    <Person width='24' height='24' className='absolute top-[1.1rem] left-[0.9rem]' />
                    <input type="text" placeholder={placeholder} className={`indent-6 bg-[#eceff1] p-4 w-full outline-[#CCC] ${classname}`} onChange={onChange} />
                </div>
            )
    }
}
