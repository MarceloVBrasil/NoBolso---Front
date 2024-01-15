import React from 'react'
import PrimeiroBanner from './PrimeiroBanner'
import SegundoBanner from './SegundoBanner'
import TerceiroBanner from './TerceiroBanner'

export default function Home() {
    return (
        <div className=''>
            <PrimeiroBanner />
            <SegundoBanner />
            <TerceiroBanner />
        </div>
    )
}
