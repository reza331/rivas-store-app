'use client'
import useCartQuery from "@/hooks/api/useCartQuery"
import useToast from "@/hooks/use-toast"
import { clearCart, deleteCartItem, editCartItem } from "@/services/cart.service"
import { useAuthStoreUser } from "@/stores/auth-store"
import { useQueryClient } from "@tanstack/react-query"
import { useState } from "react"


export default function CartContent() {

    const [loading, setLoading] = useState(false)
    const { data, isError, isLoading, refetch } = useCartQuery()
    const queryClient = useQueryClient()
    const { createToast } = useToast()
    const user = useAuthStoreUser()

    const increaseItem = async (id: number, quantity: number, stock: number) => {
        if (loading || quantity === stock) return
        setLoading(true)
        const result = await editCartItem(id, quantity + 1)
        if (!result.res.ok) {
            createToast({ message: 'something went wrong', type: 'error' })
            setLoading(false)
            return
        }
        queryClient.invalidateQueries({ queryKey: ['cart'] })
        setLoading(false)
    }

    const decreaseItem = async (id: number, quantity: number) => {
        if (loading || quantity === 1) return
        setLoading(true)
        const result = await editCartItem(id, quantity - 1)
        if (!result.res.ok) {
            createToast({ message: 'something went wrong', type: 'error' })
            setLoading(false)
            return
        }
        queryClient.invalidateQueries({ queryKey: ['cart'] })
        setLoading(false)
    }

    const deleteCartItemHandler = async (id: number) => {
        if (loading) return
        setLoading(true)
        const result = await deleteCartItem(id)
        if (!result.res.ok) {
            createToast({ message: 'something went wrong', type: 'error' })
            setLoading(false)
            return
        }
        queryClient.invalidateQueries({ queryKey: ['cart'] })
        setLoading(false)
    }

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


    if (data?.data.items.length === 0) return (
        <div className="flex justify-center mt-20">Your cart is Empty</div>
    )

    return (
        <>
            <div className="flex flex-col gap-5">
                {data?.data.items.map(item => {
                    return (
                        <div key={item.id} className="gap-5 sm:gap-0 flex flex-col sm:flex-row justify-between sm:items-center bg-B p-5 rounded-2xl">
                            {/*  */}
                            <div className="flex gap-4 items-center">
                                <div className="size-16">
                                    <img className="size-full object-contain" src={item.product.mainImage} alt="" />
                                </div>
                                <div>
                                    <h2 className="line-clamp-1 font-semibold">{item.product.name}</h2>
                                    <div className="flex items-center gap-3">
                                        <div className="text-text-A/70">$ {item.product.price} -- stock: {item.product.stock}</div>
                                    </div>
                                </div>
                            </div>
                            {/*  */}
                            <div className="flex items-center gap-3">
                                <div className="join join-horizontal">
                                    <button
                                        disabled={item.quantity === 1}
                                        onClick={() => decreaseItem(item.id, item.quantity)}
                                        className="btn btn-primary join-item btn-sm disabled:bg-gray-600 text-white">-</button>
                                    <div className="btn bg-B join-item text-text-A btn-sm">{item.quantity}</div>
                                    <button
                                        disabled={item.quantity === item.product.stock}
                                        onClick={() => increaseItem(item.id, item.quantity, item.product.stock)}
                                        className="btn btn-primary join-item btn-sm">+</button>
                                </div>
                                <button
                                    onClick={() => deleteCartItemHandler(item.id)}
                                    className="btn btn-error btn-sm">Delete</button>
                            </div>
                        </div>
                    )
                })}
            </div>
            {/* totla price */}
            <div className="fixed text-xs sm:text-[1rem] -translate-x-1/2 sm:flex-row w-75 sm:w-85 items-center justify-center flex gap-5 bg-A/50 backdrop-blur-lg border-text-A/20 border-2 right-1/2 left-1/2 bottom-5 p-3 rounded-2xl">
                <div className="whitespace-nowrap">Total Price - ${data?.data.totalPrice ?? 0} </div>
                <button className="btn btn-accent btn-xs sm:btn-sm">Check out</button>
                <button onClick={() => clearHandler()} className="btn btn-error btn-xs sm:btn-sm">Clear</button>
            </div>
        </>
    )
}
