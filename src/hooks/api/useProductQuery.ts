import { fetchProduct } from "@/services/products.service";
import { useQuery } from "@tanstack/react-query";

export default function useProductQuery(sku: string) {
    return useQuery({
        queryKey: ['product', sku],
        queryFn: () => fetchProduct(sku)
    })
}
