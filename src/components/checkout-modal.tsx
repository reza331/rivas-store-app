import { createOrder, payOrder } from "@/services/payment-order.service";
import { CheckoutData } from "@/types/wallet.type";
import { redirect } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

interface Prop {
    isOpen: boolean
    setIsOpen: Dispatch<SetStateAction<boolean>>
    checkout: CheckoutData
}

export default function CheckoutModal({ isOpen, setIsOpen, checkout }: Prop) {


    const pay = async () => {
        const { data, res } = await createOrder()
        if (!res.ok) {
            alert('failed')
            return
        }
        console.log(data.data.id);
        const { data: paydata, res: payres } = await payOrder(data.data.id)
        if (!payres.ok) {
            alert('failed')
            return
        }
        console.log(paydata);
        redirect('/orders')
    }

    if (!isOpen) return null

    return (
        <div className='w-dvw flex items-center justify-center h-dvh bg-black/50 fixed top-0 left-0 z-50 backdrop-blur-md'>
            <div className="p-3 bg-B rounded-2xl w-90">
                <h2 className="flex justify-center">Order summray</h2>
                <form className="flex flex-col mt-3 gap-3">
                    <div className="bg-A rounded-2xl p-3">Items : {checkout.lines.length} item</div>
                    <div className="bg-A rounded-2xl p-3">Subtotal : ${checkout.subtotal}</div>
                    <div className="bg-A rounded-2xl p-3">Discount : ${checkout.discount}</div>
                    <div className="bg-A rounded-2xl p-3">Shipping : ${checkout.shipping}</div>
                    <div className="bg-A rounded-2xl p-3">Total : ${checkout.total}</div>
                    <button onClick={() => pay()} type="button" className="btn btn-primary">PAY</button>
                    <button onClick={() => setIsOpen(false)} type="button" className="btn btn-error">Cancel</button>
                </form>
            </div>
        </div>
    )
}
