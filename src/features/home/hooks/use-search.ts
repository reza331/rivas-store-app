import { useEffect, useState } from "react"
import { mockedData } from "@/content/data"
import useDebounce from "@/hooks/use-debounce"
import { useSearchActions, useSearchValue } from "@/stores/search-store"

export default function useSearch() {

    const searchValue = useSearchValue()
    const debouncedValue = useDebounce(searchValue)
    const { setIsSearching, setSearchValue, setSearchedList } = useSearchActions()

    const [list, setList] = useState(mockedData.products)

    useEffect(() => {
        const query = debouncedValue.trim().toLowerCase()

        if (!query) {
            setIsSearching(false)
            setList(mockedData.products)
            return
        }

        const filteredList = mockedData.products.filter((product) =>
            product.name.toLowerCase().includes(query)
        )

        setSearchedList(filteredList)
        setIsSearching(true)
        
    }, [debouncedValue, setIsSearching])

    return {
        handleSearch: (value: string) => setSearchValue(value),
    }
}