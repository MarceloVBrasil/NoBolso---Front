import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function TerceiroBanner() {
    const [hoverLink, setHoverLink] = useState(false)
    return (
        <div className='min-h-[17rem] relative flex justify-end py-10 bg-blue-500 w-full transition-all duration-500 hover:bg-black'>
            <Link to={'/login'} className='flex border-l justify-end items-center p-8 gap-4 text-white text-xl font-mulish'
                onMouseEnter={() => setHoverLink(true)} onMouseLeave={() => setHoverLink(false)}>Comece aqui
                <span className='w-8 h-8 rounded-full border flex items-center justify-center'>
                    <svg fill='white' height="20" viewBox="0 -960 960 960" width="20"><path d="M686-450H160v-60h526L438-758l42-42 320 320-320 320-42-42 248-248Z" /></svg>
                </span>
            </Link>
            <div className={`h-1 bg-yellow-500 absolute bottom-[7rem] right-20 hover:w-20 transition-all duration-500 
            ${hoverLink ? 'w-28' : 'w-0'}`}></div>
        </div>
    )
}
