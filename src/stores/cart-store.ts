import { Cart } from '@/types/cart.type'
import { create } from 'zustand'

type CartState = {
    cart: Cart | null
    actions: {
        setCart: (cart: Cart | null) => void
    }
}

const useCartStore = create<CartState>((set) => ({
    cart: null,
    actions: {
        setCart: (cart) => set({ cart }),
    }
}))

export const useCartStoreUser = () => useCartStore((state) => state.cart)
export const useCartStoreActions = () => useCartStore((state) => state.actions)