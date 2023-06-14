import React from 'react'
import { Link } from 'react-router-dom'

export default function LinkButton({text,href,...props}) {
    return (
        <>
            <Link to={href} className={`block min-w-[120px] bg-[#232323] py-2 rounded-xl text-white font-semibold my-2 ${props.className}`}>
                {text}
            </Link>
        </>
    )
}
