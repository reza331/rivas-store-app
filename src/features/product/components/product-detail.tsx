'use client'
import useProductQuery from "@/hooks/api/useProductQuery"
import useToast from "@/hooks/use-toast"
import { addToCart } from "@/services/cart.service"
import { useQueryClient } from "@tanstack/react-query"
import { useEffect, useState } from "react"

export default function ProductDetail({ id }: { id: string }) {

    const { data } = useProductQuery(id)
    const [count, setCount] = useState(1)
    const { createToast } = useToast()
    const queryClient = useQueryClient()

    const increase = () => {
        if (data?.data.data.available === count) return
        setCount(prev => prev + 1)
    }

    const decrease = () => {
        if (count === 1) return
        setCount(prev => prev - 1)
    }

    const handleAddToCart = async (id: string) => {
        const result = await addToCart(id, count)
        if (!result.res.ok) {
            createToast({ message: 'something went wrong , try again', type: 'error' })
            return
        }
        createToast({ message: 'Product added to cart successfully!', type: 'normal' })
        queryClient.invalidateQueries({ queryKey: ['cart'] })
    }

    if (!data?.data) return null

    return (
        <div className="flex w-full container mx-auto px-10 gap-7">
            {/* image */}
            <div className="w-1/2 h-[calc(100dvh-150px)] p-5 rounded-2xl shadow-sm bg-B">
                <img className="size-full object-contain" src={data.data.data.images[0]} alt="" />
            </div>

            {/* details */}
            <div className="w-1/2 h-fit flex flex-col gap-7">
                {/* title */}
                <h2 className="text-2xl font-semibold pt-2 whitespace-nowrap line-clamp-1">{data.data.data.name}</h2>
                {/* rating */}
                <div className="rating">
                    <input type="radio" name="rating-1" className="mask mask-star bg-orange-400" aria-label="1 star" />
                    <input type="radio" name="rating-1" className="mask mask-star bg-orange-400" aria-label="2 star" />
                    <input type="radio" name="rating-1" className="mask mask-star bg-orange-400" aria-label="3 star" />
                    <input type="radio" name="rating-1" className="mask mask-star bg-orange-400" aria-label="4 star" defaultChecked />
                    <input type="radio" name="rating-1" className="mask mask-star bg-orange-400" aria-label="5 star" />
                </div>
                {/* price */}
                <div className="text-xl">
                    $ {data.data.data.price}
                </div>
                {/* desc */}
                <p className="w-[70%]">{data.data.data.description}</p>
                {/* sotck */}
                <div>Avaibale in stock : {data.data.data.available}</div>
                {/* counter */}
                <div className="join join-horizontal">
                    <button
                        disabled={count === 1}
                        onClick={decrease}
                        className="btn btn-primary join-item btn-sm disabled:bg-gray-600 text-white">-</button>
                    <div className="btn bg-B join-item text-text-A btn-sm">{count}</div>
                    <button
                        disabled={data.data.data.available === count}
                        onClick={increase}
                        className="btn btn-primary join-item btn-sm">+</button>
                </div>
                {/*  */}
                <button disabled={data.data.data.available === 0} onClick={() => handleAddToCart(data.data.data.id)} className="btn btn-primary w-fit rounded-2xl">Add To Cart</button>
            </div>


        </div>
    )
}
