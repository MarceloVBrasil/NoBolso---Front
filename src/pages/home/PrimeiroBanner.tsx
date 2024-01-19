import PiggyBank from '../../assets/svgs/PiggyBank'

export default function PrimeiroBanner() {
    return (
        <div className='w-full min-h-[20rem] bg-yellow-300 p-8 pt-28 flex justify-between'>
            <div className='flex flex-col gap-2 w-full'>
                <p className='font-mulish text-white text-3xl xs:text-5xl'>Controle</p>
                <p className='font-mulish text-white text-3xl xs:text-5xl'>Economize</p>
                <p className='font-mulish text-white text-3xl xs:text-5xl'>Invista</p>
            </div>
            <PiggyBank width='150' height='150' top='top-[4rem]' left='left-14' tamanhoTexto='text-5xl' className='hidden xs:block' />
            <PiggyBank width='100' height='100' top='top-[2.5rem]' left='left-10' tamanhoTexto='text-3xl' className='block xs:hidden' />
        </div>
    )
}
