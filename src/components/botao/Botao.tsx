import React from 'react'

export default function Botao({ texto, classname, onClick }: { texto: string, classname: string, onClick: () => void }) {
    return (
        <button className={classname} onClick={onClick}>{texto}</button>
    )
}
