import useProductQuery from '@/hooks/api/useProductQuery'
import React from 'react'

export default function CartMiniCard({ id , quantity}: { id: string , quantity:number }) {

    const { data } = useProductQuery(id)

    if (!data?.data) return null

    return (
        <div className="flex items-center gap-3 bg-A rounded-xl p-3">
            <div className="size-8">
                <img className="size-full object-contain" src={data.data.data.images[0]} alt="" />
            </div>
            <div>
                <div className="flex items-center gap-2"><span className="line-clamp-1">{data.data.data.name}</span><div className="badge badge-xs badge-primary">{quantity}</div> </div>
                <div className="mt-1 text-text-A/70"> ${data.data.data.price} </div>
            </div>
        </div>
    )
}
