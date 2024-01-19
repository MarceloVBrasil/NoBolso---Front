import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useLockedBody } from 'usehooks-ts'
import { createPortal } from 'react-dom'
import Delete from '../../../assets/svgs/Delete'
import { getAnoAtual, getMesAtual, getNomeMes } from '../../../utils/dataHelper'
import { formatarMoeda } from '../../../utils/formatarMoeda'
import Botao from '../../../components/botao/Botao'
import Input from '../../../components/input/Input'
import useAuth from '../useAuth'
import { axiosInstance } from '../../../utils/axios'
import useFinance from '../useFinance'
import { IYearExpenseRevenue } from '../../../interfaces/IYearExpenseRevenue'
import { IMonthExpenseRevenue } from '../../../interfaces/IMonthExpenseRevenue'

const variants = {
    aberto: { top: '20vh' },
    fechado: { top: '-90vh' }
}

export default function ReceitaPortal({ aberto, setPortalAberto }: { aberto: boolean, setPortalAberto: (v: boolean) => void }) {
    const [animacaoModal, setAnimacaoModal] = useState(true)
    const [data, setData] = useState({ mes: new Date().getMonth() + 1, ano: new Date().getFullYear() })
    const [] = useLockedBody(true, 'root')

    const [receitas, setReceitas] = useState<{ id: string, categoria: string, total: number }[]>([])
    const [categorias, setCategorias] = useState([])
    const [formData, setFormData] = useState<{ categoriaId: string, total: number }>({ categoriaId: '', total: 0 })

    const { auth, setAuth } = useAuth()

    const { monthRevenues, setMonthRevenues, past12MonthsRevenues, setPast12MonthsRevenues } = useFinance()

    useEffect(() => {
        getReceitas(data)
    }, [data])

    useEffect(() => {
        getCategorias()
    }, [])

    if (!aberto) return null

    return createPortal(
        <>
            <motion.section data-testid="revenue-portal" initial={{ top: 0 }} animate={animacaoModal ? 'aberto' : 'fechado'} variants={variants}
                className='fixed z-[999] shadow-xl left-[5vw] lg:left-[15vw] border-b xl:left-[25vw] flex flex-col gap-4 pt-2 bg-white w-[90vw] max-w-[40rem]'>
                <div className='flex flex-col gap-4 p-8  border-b'>

                    <div className='absolute right-8 top-2 text-xl cursor-pointer' onClick={fecharModal}>&times;</div>
                    <div className='flex justify-center gap-8 mb-8'>
                        <button className='cursor-pointer text-lg' onClick={getMesAnterior}>{'<'}</button>
                        <p className='text-lg font-mulish w-40'>{getNomeMes(data.mes)} {data.ano}</p>
                        <button className='cursor-pointer text-lg focus:border-none' onClick={getProximoMes}>{'>'}</button>
                    </div>
                    <div className='flex justify-around'>
                        <p className='font-mulish w-48 font-semibold text-sm xs:text-base'>Categoria</p>
                        <p className='font-mulish w-32 font-semibold text-sm xs:text-base'>Valor</p>
                    </div>
                    <div className='flex flex-col gap-4 pt-4 max-h-[16rem] overflow-y-scroll hide-scrollbar'>
                        {receitas.map((receita) => {
                            return (
                                <div className='flex justify-around text-sm xs:text-base relative' key={receita.id}>
                                    <p className='font-mulish w-48 text-sm xs:text-base'>{receita.categoria}</p>
                                    <p className='font-mulish w-32 text-sm xs:text-base'>{formatarMoeda(receita.total, 'BRL')}</p>
                                    <Delete width='25' height='25' classname='absolute bottom-[0.1rem] right-4 cursor-pointer' onClick={() => ''} />
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className=' pb-6 pt-2 px-4 gap-2 flex'>
                    <div className='min-h-10 flex flex-col gap-2 ms:flex-row'>
                        <Input type='select' placeholder='' classname='w-80 ' onChange={(e) => setFormData({ ...formData, categoriaId: (e.target as any).value })} label='' selectOptions={categorias} />
                        <Input type="novoGasto" classname='border h-10 w-44' onChange={(e) => setFormData({ ...formData, total: (e.target as any).value })} placeholder='' />
                    </div>
                    <Botao texto='Nova receita' classname='py-2 font-mulish mx-auto shadow-lg px-4 transition-all duration-500 bg-yellow-300 hover:translate-y-[-0.3rem]' onClick={addRevenue} />
                </div>
            </motion.section>
            <div className='fixed top-0 left-0 bg-black opacity-20 w-screen h-screen'></div>
        </>, document.querySelector("#portals")!
    )

    function fecharModal() {
        setAnimacaoModal(false)
        setTimeout(() => setPortalAberto(false), 150)
    }

    function getMesAnterior() {
        if (data.mes == getMesAtual() && data.ano == getAnoAtual() - 1) return

        if (getNomeMes(data.mes) == "Janeiro") {
            setData({ mes: 12, ano: data.ano - 1 })
        } else {
            setData({ ...data, mes: data.mes - 1 })
        }
    }

    function getProximoMes() {
        if (data.mes == getMesAtual() && data.ano == getAnoAtual()) return

        if (getNomeMes(data.mes) == "Dezembro") {
            setData({ mes: 1, ano: data.ano + 1 })
        } else {
            setData({ ...data, mes: data.mes + 1 })
        }
    }

    async function getReceitas(data: { mes: number, ano: number }) {
        try {
            const response = await axiosInstance.get(`/revenue/month/individually`,
                {
                    params: { month: data.mes, year: data.ano },
                    headers: { authorization: `Bearer ${auth.token}`, refresh_token: `Bearer ${auth.refreshToken}` }
                })
            setReceitas(response.data)
        } catch (error: any) {
            if (error.response.status == 403) {
                setAuth({ token: '', refreshToken: '' })
            }
        }
    }

    async function getCategorias() {
        try {
            const response = await axiosInstance.get(`/category/tipo`, {
                params: { tipo: 'receita' },
                headers: { authorization: `Bearer ${auth.token}`, refresh_token: `Bearer ${auth.refreshToken}` }
            })
            const categorias = response.data.map((data: any) => { return { id: data.id, nome: data.nome } })
            setCategorias(categorias)
        } catch (error: any) {
            if (error.response.status == 403) {
                setAuth({ token: '', refreshToken: '' })
            }
        }
    }

    async function addRevenue() {
        try {
            const total = parseFloat(formData.total.toString().replace('$', '').replace('.', '').replace(',', '.')).toFixed(2)
            if (!formData.categoriaId || !formData.total) return
            const response = await axiosInstance.post(`/revenue`, { year: data.ano, month: data.mes, categoryId: formData.categoriaId, total },
                { headers: { authorization: `Bearer ${auth.token}`, refresh_token: `Bearer ${auth.refreshToken}` } })

            if (response.status == 201) {
                if (data.mes == getMesAtual()) {
                    addRevenueToMesAtual(response.data)
                }

                addRevenueToUltimos12Meses(response.data)
            }

            fecharModal()
        } catch (error: any) {
            if (error.response.status == 403) {
                setAuth({ token: '', refreshToken: '' })
            }
        }
    }

    function addRevenueToMesAtual(revenueData: IMonthExpenseRevenue) {
        const newRevenues = monthRevenues.filter(e => e.categoria != revenueData.categoria)
        const seReceitaNestaCategoriaExiste = monthRevenues.find(r => r.categoria == revenueData.categoria)

        if (seReceitaNestaCategoriaExiste) {
            const revenue = monthRevenues.find(r => r.categoria == revenueData.categoria)!
            revenue.total += revenue.total
            setMonthRevenues([...newRevenues, revenue])
        }
        else {
            const revenue = revenueData
            setMonthRevenues([...newRevenues, revenue])
        }
    }

    function addRevenueToUltimos12Meses(revenueData: IYearExpenseRevenue) {
        const newPast12MonthsRevenues = [...past12MonthsRevenues]
        const thisMonthIndex = newPast12MonthsRevenues.findIndex(r => getNomeMes(data.mes) == r.mes)
        const seReceitaNesteMesExiste = newPast12MonthsRevenues[thisMonthIndex]

        if (seReceitaNesteMesExiste) {
            newPast12MonthsRevenues[thisMonthIndex].total += revenueData.total
            setPast12MonthsRevenues(newPast12MonthsRevenues)
        }
        else {
            const revenue: IYearExpenseRevenue = { mes: getNomeMes(data.mes)!, total: revenueData.total }
            setPast12MonthsRevenues([...past12MonthsRevenues, revenue])
        }
    }
}
