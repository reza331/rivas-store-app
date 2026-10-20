import { changeOrderStatus } from '@/services/order.service'
import { useAuthStoreUser } from '@/stores/auth-store'
import { Order } from '@/types/wallet.type'
import { useQueryClient } from '@tanstack/react-query'
import { Dispatch, SetStateAction, useState } from 'react'

interface OrderCardProps {
    setOrder: Dispatch<SetStateAction<Order>>
    setIsOpen: Dispatch<SetStateAction<boolean>>
    item: Order
    index: number
}

export default function OrderCard({ setIsOpen, setOrder, item, index }: OrderCardProps) {

    const [selectValue, setSelectValue] = useState('status_select')
    const [loading, setLoading] = useState(false)
    const queryClient = useQueryClient()
    const user = useAuthStoreUser()

    const saveHanlder = async (e: any) => {
        e.preventDefault()
        e.stopPropagation()
        if (loading) return
        setLoading(true)
        const { data, res } = await changeOrderStatus(item.id, item.version, selectValue)
        if (!res.ok) {
            alert('failed')
            setLoading(false)
            return
        }
        setLoading(false)
        queryClient.invalidateQueries({ queryKey: ['orders'] })
        setSelectValue('status_select')
    }

    if (!user) return null

    return (
        <div
            key={item.id} className="bg-B p-5 rounded-2xl flex justify-between items-center">
            <div className='cursor-pointer' onClick={() => {
                setOrder(item)
                setIsOpen(true)
            }}>Order {index + 1}</div>
            <div className="flex items-center gap-5">
                <div className='badge badge-primary'>
                    {item.status}
                </div>
                <div className={`text-white badge ${item.paymentStatus === 'paid' ? 'bg-teal-600' : 'bg-rose-700'}`}>
                    {item.paymentStatus}
                </div>
                <div>${item.total}</div>
                {
                    user.permissions.some(p => p === 'orders:write') &&
                    <select
                        className="bg-B border-2 p-2 rounded-2xl"
                        onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                        }}
                        value={selectValue}
                        onChange={(e) => {
                            setSelectValue(e.target.value);
                        }}
                    >
                        <option value="status_select">Status</option>
                        {item.status === 'pending' && <option value="processing">processing</option>}
                        {item.status === 'processing' && <option value="shipped">shipped</option>}
                        {item.status === 'shipped' && <option value="delivered">delivered</option>}
                        {item.status === 'delivered' && <option value="cancelled">cancelled</option>}
                        {item.status === 'cancelled' && <option value="returned">returned</option>}
                    </select>
                }
                <button onClick={(e) => saveHanlder(e)} disabled={selectValue === 'status_select'} className="btn btn-primary btn-sm">Save</button>
            </div>
        </div>
    )
}
