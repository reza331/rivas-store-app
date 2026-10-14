import { fetchCart } from '@/services/cart.service'
import { useQuery } from '@tanstack/react-query'

export default function useCartQuery() {
    return useQuery({
        queryKey: ['cart'],
        queryFn: () => fetchCart()
    })
}
