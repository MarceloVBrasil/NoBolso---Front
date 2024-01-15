import { useEffect, useState } from 'react'

import PrimeiroBanner from './PrimeiroBanner'
import SegundoBanner from './SegundoBanner'
import TerceiroBanner from './TerceiroBanner'
import QuartoBanner from './QuartoBanner'
import QuintoBanner from './QuintoBanner'
import SextoBanner from './SextoBanner'
import { calcularBalancoMes, calcularBalancoUltimos12meses, formatarDadosUltimos12Meses } from '../../../utils/balancoMes'
import useAuth from '../useAuth'
import { axiosInstance } from '../../../utils/axios'
import useFinance from '../useFinance'

export default function Dashboard() {
    document.title = 'No Bolso | Dashboard'

    const { auth, setAuth } = useAuth()

    const {
        monthExpenses, setMonthExpenses,
        monthRevenues, setMonthRevenues,
        past12MonthsExpenses, setPast12MonthsExpenses,
        past12MonthsRevenues, setPast12MonthsRevenues
    } = useFinance()

    const [aba, setAba] = useState("ultimos 12 meses")
    let dinheiroEconomizado = aba === "somente este mes" ? calcularBalancoMes(monthExpenses, monthRevenues) : calcularBalancoUltimos12meses(past12MonthsExpenses, past12MonthsRevenues)

    const data = aba == "somente este mes" ? monthExpenses : formatarDadosUltimos12Meses(past12MonthsExpenses, past12MonthsRevenues)

    useEffect(() => {
        dinheiroEconomizado = calcularBalancoMes(monthExpenses, monthRevenues)

    }, [monthExpenses])

    useEffect(() => {
        getThisMonthExpenses()
        getThisMonthRevenues()

        getExpensesFromPast12Months()
        getRevenuesFromPast12Months()

    }, [])

    return (
        <>
            <PrimeiroBanner dinheiroEconomizado={dinheiroEconomizado} legenda={aba == "somente este mes" ? 'Economia este mês' : "Economia nos últimos 12 meses"} />
            <SegundoBanner aba={aba} setAba={setAba} />
            <TerceiroBanner data={data} aba={aba} />
            <QuartoBanner />
            <QuintoBanner />
            <SextoBanner />
        </>
    )

    async function getThisMonthExpenses() {
        try {

            const response = await axiosInstance.get(`/expenses/month/grouped`, {
                params: { year: new Date().getFullYear(), month: new Date().getMonth() + 1 },
                headers: { authorization: `Bearer ${auth.token}`, refresh_token: `Bearer ${auth.refreshToken}` }
            })

            setMonthExpenses(response.data)
        } catch (error: any) {
            if (error.response.status == 403) {
                setAuth({ token: '', refreshToken: '' })
            }
        }
    }

    async function getThisMonthRevenues() {
        try {

            const response = await axiosInstance.get(`/revenue/month/grouped`, {
                params: { year: new Date().getFullYear(), month: new Date().getMonth() + 1 },
                headers: { authorization: `Bearer ${auth.token}`, refresh_token: `Bearer ${auth.refreshToken}` }
            })

            setMonthRevenues(response.data)
        } catch (error: any) {
            if (error.response.status == 403) {
                setAuth({ token: '', refreshToken: '' })
            }
        }
    }

    async function getExpensesFromPast12Months() {
        try {

            const response = await axiosInstance.get(`/expenses/total`, {
                params: {
                    startDate: new Date(`${new Date().getMonth() + 1}/1/${new Date().getFullYear() - 1}`),
                    endDate: new Date(`${new Date().getMonth() + 1}/1/${new Date().getFullYear()}`),
                },
                headers: { authorization: `Bearer ${auth.token}`, refresh_token: `Bearer ${auth.refreshToken}` }
            })

            setPast12MonthsExpenses(response.data)
        } catch (error: any) {
            console.log(error.response.data)
        }
    }

    async function getRevenuesFromPast12Months() {
        try {

            const response = await axiosInstance.get(`/revenue/total`, {
                params: {
                    startDate: new Date(`${new Date().getMonth() + 1}/1/${new Date().getFullYear() - 1}`),
                    endDate: new Date(`${new Date().getMonth() + 1}/1/${new Date().getFullYear()}`),
                },
                headers: { authorization: `Bearer ${auth.token}`, refresh_token: `Bearer ${auth.refreshToken}` }
            })

            setPast12MonthsRevenues(response.data)
        } catch (error: any) {
            if (error.response.status == 403) {
                setAuth({ token: '', refreshToken: '' })
            }
        }
    }
}
