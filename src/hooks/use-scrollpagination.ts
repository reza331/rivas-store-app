'use client'
import { useEffect, useRef, useState } from 'react'

export default function useScrollpagination<T>(list: T[], itemsPerPage: number) {

    const [finalList, setFinalList] = useState<T[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const isLoading = useRef(false)
    const isLocked = useRef(false)


    useEffect(() => {

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

        isLoading.current = false
    }, [currentPage, list, itemsPerPage])


    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY
            const scrollHeight = document.documentElement.scrollHeight
            const clientHeight = window.innerHeight

            const isBottom = scrollTop + clientHeight >= scrollHeight - 10

            setTimeout(() => {
                // Unlock after leaving the bottom
                if (!isBottom) {
                    isLocked.current = false
                    return
                }

                // Prevent loading multiple pages
                if (isLocked.current) return

                // Stop if there are no more products
                if (currentPage * itemsPerPage >= list.length) return

                isLocked.current = true
                setCurrentPage((prev) => prev + 1)

            }, 1000)

        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [currentPage, itemsPerPage, list.length])

    return { finalList, currentPage, setCurrentPage }
}
