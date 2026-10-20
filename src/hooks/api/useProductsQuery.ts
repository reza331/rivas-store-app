import { fetchProducts } from '@/services/products.service'
import { useQuery } from '@tanstack/react-query'

export default function useProductsQuery(cursor: number, q?: string) {
    const normalizedQuery = q?.trim() ?? ''

    return useQuery({
        queryKey: ['products', normalizedQuery, cursor],
        queryFn: () => fetchProducts({ cursor, q: normalizedQuery }),
        retry: 0,
    })
}