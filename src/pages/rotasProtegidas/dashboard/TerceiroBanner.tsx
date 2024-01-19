import { useState } from 'react'
import { formatarMoeda } from '../../../utils/formatarMoeda'
import { IMonthExpenseRevenue } from '../../../interfaces/IMonthExpenseRevenue';
import { IFormattedYearExpenseRevenue } from '../../../interfaces/IFormattedYearExpenseRevenue';

export default function TerceiroBanner({ data, aba }: { data: IMonthExpenseRevenue[] | IFormattedYearExpenseRevenue[], aba: string }) {
    const [startMesIndex, setStartMesIndex] = useState(0)
    const [startCategoriaIndex, setStartCategoriaIndex] = useState(0)
    const itemsPorPagina = 4

    if (aba == "ultimos 12 meses")
        return (
            <div className='min-h-[55rem] bg-blue-500 flex flex-col justify-between p-8 pb-4 relative'>
                <p className='text-5xl font-mulish text-yellow-300 '>Gastos por mês</p>
                <div className='flex gap-4 flex-wrap justify-center items-center py-8'>
                    {(data as IFormattedYearExpenseRevenue[]).slice(startMesIndex, itemsPorPagina + startMesIndex).map((expense_revenue, index

                    ) => {
                        return (
                            <div key={index} className='min-w-[20rem]  h-40 bg-white rounded-lg shadow-2xl flex flex-col items-center'>
                                <div className='flex justify-center border-b border-b-gray-300 py-2 w-full'>
                                    <p className='font-mulish font-semibold text-lg'>{expense_revenue.mes}</p>
                                </div>
                                <div className='flex h-full w-full'>
                                    <div className='w-full border-r flex flex-col items-center'>
                                        <div className='flex justify-center border-b border-b-gray-300 py-2 w-full'>
                                            <p className='font-mulish'>Receita</p>
                                        </div>
                                        <p className='relative top-4 font-semibold font-mulish'>{formatarMoeda(expense_revenue.receita, 'BRL')}</p>
                                    </div>
                                    <div className='w-full flex flex-col items-center'>
                                        <div className='flex justify-center border-b border-b-gray-300 py-2 w-full'>
                                            <p className='font-mulish'>Gasto</p>
                                        </div>
                                        <p className={`relative top-4 font-semibold font-mulish ${expense_revenue.receita > expense_revenue.gasto ? 'text-green-500' : 'text-red-500'}`}>{formatarMoeda(expense_revenue.gasto, 'BRL')}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className='flex gap-4 font-mulish self-start text-yellow-300'>
                    <p className=''>{startMesIndex + 1}-{Math.min(itemsPorPagina + startMesIndex, data.length)} de {data.length}</p>
                    <div className='flex gap-4'>
                        <p className='cursor-pointer' onClick={() => setStartMesIndex(0)}>{'|<'}</p>
                        <p className='cursor-pointer' onClick={() => setStartMesIndex(Math.max(startMesIndex - itemsPorPagina, 0))}>{'<'}</p>
                        <p className='cursor-pointer' onClick={() => setStartMesIndex(Math.min(itemsPorPagina + startMesIndex, data.length - 1))}>{'>'}</p>
                        <p className='cursor-pointer' onClick={() => setStartMesIndex(data.length - 1)}>{'>|'}</p>
                    </div>
                </div>

            </div>

        )
    else if (aba == "somente este mes")
        return (
            <div className='min-h-[25rem] bg-blue-500 flex flex-col justify-between p-8 pb-4 relative'>
                <p className='text-5xl font-mulish text-yellow-300 '>Gastos por categoria</p>
                <div className='flex gap-4 flex-wrap justify-center items-center py-8'>
                    {(data as IMonthExpenseRevenue[]).slice(startCategoriaIndex, itemsPorPagina + startCategoriaIndex).map((data) => {
                        return (
                            <div key={data.id} className='min-w-[20rem]  h-40 bg-white rounded-lg shadow-2xl flex flex-col items-center'>
                                <div className='flex justify-center border-b border-b-gray-300 py-2 w-full'>
                                    <p className='font-mulish font-semibold text-lg'>{data.categoria}</p>
                                </div>
                                <div className='flex h-full w-full'>
                                    <div className='w-full border-r flex flex-col items-center'>
                                        <div className='flex justify-center border-b border-b-gray-300 py-2 w-full'>
                                            <p className='font-mulish'>Meta</p>
                                        </div>
                                        <p className='relative top-4 font-semibold font-mulish'>{formatarMoeda(data.meta, 'BRL')}</p>
                                    </div>
                                    <div className='w-full flex flex-col items-center'>
                                        <div className='flex justify-center border-b border-b-gray-300 py-2 w-full'>
                                            <p className='font-mulish'>Gasto</p>
                                        </div>
                                        <p className={`relative top-4 font-semibold font-mulish ${data.total > data.meta ? 'text-red-500' : 'text-green-500'}`}>{formatarMoeda(data.total, 'BRL')}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className='flex gap-4 font-mulish self-start text-yellow-300'>
                    <p className=''>{startCategoriaIndex + 1}-{Math.min(itemsPorPagina + startCategoriaIndex, data.length)} de {data.length}</p>
                    <div className='flex gap-4'>
                        <p className='cursor-pointer' onClick={() => setStartCategoriaIndex(0)}>{'|<'}</p>
                        <p className='cursor-pointer' onClick={() => setStartCategoriaIndex(Math.max(startCategoriaIndex - itemsPorPagina, 0))}>{'<'}</p>
                        <p className='cursor-pointer' onClick={() => setStartCategoriaIndex(Math.min(itemsPorPagina + startCategoriaIndex, data.length - 1))}>{'>'}</p>
                        <p className='cursor-pointer' onClick={() => setStartCategoriaIndex(data.length - 1)}>{'>|'}</p>
                    </div>
                </div>

            </div>
        )


}
