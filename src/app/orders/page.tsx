'use client'
import OrderCard from "@/components/order-card"
import OrderDetailModal from "@/components/order-detail-modal"
import useOrdersQuery from "@/hooks/api/useOrdersQuery"
import { Order } from "@/types/wallet.type"
import { useState } from "react"

export default function OrdersPage() {

    const [isOpen, setIsOpen] = useState(false)
    const { data } = useOrdersQuery()
    const [order, setOrder] = useState<Order>({} as Order)

    if (!data?.data.data) return null

    return (
        <>
            <div className='pt-20 container mx-auto p-10'>
                <div>Orders</div>
                <div className="flex flex-col gap-5 mt-5">
                    {
                        data.data.data.items.map((item, index) => {
                            return (
                                <OrderCard index={index} item={item} setIsOpen={setIsOpen} setOrder={setOrder} />
                            )
                        })
                    }
                </div>
            </div>
            <OrderDetailModal order={order} isOpen={isOpen} setIsOpen={setIsOpen} />
        </>
    )
}
