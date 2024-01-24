import Money from '../../../assets/svgs/Money'
import CategoriaPortal from '../portals/CategoriaPortal'

export default function QuintoBanner({ categoriaPortalAberto, setCategoriaPortalAberto }: { categoriaPortalAberto: boolean, setCategoriaPortalAberto: React.Dispatch<React.SetStateAction<boolean>> }) {
    return (
        <>
            {categoriaPortalAberto && <CategoriaPortal aberto={categoriaPortalAberto} setPortalAberto={setCategoriaPortalAberto} />}
            <div className='bg-blue-500 relative min-h-[30rem] flex justify-center gap-2 items-center w-screen  overflow-x-scroll'
                onClick={openCategoriaPortal}>
                <p className='text-5xl font-mulish text-yellow-500 absolute left-8 top-8'>Categorias</p>
                <button data-testid="open-category-portal-button" className='w-80 h-80 rounded-full shadow-2xl flex flex-col justify-center items-center gap-4 bg-blue-300 absolute left-8 top-24 hover:shadow-blue-300 cursor-pointer'>
                    <Money width='30' height='30' classname='absolute top-8 right-[9.5rem]' />
                    <p className='text-xl font-mulish'>Organize as categorias</p>
                    <p className='text-xl font-mulish'>de forma simples</p>
                    <p className='text-xl font-mulish'>clicando aqui.</p>
                    <Money width='30' height='30' classname='absolute bottom-8 right-[9.5rem]' />
                </button>
            </div>
        </>

    )

    function openCategoriaPortal() {
        setCategoriaPortalAberto(true)
    }
}
