'use client'

import { usePage, usePagetActions, useTotal } from "@/stores/pagination-store"
import { useQueryClient } from "@tanstack/react-query"

export default function PageControl() {

    const total = useTotal()
    const page = usePage()
    const { setPage, setCursor } = usePagetActions()

    const nextPage = (total: number) => {
        if (page >= Math.ceil(total / 20)) {
            const page = 1
            setPage(page)
            setCursor((page - 1) * 20)
            return
        }

        const nextPageNumber = page + 1

        setPage(nextPageNumber)
        setCursor((nextPageNumber - 1) * 20)

    }

    const prevPage = (total: number) => {
        if (page <= 1) {
            const page = Math.ceil(total / 20)
            setPage(page)
            setCursor((page - 1) * 20)
            return
        }
        const prevPageNumber = page - 1
        setPage(prevPageNumber)
        setCursor((prevPageNumber - 1) * 20)
    }

    if (!total) return null

    return (
        <div className='flex items-center bg-B rounded-2xl p-3 gap-3'>
            <div onClick={() => prevPage(total)} className='cursor-pointer'>{`<`}</div>
            <div className='whitespace-nowrap'>{page} / {Math.ceil(total / 20)}</div>
            <div onClick={() => nextPage(total)} className='cursor-pointer'>{`>`}</div>
        </div>
    )
}
