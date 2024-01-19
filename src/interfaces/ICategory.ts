export interface ICategory {
    id: string,
    nome: string,
    meta: number,
    tipo: 'gasto' | 'receita'
}