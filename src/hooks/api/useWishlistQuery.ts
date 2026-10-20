import { fetchwishlists } from '@/services/products.service'
import { useQuery } from '@tanstack/react-query'

export default function useWishlistQuery() {
    return useQuery({
        queryKey: ['wishlist'],
        queryFn: () => fetchwishlists()
    })
}
