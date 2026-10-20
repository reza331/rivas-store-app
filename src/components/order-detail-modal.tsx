import { Order } from "@/types/wallet.type";
import { Dispatch, SetStateAction } from "react";
import OrderItemCard from "./order-item-card";

interface Prop {
    isOpen: boolean
    setIsOpen: Dispatch<SetStateAction<boolean>>
    order: Order
}

export default function OrderDetailModal({ isOpen, setIsOpen, order }: Prop) {

    if (!isOpen) return null

    return (
        <div className='w-dvw flex items-center justify-center h-dvh bg-black/50 fixed top-0 left-0 z-50 backdrop-blur-md'>
            <div className="p-3 bg-B rounded-2xl w-100">
                <div className="flex items-center justify-between">
                    <button onClick={() => setIsOpen(false)} className="btn btn-sm btn-error">Close</button>
                    <div className={`badge badge-sm p-3 ${order.paymentStatus === 'paid' ? 'bg-teal-600' : 'bg-rose-700'}`}>{order.paymentStatus}</div>
                </div>
                <div className="my-3 ps-3">Items:</div>
                <div className="flex flex-col gap-5 h-70 overflow-y-auto">
                    {
                        order.items.map(item => {
                            return (
                                <OrderItemCard key={item.productId} quantity={item.quantity} producID={item.productId} />
                            )
                        })
                    }
                </div>
                <div className="mt-3 flex flex-col gap-3">
                    {order.paymentStatus === 'unpaid' && <div>Subtotal : ${order.subtotal}</div>}
                    {order.paymentStatus === 'unpaid' && <div>Discount : ${order.discount}</div>}
                    {order.paymentStatus === 'unpaid' && <div>Shipping : ${order.shipping}</div>}
                    <div>Total : ${order.total}</div>
                </div>
            </div>
        </div>
    )
}
