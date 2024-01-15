import React from 'react'

export default function Chart({ width, height, classname }: { width: string, height: string, classname?: string }) {
    return (
        <svg height={height} viewBox="0 -960 960 960" width={width} className={classname}>
            <path d="M120-120v-76l60-60v136h-60Zm165 0v-236l60-60v296h-60Zm165 0v-296l60 61v235h-60Zm165 0v-235l60-60v295h-60Zm165 0v-396l60-60v456h-60ZM120-356v-85l280-278 160 160 280-281v85L560-474 400-634 120-356Z" />
        </svg>
    )
}
