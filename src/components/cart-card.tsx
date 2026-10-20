import useProductQuery from '@/hooks/api/useProductQuery'
import useToast from '@/hooks/use-toast'
import { deleteCartItem, editCartItem } from '@/services/cart.service'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

export default function CartCard({ id, quantity }: { id: string, quantity: number }) {

    const { data } = useProductQuery(id)
    const [loading, setLoading] = useState(false)
    const { createToast } = useToast()
    const queryClient = useQueryClient()

    const increaseItem = async (id: string, quantity: number, stock: number) => {
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

    const decreaseItem = async (id: string, quantity: number) => {
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

    const deleteCartItemHandler = async (id: string) => {
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

    if (!data?.data) return null

    return (
        <div className="gap-5 sm:gap-0 flex flex-col sm:flex-row justify-between sm:items-center bg-B p-5 rounded-2xl">
            {/*  */}
            <div className="flex gap-4 items-center">
                <div className="size-16">
                    <img className="size-full object-contain" src={data.data.data.images[0]} alt="" />
                </div>
                <div>
                    <h2 className="line-clamp-1 font-semibold">{data.data.data.name}</h2>
                    <div className="flex items-center gap-3">
                        <div className="text-text-A/70">$ {data.data.data.price} -- stock: {data.data.data.available}</div>
                    </div>
                </div>
            </div>
            {/*  */}
            <div className="flex items-center gap-3">
                <div className="join join-horizontal">
                    <button
                        disabled={quantity === 1}
                        onClick={() => decreaseItem(id, quantity)}
                        className="btn btn-primary join-item btn-sm disabled:bg-gray-600 text-white">-</button>
                    <div className="btn bg-B join-item text-text-A btn-sm">{quantity}</div>
                    <button
                        disabled={quantity === data.data.data.available}
                        onClick={() => increaseItem(id, quantity, data.data.data.available)}
                        className="btn btn-primary join-item btn-sm">+</button>
                </div>
                <button
                    onClick={() => deleteCartItemHandler(id)}
                    className="btn btn-error btn-sm">Delete</button>
            </div>
        </div>
    )
}
