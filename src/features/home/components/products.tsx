'use client'
import ProductCard from "@/components/product-card"
import useProductsQuery from "@/hooks/api/useProductsQuery"
import useWishlistQuery from "@/hooks/api/useWishlistQuery"
import { useCursor, usePagetActions } from "@/stores/pagination-store"
import { useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { IoFolder } from "react-icons/io5"

export default function ProductsSection() {

    const searchParams = useSearchParams();
    const cursor = useCursor()
    const query = searchParams.get("q") ?? "";
    const { data, isError, isLoading, refetch } = useProductsQuery(cursor, query)
    const { data: wishlistData } = useWishlistQuery()
    const products = data?.data.data.items ?? []
    const { setTotal } = usePagetActions()

    useEffect(() => {
        if (data?.data.data) {
            setTotal(data.data.data.total)
        }
    }, [data])

    if (isError) return (<div className="w-full flex items-center justify-center h-[calc(100dvh-200px)]">Failed to fetch content, <button className="cursor-pointer" onClick={() => refetch()}>Retry</button> </div>)

    if (isLoading) return (<div className="w-full flex items-center justify-center h-[calc(100dvh-200px)]">Loading content ... </div>)

    if (!data?.data.data) return null

    return (
        <div className="container mx-auto lg:px-20 mt-5 pb-5">
            <div className="w-full grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                {products.map((product) => (
                    <ProductCard key={product.id} wishlistdata={wishlistData?.data} product={product} />
                ))}
            </div>

            {products.length === 0 && (
                <div className="text-lg min-h-[calc(100dvh-250px)] flex items-center justify-center text-text-A/50">
                    <IoFolder className="size-10" />
                    No item found
                </div>
            )}
        </div>
    )

}
