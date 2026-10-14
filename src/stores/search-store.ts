
import { Product } from "@/types/products.type";
import { create } from "zustand";

interface AudioStore {
    searchValue: string,
    isSearching: boolean,
    data: Product[]
    searchedList: Product[]
    actions: {
        setSearchValue: (value: string) => void
        setIsSearching: (value: boolean) => void
        setSearchedList: (value: Product[]) => void
        setData: (value: Product[]) => void
    }
}

const useSearchStore = create<AudioStore>((set) => ({
    data: [],
    searchValue: '',
    isSearching: false,
    searchedList: [],
    actions: {
        setSearchValue: (newSearchValue) => set(() => ({ searchValue: newSearchValue })),
        setIsSearching: (newIsSearching) => set(() => ({ isSearching: newIsSearching })),
        setSearchedList: (newSearchedList) => set(() => ({ searchedList: newSearchedList })),
        setData: (newData) => set(() => ({ data: newData })),

    },
}))

export const useSearchValue = () => useSearchStore((state) => state.searchValue)
export const useIsSearching = () => useSearchStore((state) => state.isSearching)
export const useSearchedList = () => useSearchStore((state) => state.searchedList)
export const useData = () => useSearchStore((state) => state.data)
export const useSearchActions = () => useSearchStore((state) => state.actions)
