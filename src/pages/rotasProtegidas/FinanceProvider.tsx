import { createContext, useState } from "react";
import { IMonthExpenseRevenue } from "../../interfaces/IMonthExpenseRevenue";
import { IYearExpenseRevenue } from "../../interfaces/IYearExpenseRevenue";

const DEFAULT_VALUE: IFinanceContext = {
    monthExpenses: [],
    setMonthExpenses: () => [],

    monthRevenues: [],
    setMonthRevenues: () => [],

    past12MonthsExpenses: [],
    setPast12MonthsExpenses: () => [],

    past12MonthsRevenues: [],
    setPast12MonthsRevenues: () => [],
}

const FinanceContext = createContext<IFinanceContext>(DEFAULT_VALUE)

export function FinanceProvider({ children }: { children: any }) {
    const [monthExpenses, setMonthExpenses] = useState<IMonthExpenseRevenue[]>(DEFAULT_VALUE.monthExpenses)
    const [monthRevenues, setMonthRevenues] = useState<IMonthExpenseRevenue[]>(DEFAULT_VALUE.monthRevenues)

    const [past12MonthsExpenses, setPast12MonthsExpenses] = useState<IYearExpenseRevenue[]>(DEFAULT_VALUE.past12MonthsExpenses)
    const [past12MonthsRevenues, setPast12MonthsRevenues] = useState<IYearExpenseRevenue[]>(DEFAULT_VALUE.past12MonthsRevenues)

    const financeValues = {
        monthExpenses,
        setMonthExpenses,

        monthRevenues,
        setMonthRevenues,

        past12MonthsExpenses,
        setPast12MonthsExpenses,

        past12MonthsRevenues,
        setPast12MonthsRevenues
    }

    return (
        <FinanceContext.Provider value={financeValues}>
            {children}
        </FinanceContext.Provider>
    )
}

export default FinanceContext

interface IFinanceContext {
    monthExpenses: IMonthExpenseRevenue[]
    setMonthExpenses: React.Dispatch<React.SetStateAction<IMonthExpenseRevenue[]>>

    monthRevenues: IMonthExpenseRevenue[]
    setMonthRevenues: React.Dispatch<React.SetStateAction<IMonthExpenseRevenue[]>>

    past12MonthsExpenses: IYearExpenseRevenue[]
    setPast12MonthsExpenses: React.Dispatch<React.SetStateAction<IYearExpenseRevenue[]>>

    past12MonthsRevenues: IYearExpenseRevenue[]
    setPast12MonthsRevenues: React.Dispatch<React.SetStateAction<IYearExpenseRevenue[]>>
}