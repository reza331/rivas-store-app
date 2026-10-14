'use client'
import ProductCard from "@/components/product-card"
import useProductsQuery from "@/hooks/api/useProductsQuery"
import useScrollpagination from "@/hooks/use-scrollpagination"
import { useIsSearching, useSearchActions, useSearchedList } from "@/stores/search-store"
import { useEffect } from "react"
import { IoFolder } from "react-icons/io5"

export default function ProductsSection() {

    const { data, isError, isLoading, refetch } = useProductsQuery()
    const isSearching = useIsSearching()
    const searchedList = useSearchedList()
    const { setData } = useSearchActions()
    const { finalList, isLoading: scrollLoading } = useScrollpagination(data?.data.data, 15)

    useEffect(() => {
        if (data?.data.data) {
            setData(data.data.data)
        }
    }, [data])

    if (isError) return (<div className="w-full flex items-center justify-center h-[calc(100dvh-200px)]">Failed to fetch content, <button className="cursor-pointer" onClick={() => refetch()}>Retry</button> </div>)

    if (isLoading) return (<div className="w-full flex items-center justify-center h-[calc(100dvh-200px)]">Loading content ... </div>)

    return (
        <div className="container mx-auto lg:px-20 mt-5 pb-5">
            <div className="w-full grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                {!isSearching && finalList.map((product) => <ProductCard key={product.id} {...product} />)}
                {isSearching && searchedList.map((product) => <ProductCard key={product.id} {...product} />)}
            </div>
            {
                (isSearching && searchedList.length === 0) &&
                <div className="text-lg gap-2 font-semibold min-h-[calc(100dvh-250px)] flex items-center justify-center text-text-A/50">
                    <IoFolder className="size-10" />
                    No item found
                </div>
            }
            {
                scrollLoading && <div className="flex justify-center mt-5">Loading ...</div>
            }
        </div>
    )

}
