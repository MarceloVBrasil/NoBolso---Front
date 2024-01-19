import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useLockedBody } from 'usehooks-ts'
import { createPortal } from 'react-dom'
import Delete from '../../../assets/svgs/Delete'
import Botao from '../../../components/botao/Botao'
import Input from '../../../components/input/Input'
import { formatarMoeda } from '../../../utils/formatarMoeda'
import useAuth from '../useAuth'
import { axiosInstance } from '../../../utils/axios'
import Pencil from '../../../assets/svgs/Pencil'

const variants = {
    aberto: { top: '20vh' },
    fechado: { top: '-90vh' }
}

export default function CategoriaPortal({ aberto, setPortalAberto }: { aberto: boolean, setPortalAberto: (v: boolean) => void }) {
    const [animacaoModal, setAnimacaoModal] = useState(true)
    const [] = useLockedBody(true, 'root')

    const { auth, setAuth } = useAuth()
    const [categoriaData, setCategoriaData] = useState<{ id: string, nome: string, meta: number }[]>([])
    const [formData, setFormData] = useState({ nome: '', meta: 0, tipo: '', id: '' })
    const [updateCategory, setUpdateCategory] = useState(false)


    useEffect(() => {
        getCategories()
    }, [])

    if (!aberto) return null

    return createPortal(
        <>
            <motion.section data-testid="category-portal" initial={{ top: 0 }} animate={animacaoModal ? 'aberto' : 'fechado'} variants={variants}
                className='fixed z-[999] shadow-xl left-[5vw] lg:left-[15vw] border-b xl:left-[25vw] flex flex-col gap-4 pt-2 bg-white w-[90vw] max-w-[40rem]'>
                <div className='flex flex-col gap-4 p-8  border-b'>

                    <button data-testid='close-category-portal-btn' className='absolute right-8 top-2 text-xl cursor-pointer' onClick={fecharModal}>&times;</button>
                    <div className='flex justify-around'>
                        <p className='font-mulish w-40 font-semibold text-sm xs:text-base'>Categoria</p>
                        <p className='font-mulish w-32 font-semibold text-sm xs:text-base'>Meta</p>
                    </div>
                    <div className='flex flex-col gap-4 pt-4 max-h-[16rem] overflow-y-scroll hide-scrollbar'>
                        {categoriaData.map(categoria => {
                            return (
                                <div className='flex justify-around text-sm xs:text-base relative' key={categoria.id}>
                                    <p data-testid={`${categoria.nome}-${categoria.meta}`} className='font-mulish w-40 text-sm xs:text-base'>{categoria.nome}</p>
                                    <p className='font-mulish w-32 text-sm xs:text-base'>{categoria.meta ? formatarMoeda(categoria.meta as number, 'BRL') : '-'}</p>
                                    <Delete dataTestId={`delete-category-button-${categoria.nome}`} width='25' height='25' classname='absolute bottom-[0.1rem] right-[-0.2rem] cursor-pointer' onClick={() => deleteCategory(categoria.id)} />
                                    <Pencil dataTestId={`edit-category-button-${categoria.nome}`} width='18' height='18' className='absolute bottom-[0.25rem] right-6 cursor-pointer' onClick={() => selectCategory(categoria.id)} />
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className=''>
                    <div className='flex gap-4 px-4'>
                        <div className='flex gap-1 font-mulish'>
                            <input data-testid="gasto-radio-button" checked={formData.tipo == 'gasto'} type="radio" value={'gasto'} name='tipoCategoria' id='gasto' onChange={(e) => setFormData({ ...formData, tipo: (e.target as any).value })} />
                            <label htmlFor="gasto">Gasto</label>
                        </div>
                        <div className='flex gap-1 font-mulish'>
                            <input data-testid='receita-radio-button' checked={formData.tipo == 'receita'} type="radio" value={'receita'} name='tipoCategoria' id='receita' onChange={(e) => setFormData({ ...formData, tipo: (e.target as any).value })} />
                            <label htmlFor="receita">Receita</label>
                        </div>
                    </div>
                    <div className=' pb-6 pt-2 px-4 gap-2 flex'>
                        <div className='min-h-10 flex flex-col gap-2 ms:flex-row'>
                            <Input type='novaCategoria' value={formData.nome} placeholder='nova categoria' classname='w-44 h-10' onChange={changeCategoryName} label='' />
                            <Input type="novoGasto" dataTestId='meta-input' value={formData.meta.toString()} classname='border h-10 w-44' onChange={(e) => setFormData({ ...formData, meta: (e.target as any).value })} placeholder='' />
                        </div>
                        <Botao dataTestId='categoria-portal-send-request-button' texto={updateCategory ? 'Atualizar Categoria' : 'Nova Categoria'} classname='py-2 font-mulish mx-auto shadow-lg px-4 transition-all duration-500 bg-yellow-300 hover:translate-y-[-0.3rem]'
                            onClick={updateCategory ? updateCategoria : addCategoria} />
                    </div>
                </div>
            </motion.section>
            <div className='fixed top-0 left-0 bg-black opacity-20 w-screen h-screen'></div>
        </>, document.querySelector("#portals")!
    )

    function fecharModal() {
        setAnimacaoModal(false)
        setTimeout(() => setPortalAberto(false), 150)
    }

    async function getCategories() {
        try {
            const response = await axiosInstance.get(`/category`,
                {
                    headers: { authorization: `Bearer ${auth.token}`, refresh_token: `Bearer ${auth.refreshToken}` }
                })
            setCategoriaData(response.data)
        } catch (error: any) {
            if (error.response.status == 403) {
                setAuth({ token: '', refreshToken: '' })
            }
        }
    }

    async function addCategoria() {
        try {
            formData.meta = parseFloat(formData.meta.toString().replace('$', '').replace('.', '').replace(',', '.'))
            formData.nome = formData.nome.charAt(0).toUpperCase() + formData.nome.toLowerCase().slice(1)
            const response = await axiosInstance.post(`/category`, { ...formData },
                { headers: { authorization: `Bearer ${auth.token}`, refresh_token: `Bearer ${auth.refreshToken}` } }
            )

            if (response.status == 201) {

            }

            fecharModal()
        } catch (error: any) {
            if (error.response.status == 400) {
                fecharModal()
            }

            if (error.response.status == 403) {
                setAuth({ token: '', refreshToken: '' })
            }
        }
    }

    async function updateCategoria() {
        try {
            formData.meta = parseFloat(formData.meta.toString().replace('$', '').replace('.', '').replace(',', '.'))
            formData.nome = formData.nome.charAt(0).toUpperCase() + formData.nome.toLowerCase().slice(1)
            await axiosInstance.put(`/category/${formData.id}`, { ...formData },
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

    async function deleteCategory(categoryId: string) {
        try {
            await axiosInstance.delete(`/category/${categoryId}`,
                { headers: { authorization: `Bearer ${auth.token}`, refresh_token: `Bearer ${auth.refreshToken}` } })

            fecharModal()
        } catch (error: any) {
            if (error.response.status == 403) {
                setAuth({ token: '', refreshToken: '' })
            }
        }
    }

    async function selectCategory(categoryId: string) {
        const categoria = categoriaData.find(c => c.id == categoryId)
        setFormData({ nome: categoria!.nome, meta: categoria!.meta, tipo: categoria!.meta ? 'gasto' : 'receita', id: categoryId })
        setUpdateCategory(true)
    }

    function changeCategoryName(e: { target: any }) {
        setUpdateCategory(false)
        setFormData({ ...formData, nome: (e.target as any).value })
    }
}
