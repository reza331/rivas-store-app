'use client'
import ProductDetail from "@/features/product/components/product-detail"
import { useParams } from "next/navigation"


export default function ProductPage() {

    const params = useParams<{ sku: string }>()

    return (
        <div className="pt-20">
            <ProductDetail sku={params.sku} />
        </div>
    )
}
