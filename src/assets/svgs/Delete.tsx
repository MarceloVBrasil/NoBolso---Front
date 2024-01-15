import React from 'react'

export default function Delete({ width, height, classname, onClick }: { width: string, height: string, classname?: string, onClick: any }) {
    return (
        <svg onClick={onClick} height={height} viewBox="0 -960 960 960" width={width} className={classname} fill='red'>
            <path d="M261-120q-24.75 0-42.375-17.625T201-180v-570h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438v-570ZM367-266h60v-399h-60v399Zm166 0h60v-399h-60v399ZM261-750v570-570Z" />
        </svg>
    )
}
