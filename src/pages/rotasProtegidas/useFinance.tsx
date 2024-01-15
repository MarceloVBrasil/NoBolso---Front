import { useContext } from "react";

import FinanceContext from "./FinanceProvider";

export default function useFinance() {
    return useContext(FinanceContext)
}