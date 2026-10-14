'use client'
import { useEffect, useRef, useState } from 'react'

export default function useScrollpagination<T>(list: T[] | undefined, itemsPerPage: number) {


    const [finalList, setFinalList] = useState<T[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const isLocked = useRef(false)



    useEffect(() => {

        if (!list) return

        const start = (currentPage - 1) * itemsPerPage
        const newPagedList = list.slice(start, start + itemsPerPage)

        console.log(currentPage);

        setFinalList((prev) => {

            const existingIds = new Set(
                prev.map((item) => (item as { id: number }).id)
            )

            return [
                ...prev,
                ...newPagedList.filter(
                    (item) => !existingIds.has((item as { id: number }).id)
                )
            ]

        })

        setIsLoading(false)

    }, [currentPage, list, itemsPerPage])


    useEffect(() => {
        if (!list) return
        const handleScroll = () => {

            // Stop if there are no more products
            if (currentPage * itemsPerPage >= list.length) {
                setIsLoading(false)
                return
            }

            setIsLoading(true)

            const scrollTop = window.scrollY
            const scrollHeight = document.documentElement.scrollHeight
            const clientHeight = window.innerHeight

            const isBottom = scrollTop + clientHeight >= scrollHeight - 10

            setTimeout(() => {
                // Unlock after leaving the bottom
                if (!isBottom) {
                    isLocked.current = false
                    setIsLoading(false)
                    return
                }

                // Prevent loading multiple pages
                if (isLocked.current) return

                isLocked.current = true
                setCurrentPage((prev) => prev + 1)

                setIsLoading(false)

            }, 1000)

        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [currentPage, itemsPerPage, list?.length])

    return { isLoading, finalList, currentPage, setCurrentPage }
}
