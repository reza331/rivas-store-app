'use client'
import { useToastList } from "@/stores/toast-store"

const Toast = () => {

    const toasts = useToastList()

    return (
        <div className="fixed flex flex-col gap-3 z-99999 top-5 left-5 ">
            {toasts.map(toast => {
                if (toast.type === 'normal') {
                    return (<div key={toast.id} className="bg-primary text-white py-2 px-3 rounded-xl text-xs">{toast.message}</div>)
                }
                if (toast.type === 'error') {
                    return (<div key={toast.id} className="bg-rose-800 text-white py-2 px-3 rounded-xl text-xs">{toast.message}</div>)
                }
                return null
            })}
        </div>
    )

}

export default Toast