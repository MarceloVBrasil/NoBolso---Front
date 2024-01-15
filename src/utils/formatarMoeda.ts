export function formatarMoeda(total: number, moeda: string) {
    return Intl.NumberFormat('pt-br', { style: 'currency', currency: moeda }).format(total)
}