import { fetchProducts } from "@/services/products.service";
import { useQuery } from "@tanstack/react-query";

export default function useProductsQuery() {
    return useQuery({
        queryKey: ['products'],
        queryFn: () => fetchProducts(),
        retry: 0
    })
}
