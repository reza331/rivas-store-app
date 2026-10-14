import { create } from 'zustand'

type Toast = { id: string, message: string, type: 'normal' | 'error' }

type ToastStore = {
    toasts: Toast[],
    actions: {
        addToast: (toast: Toast) => void,
        removeToast: (id: string) => void
    }
}

const useToastStore = create<ToastStore>((set) => ({
    toasts: [],
    actions: {
        addToast: (toast) => set({ toasts: [...(useToastStore.getState().toasts || []), toast] }),
        removeToast: (id) => set({ toasts: (useToastStore.getState().toasts || []).filter((t) => t.id !== id) }),
    }
}))

export const useToastList = () => useToastStore((state) => state.toasts)
export const useToastListActions = () => useToastStore((state) => state.actions)