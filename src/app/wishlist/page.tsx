'use client'

import OrderItemCard from "@/components/order-item-card"
import useWishlistQuery from "@/hooks/api/useWishlistQuery"
import { deletefromWishlist } from "@/services/products.service"
import { useQueryClient } from "@tanstack/react-query"
import { redirect } from "next/navigation"
import { useState } from "react"

export default function WishlistPage() {

    const { data } = useWishlistQuery()

    const [loading, setLoading] = useState(false)
    const queryClient = useQueryClient()

    if (!data?.data.data) return null

    const handleRemove = async (id: string) => {
        if (loading) return
        setLoading(true)
        const { res } = await deletefromWishlist(id)
        if (!res.ok) {
            setLoading(false)
            alert('Failed')
            return
        }
        console.log(res)
        queryClient.invalidateQueries({ queryKey: ['wishlist'] })
        setLoading(false)
    }

    return (
        <div className="container pt-20 mx-auto lg:px-20  pb-5 flex flex-col gap-5">
            {data.data.data.length === 0 && <div>No Item yet !</div>}
            {
                data.data.data.map(item => {
                    return (
                        <div key={item.id} className="bg-B rounded-2xl p-3 flex gap-3 items-center">
                            <div className="w-full">
                                <OrderItemCard quantity={0} producID={item.productId} />
                            </div>
                            <button onClick={() => redirect(`/products/${item.productId}`)} className="btn btn-sm btn-primary">View</button>
                            <button onClick={() => handleRemove(item.productId)} className="btn btn-sm btn-error">Delete</button>
                        </div>
                    )
                })
            }
        </div>
    )
}
