'use client'
import { useToastListActions } from "@/stores/toast-store";

interface UseToast { message: string; type?: 'normal' | 'error'; }

const useToast = () => {

    const { addToast, removeToast } = useToastListActions()

    const createToast = ({ message, type = 'normal' }: UseToast) => {
        const id = crypto.randomUUID()
        addToast({ id, message, type })
        setTimeout(() => { removeToast(id) }, 1000)
    }

    return { createToast }

}

export default useToast