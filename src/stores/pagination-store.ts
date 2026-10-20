import { create } from 'zustand'


type PageStore = {
    page: number,
    cursor: number,
    total: null | number,
    actions: {
        setPage: (id: number) => void
        setCursor: (id: number) => void
        setTotal: (id: number) => void
    }
}

const usePageStore = create<PageStore>((set) => ({
    page: 1,
    cursor: 0,
    total: null,
    actions: {
        setPage: (id) => set({ page: id }),
        setCursor: (id) => set({ cursor: id }),
        setTotal: (id) => set({ total: id }),
    }
}))

export const usePage = () => usePageStore((state) => state.page)
export const useCursor = () => usePageStore((state) => state.cursor)
export const useTotal = () => usePageStore((state) => state.total)
export const usePagetActions = () => usePageStore((state) => state.actions)