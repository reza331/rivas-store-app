import { Product } from "@/content/data";
import { create } from "zustand";

interface AudioStore {
    searchValue: string,
    isSearching: boolean,
    searchedList: Product[]
    actions: {
        setSearchValue: (value: string) => void
        setIsSearching: (value: boolean) => void
        setSearchedList: (value: Product[]) => void
    }
}

const useSearchStore = create<AudioStore>((set) => ({
    searchValue: '',
    isSearching: false,
    searchedList: [],
    actions: {
        setSearchValue: (newSearchValue) => set(() => ({ searchValue: newSearchValue })),
        setIsSearching: (newIsSearching) => set(() => ({ isSearching: newIsSearching })),
        setSearchedList: (newSearchedList) => set(() => ({ searchedList: newSearchedList })),
    },
}))

export const useSearchValue = () => useSearchStore((state) => state.searchValue)
export const useIsSearching = () => useSearchStore((state) => state.isSearching)
export const useSearchedList = () => useSearchStore((state) => state.searchedList)
export const useSearchActions = () => useSearchStore((state) => state.actions)
