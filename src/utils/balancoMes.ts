import { IFormattedYearExpenseRevenue } from "../interfaces/IFormattedYearExpenseRevenue"
import { IMonthExpenseRevenue } from "../interfaces/IMonthExpenseRevenue"
import { IYearExpenseRevenue } from "../interfaces/IYearExpenseRevenue"
import { mesesArray } from "./dataHelper"

function calcularReceitasMes(receitas: IMonthExpenseRevenue[]) {
    return receitas.reduce((total, receita) => total + receita.total, 0)
}

function calcularGastosMes(gastos: IMonthExpenseRevenue[]) {
    return gastos.reduce((total, gasto) => total + gasto.total, 0)
}

function calcularGastosUltimos12Meses(gastos: IYearExpenseRevenue[]) {
    return gastos.reduce((total, gasto) => total + gasto.total, 0)
}

function calcularReceitasUltimos12Meses(receitas: IYearExpenseRevenue[]) {
    return receitas.reduce((total, receita) => total + receita.total, 0)
}


export function calcularBalancoUltimos12meses(gastos: IYearExpenseRevenue[], receitas: IYearExpenseRevenue[]) {
    const totalGastosUltimos12Meses = calcularGastosUltimos12Meses(gastos)
    const totalReceitasUltimos12Meses = calcularReceitasUltimos12Meses(receitas)

    return totalReceitasUltimos12Meses - totalGastosUltimos12Meses
}

export function calcularBalancoMes(gastos: IMonthExpenseRevenue[], receitas: IMonthExpenseRevenue[]) {
    const totalGastosNoMes = calcularGastosMes(gastos)
    const totalReceitaNoMes = calcularReceitasMes(receitas)

    return totalReceitaNoMes - totalGastosNoMes
}

export function formatarDadosUltimos12Meses(gastos: IYearExpenseRevenue[], receitas: IYearExpenseRevenue[]): IFormattedYearExpenseRevenue[] {
    const result: IFormattedYearExpenseRevenue[] = []
    const meses = mesesArray()

    meses.forEach(mes => gastos.some(g => g.mes == mes.nome) || receitas.some(r => r.mes == mes.nome) ? result.push({ mes: mes.nome, gasto: gastos.find(g => g.mes == mes.nome)?.total || 0, receita: receitas.find(r => r.mes == mes.nome)?.total || 0 }) : null)
    return result
}