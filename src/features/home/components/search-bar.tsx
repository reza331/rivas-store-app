'use client'
import { AiOutlineSearch } from 'react-icons/ai'
import useSearch from '../hooks/use-search'

export default function SearchBar() {

    const { handleSearch } = useSearch()

    return (
        <label className="flex gap-3 items-center rounded-2xl shadow-sm bg-B text-text-A ps-5 py-3">
            <AiOutlineSearch className='text-text-A/50 size-6' />
            <input
                onChange={(e) => handleSearch(e.target.value)}
                type="text" placeholder="Search produce , categories ..."
                className="grow bg-B outline-0 border-0 placeholder:font-semibold"
            />
        </label>
    )
}
