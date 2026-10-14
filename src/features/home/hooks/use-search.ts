import { useEffect } from "react"
import useDebounce from "@/hooks/use-debounce"
import { useData, useSearchActions, useSearchValue } from "@/stores/search-store"

export default function useSearch() {

    const searchValue = useSearchValue()
    const data = useData()
    const debouncedValue = useDebounce(searchValue)
    const { setIsSearching, setSearchValue, setSearchedList } = useSearchActions()

    useEffect(() => {

        const query = debouncedValue.trim().toLowerCase()

        if (!query) {
            setIsSearching(false)
            return
        }

        const filteredList = data.filter((product) =>
            product.name.toLowerCase().includes(query)
        )

        setSearchedList(filteredList)
        setIsSearching(true)

    }, [debouncedValue, setIsSearching])

    return {
        handleSearch: (value: string) => setSearchValue(value),
    }
}