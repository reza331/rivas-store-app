'use client'
import CartCard from "@/components/cart-card"
import CheckoutModal from "@/components/checkout-modal"
import useCartQuery from "@/hooks/api/useCartQuery"
import useToast from "@/hooks/use-toast"
import { clearCart } from "@/services/cart.service"
import { checkoutQ } from "@/services/payment-order.service"
import { useAuthStoreUser } from "@/stores/auth-store"
import { CheckoutData } from "@/types/wallet.type"
import { useQueryClient } from "@tanstack/react-query"
import { useState } from "react"


export default function CartContent() {

    const [loading, setLoading] = useState(false)
    const { data, isError, isLoading, refetch } = useCartQuery()
    const queryClient = useQueryClient()
    const { createToast } = useToast()
    const user = useAuthStoreUser()
    const [isOpen, setIsOpen] = useState(false)
    const [checkout, setCheckout] = useState<CheckoutData>({} as CheckoutData)


    const clearHandler = async () => {
        if (loading) return
        setLoading(true)
        const result = await clearCart()
        if (!result.res.ok) {
            createToast({ message: 'something went wrong', type: 'error' })
            setLoading(false)
            return
        }
        queryClient.invalidateQueries({ queryKey: ['cart'] })
        setLoading(false)
    }

    if (!user) return null

    if (isError) return (<div className="w-full flex items-center justify-center h-[calc(100dvh-200px)]">Failed to fetch content, <button className="cursor-pointer" onClick={() => refetch()}>Retry</button> </div>)

    if (isLoading) return (<div className="w-full flex items-center justify-center h-[calc(100dvh-200px)]">Loading content ... </div>)


    if (data?.data.data.items.length === 0) return (
        <div className="flex justify-center mt-20">Your cart is Empty</div>
    )

    return (
        <>
            <div className="flex flex-col gap-5">
                {data?.data.data.items.map(item => {
                    return (
                        <CartCard key={item.productId} id={item.productId} quantity={item.quantity} />
                    )
                })}
            </div>
            {/* totla price */}
            <div className="fixed text-xs sm:text-[1rem] -translate-x-1/2 sm:flex-row w-75 sm:w-85 items-center justify-center flex gap-5 bg-A/50 backdrop-blur-lg border-text-A/20 border-2 right-1/2 left-1/2 bottom-5 p-3 rounded-2xl">
                {/* <div className="whitespace-nowrap">Total Price - ${data?.data.data.totalPrice ?? 0} </div> */}
                <button onClick={async () => {
                    const { data, res } = await checkoutQ()
                    if (!res.ok) return
                    setIsOpen(true)
                    setCheckout(data.data)
                }} className="btn btn-accent btn-xs sm:btn-sm">Check out</button>
                <button onClick={() => clearHandler()} className="btn btn-error btn-xs sm:btn-sm">Clear</button>
            </div>
            {/*  */}
            <CheckoutModal checkout={checkout} isOpen={isOpen} setIsOpen={setIsOpen} />
        </>
    )
}
