import { formatarMoeda } from '../../../utils/formatarMoeda';

export default function PrimeiroBanner({ dinheiroEconomizado, legenda }: { dinheiroEconomizado: any, legenda: string }) {
    return (
        <div className='flex flex-col pt-20 border min-h-[10rem] p-8'>
            <div className='self-end flex flex-col gap-1'>
                <p className='text-base font-mulish'>{legenda}</p>
                <p className={`text-5xl font-mulish ${dinheiroEconomizado >= 0 ? 'text-green-500' : 'text-red-500'}`}>{formatarMoeda(dinheiroEconomizado, 'BRL')}</p>
            </div>
        </div>
    )
}
