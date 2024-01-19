import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useLockedBody } from 'usehooks-ts'
import { createPortal } from 'react-dom'
import Delete from '../../../assets/svgs/Delete'
import { getAnoAtual, getMesAtual, getNomeMes } from '../../../utils/dataHelper'
import { formatarMoeda } from '../../../utils/formatarMoeda'
import Botao from '../../../components/botao/Botao'
import Input from '../../../components/input/Input'
import { axiosInstance } from '../../../utils/axios'
import useAuth from '../useAuth'
import useFinance from '../useFinance'
import { IYearExpenseRevenue } from '../../../interfaces/IYearExpenseRevenue'
import { IMonthExpenseRevenue } from '../../../interfaces/IMonthExpenseRevenue'
import Pencil from '../../../assets/svgs/Pencil'
import { ICategory } from '../../../interfaces/ICategory'

const variants = {
    aberto: { top: '20vh' },
    fechado: { top: '-90vh' }
}

export default function GastoPortal({ aberto, setPortalAberto }: { aberto: boolean, setPortalAberto: (v: boolean) => void }) {
    const [animacaoModal, setAnimacaoModal] = useState(true)
    const [data, setData] = useState({ mes: new Date().getMonth() + 1, ano: new Date().getFullYear() })
    const [] = useLockedBody(true, 'root')

    const [gastos, setGastos] = useState<{ id: string, categoria: string, total: number }[]>([])
    const [categorias, setCategorias] = useState<ICategory[]>([])
    const [formData, setFormData] = useState<{ categoriaId: string, total: number, id: string }>({ categoriaId: '', total: 0, id: '' })
    const [updateGasto, setUpdateGasto] = useState(false)

    const { auth, setAuth } = useAuth()

    const { setMonthExpenses, monthExpenses, past12MonthsExpenses, setPast12MonthsExpenses } = useFinance()

    useEffect(() => {
        getGastos(data)
    }, [data])

    useEffect(() => {
        getCategorias()
    }, [])

    if (!aberto) return null

    return createPortal(
        <>
            <motion.section data-testid="expenses-portal" initial={{ top: 0 }} animate={animacaoModal ? 'aberto' : 'fechado'} variants={variants}
                className='fixed z-[999] shadow-xl left-[5vw] lg:left-[15vw] border-b xl:left-[25vw] flex flex-col gap-4 pt-2 bg-white w-[90vw] max-w-[40rem]'>
                <div className='flex flex-col gap-4 p-8  border-b'>

                    <div className='absolute right-8 top-2 text-xl cursor-pointer' onClick={fecharModal}>&times;</div>
                    <div className='flex justify-center gap-8 mb-8'>
                        <button data-testid='gasto-portal-previous-month-button' className='cursor-pointer text-lg' onClick={getMesAnterior}>{'<'}</button>
                        <p className='text-lg font-mulish w-40'>{getNomeMes(data.mes)} {data.ano}</p>
                        <button className='cursor-pointer text-lg focus:border-none' onClick={getProximoMes}>{'>'}</button>
                    </div>
                    <div className='flex justify-around'>
                        <p className='font-mulish w-32 font-semibold text-sm xs:text-base'>Categoria</p>
                        <p className='font-mulish w-32 font-semibold text-sm xs:text-base'>Valor</p>
                    </div>
                    <div className='flex flex-col gap-4 pt-4 max-h-[16rem] overflow-y-scroll hide-scrollbar'>
                        {gastos.map((gasto) => {

                            return (
                                <div className='flex justify-around text-sm xs:text-base relative' key={gasto.id}>
                                    <p className='font-mulish w-32 text-sm xs:text-base'>{gasto.categoria}</p>
                                    <p className='font-mulish w-32 text-sm xs:text-base'>{formatarMoeda(gasto.total, 'BRL')}</p>
                                    <Delete dataTestId={`delete-expenses-button-${gasto.categoria}-${gasto.total}`}
                                        onClick={() => deleteExpense(gasto.id)} width='25' height='25'
                                        classname='absolute bottom-[0.1rem] right-4 cursor-pointer' />
                                    <Pencil dataTestId={`edit-expenses-button-${gasto.categoria}-${gasto.total}`} width='18' height='18'
                                        className='absolute bottom-[0.3rem] right-[2.7rem] cursor-pointer' onClick={() => selectGasto(gasto.id)} />
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className=' pb-6 pt-2 px-4 gap-2 flex'>
                    <div className='min-h-10 flex flex-col gap-2 ms:flex-row'>
                        <Input dataTestId='categoria-gasto-select-input' selectedId={formData.categoriaId} type='select' placeholder='' classname='w-80' onChange={(e) => setFormData({ ...formData, categoriaId: (e.target as any).value })} label='' selectOptions={categorias} />
                        <Input dataTestId='valor-gasto-input' value={formData.total.toString()} type="novoGasto" classname='border h-10 w-44' onChange={(e) => setFormData({ ...formData, total: (e.target as any).value })} placeholder='' />
                    </div>

                    <Botao dataTestId='expenses-portal-send-request-button' texto={updateGasto ? 'Atualizar gasto' : 'Novo gasto'}
                        classname='py-2 font-mulish mx-auto shadow-lg px-4 transition-all duration-500 bg-yellow-300 hover:translate-y-[-0.3rem]'
                        onClick={updateGasto ? updateExpense : addExpense} />
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


    async function getGastos(data: { mes: number, ano: number }) {
        try {
            const response = await axiosInstance.get(`/expenses/month/individually`,
                {
                    params: { month: data.mes, year: data.ano },
                    headers: { authorization: `Bearer ${auth.token}`, refresh_token: `Bearer ${auth.refreshToken}` }
                })

            setGastos(response.data)
        } catch (error: any) {
            if (error.response.status == 403) {
                setAuth({ token: '', refreshToken: '' })
            }
        }
    }

    async function getCategorias() {
        try {
            const response = await axiosInstance.get(`/category/tipo`, {
                params: { tipo: 'gasto' },
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

    async function addExpense() {
        try {
            const total = parseFloat(formData.total.toString().replace('$', '').replace('.', '').replace(',', '.')).toFixed(2)

            if (!formData.categoriaId || !formData.total) return
            const response = await axiosInstance.post(`/expenses`, { year: data.ano, month: data.mes, categoryId: formData.categoriaId, total },
                { headers: { authorization: `Bearer ${auth.token}`, refresh_token: `Bearer ${auth.refreshToken}` } })

            if (response.status == 201) {
                if (data.mes == getMesAtual()) {
                    addExpensetoMesAtual(response.data)
                }

                addExpenseToUltimos12Meses(response.data)
            }

            fecharModal()
        } catch (error: any) {
            if (error.response.status === 400) {
                fecharModal()
            }

            if (error.response.status == 403) {
                setAuth({ token: '', refreshToken: '' })
            }
        }
    }

    async function updateExpense() {
        try {
            const total = parseFloat(formData.total.toString().replace('$', '').replace('.', '').replace(',', '.')).toFixed(2)

            if (!formData.categoriaId || !formData.total) return
            const response = await axiosInstance.put(`/expenses/${formData.id}`, { year: data.ano, month: data.mes, categoryId: formData.categoriaId, total },
                { headers: { authorization: `Bearer ${auth.token}`, refresh_token: `Bearer ${auth.refreshToken}` } })

            if (response.status == 201) {
                if (data.mes == getMesAtual()) {
                    addExpensetoMesAtual(response.data)
                }

                addExpenseToUltimos12Meses(response.data)
            }

            fecharModal()
        } catch (error: any) {
            if (error.response.status === 400) {
                fecharModal()
            }

            if (error.response.status == 403) {
                setAuth({ token: '', refreshToken: '' })
            }
        }
    }

    async function deleteExpense(expenseId: string) {
        try {
            await axiosInstance.delete(`/expenses/${expenseId}`,
                { headers: { authorization: `Bearer ${auth.token}`, refresh_token: `Bearer ${auth.refreshToken}` } })

            fecharModal()

        } catch (error: any) {
            if (error.response.status === 400) {
                fecharModal()
            }

            if (error.response.status == 403) {
                setAuth({ token: '', refreshToken: '' })
            }
        }
    }

    function selectGasto(expenseId: string) {
        const gasto = gastos.find(gasto => gasto.id == expenseId)!
        setFormData({ categoriaId: categorias.find(c => c.nome == gasto.categoria)?.id!, total: gasto.total, id: gasto.id })
        setUpdateGasto(true)
    }

    function addExpensetoMesAtual(expenseData: IMonthExpenseRevenue) {
        const newMonthExpenses = monthExpenses.filter(e => e.categoria != expenseData.categoria)
        const seGastoNestaCategoriaExiste = monthExpenses.find(e => e.categoria == expenseData.categoria)

        if (seGastoNestaCategoriaExiste) {
            const expense = monthExpenses.find(e => e.categoria == expenseData.categoria)!
            expense.total += expenseData.total
            setMonthExpenses([...newMonthExpenses, expense])
        }
        else {
            const expense = expenseData
            setMonthExpenses([...newMonthExpenses, expense])
        }
    }

    function addExpenseToUltimos12Meses(expenseData: IYearExpenseRevenue) {
        const newPast12MonthsExpenses = [...past12MonthsExpenses]
        const thisMonthIndex = newPast12MonthsExpenses.findIndex(e => e.mes == getNomeMes(data.mes))
        const seGastonesteMesExiste = newPast12MonthsExpenses[thisMonthIndex]

        if (seGastonesteMesExiste) {
            newPast12MonthsExpenses[thisMonthIndex].total += expenseData.total
            setPast12MonthsExpenses(newPast12MonthsExpenses)
        }
        else {
            const expense: IYearExpenseRevenue = { mes: getNomeMes(data.mes)!, total: expenseData.total }
            setPast12MonthsExpenses([...past12MonthsExpenses, expense])
        }
    }
}
