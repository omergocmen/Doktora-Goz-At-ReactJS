import React from 'react'

export default function BaseButton({ text,onClick, ...props }) {
    return (
        <><button type="submit" onClick={()=>onClick?onClick():null} className={`block min-w-[120px] bg-[#232323] py-2 rounded-xl text-white font-semibold my-2 ${props.className}`}>{text}</button></>
    )
}
