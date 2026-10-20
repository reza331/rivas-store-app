'use client'

import { AiOutlineSearch } from 'react-icons/ai'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useSearchActions } from '@/stores/search-store'

export default function SearchBar() {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const { setIsSearching } = useSearchActions()

    const [query, setQuery] = useState(searchParams.get('q') ?? '')

    useEffect(() => {
        const timer = setTimeout(() => {
            const trimmedQuery = query.trim()
            const params = new URLSearchParams(searchParams.toString())
            const currentQuery = params.get('q') ?? ''

            setIsSearching(Boolean(trimmedQuery))

            if (trimmedQuery) {
                params.set('q', trimmedQuery)
            } else {
                params.delete('q')
            }

            // Avoid replacing the URL when the query hasn't changed
            if (currentQuery === trimmedQuery) return

            const queryString = params.toString()

            router.replace(
                queryString ? `${pathname}?${queryString}` : pathname,
                { scroll: false }
            )
        }, 300)

        return () => clearTimeout(timer)
    }, [query, pathname, router, searchParams, setIsSearching])

    return (
        <label className="flex gap-3 items-center rounded-2xl shadow-sm bg-B text-text-A ps-5 py-3">
            <AiOutlineSearch className="text-text-A/50 size-6" />

            <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                type="text"
                placeholder="Search products, categories..."
                className="grow bg-B outline-0 border-0 placeholder:font-semibold"
            />
        </label>
    )
}