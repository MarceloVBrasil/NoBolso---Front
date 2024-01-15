import React, { useEffect, useState } from 'react'
import MoneyBag from '../../assets/svgs/MoneyBag'
import SlideDown from 'react-slidedown'
import { Link, NavLink } from 'react-router-dom'
import useAuth from '../../pages/rotasProtegidas/useAuth'

export default function Cabecalho() {
    const [menuAberto, setMenuAberto] = useState(false)
    const [distanciaTopo, setDistanciaTopo] = useState(0)
    const [hoverHomeLink, setHoverHomeLink] = useState(false)
    const [hoverLoginLink, setHoverLoginLink] = useState(false)
    const [pagina, setPagina] = useState(1)
    const { auth } = useAuth()

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <>
            <div className='w-full fixed top-0 h-10 bg-primaria flex justify-between items-center p-8 z-[999]'>
                <Link to={'/'}>
                    <MoneyBag width='35' height='35' />
                </Link>
                <div className='flex flex-col gap-[0.1rem] cursor-pointer' onClick={toggleMenu}>
                    <div className={`w-4 h-1 bg-white transition-all duration-500 ${menuAberto ? 'rotate-45' : 'rotate-0'}`}></div>
                    <div className={`w-4 h-1 bg-white transition-all duration-500 ${menuAberto ? 'rotate-[-45deg] translate-y-[-0.4rem]' : 'rotate-0'}`}></div>
                </div>
            </div>
            <SlideDown closed={!menuAberto} className='bg-secundaria z-[100] transition-all duration-500 text-white absolute w-full overflow-hidden'
                style={{ top: `${distanciaTopo}px` }}>
                <p className='pt-32 pl-8 text-lg flex items-center gap-2'>
                    Navegue pelas seções
                    <svg height="20" viewBox="0 -960 960 960" fill='yellow' className='animate-x' width="20"><path d="M686-450H160v-60h526L438-758l42-42 320 320-320 320-42-42 248-248Z" /></svg>
                </p>
                <div className='min-h-[100vh] flex flex-col gap-1 items-center p-16'
                    style={{ minHeight: `${pagina * 100}vh` }}>
                    {/* public routes */}
                    <NavLink to={'/'} onMouseEnter={() => setHoverHomeLink(true)}
                        onMouseLeave={() => setHoverHomeLink(false)}
                        onClick={() => setMenuAberto(false)}
                        className={`w-16 text-xl`}>
                        Home
                        <div className={`h-1 transition-all duration-500 bg-yellow-500 ${hoverHomeLink ? 'w-16' : 'w-0'}`}></div>
                    </NavLink>
                    {/* private routes */}
                    <NavLink to={`/usuario/${auth.id}`} onMouseEnter={() => setHoverLoginLink(true)}
                        onMouseLeave={() => setHoverLoginLink(false)}
                        onClick={() => setMenuAberto(false)}
                        className={`w-16 text-xl ${!auth.token ? 'hidden' : ''}`}>
                        Dashboard
                        <div className={`h-1 transition-all duration-500 bg-yellow-500 ${hoverLoginLink ? 'w-16' : 'w-0'}`}></div>
                    </NavLink>
                </div>
            </SlideDown>
        </>
    )

    function toggleMenu() {
        setMenuAberto(!menuAberto)
    }

    function handleScroll() {
        setDistanciaTopo(window.scrollY)
        setPagina(1 + Math.floor(window.scrollY / screen.height))
    }
}
