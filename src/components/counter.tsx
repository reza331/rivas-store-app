'use client'
import { useState } from "react"
import { BiPlus } from "react-icons/bi"
import { BsDashLg } from "react-icons/bs"

export default function Counter() {

    const [count, setCount] = useState('1')

    return (
        <div className="flex w-fit h-10 bg-B rounded-xl">
            <div className="flex items-center px-2 border-2 border-text-A border-r-0 h-full rounded-l-xl"><BsDashLg /></div>
            <div className="flex items-center px-8 border-2 border-text-A h-full">{count}</div>
            <div className="flex bg-rose-700 text-white border-text-A items-center px-2 border-2 border-l-0 h-full rounded-r-xl"><BiPlus /></div>
        </div>
    )

}
