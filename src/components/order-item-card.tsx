'use client'

import useProductQuery from "@/hooks/api/useProductQuery"

export default function OrderItemCard({ producID, quantity }: { quantity: number, producID: string }) {

    const { data } = useProductQuery(producID)

    if (!data?.data.data) return null

    return (
        <div className="bg-A rounded-2xl p-3 text-xs">
            <div>{data.data.data.name}</div>
            <div className="text-text-A/50 mt-2">${data.data.data.price} {quantity && <span className="badge badge-xs badge-primary">{quantity}</span>}</div>
        </div>
    )
}
