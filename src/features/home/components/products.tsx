'use client'
import ProductCard from "@/components/product-card"
import { mockedData, Product } from "@/content/data"
import useScrollpagination from "@/hooks/use-scrollpagination"
import { useIsSearching, useSearchedList } from "@/stores/search-store"
import { IoFolder } from "react-icons/io5"

export default function ProductsSection() {

    const { finalList } = useScrollpagination<Product>(mockedData.products, 15)
    const isSearching = useIsSearching()
    const searchedList = useSearchedList()

    return (
        <div className="container mx-auto px-20 mt-5 pb-5">
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5">
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
        </div>
    )

}
