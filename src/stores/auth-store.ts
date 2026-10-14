import { AuthUser } from '@/types/auth.type'
import { create } from 'zustand'

type AuthState = {
    user: AuthUser | null
    actions: {
        setUser: (user: AuthUser | null) => void
        clearUser: () => void
    }
}

const useAuthStore = create<AuthState>((set) => ({
    user: null,
    actions: {
        setUser: (user) => set({ user }),
        clearUser: () => set({ user: null }),
    }
}))

export const useAuthStoreUser = () => useAuthStore((state) => state.user)
export const useAuthStoreActions = () => useAuthStore((state) => state.actions)