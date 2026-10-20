import { getOrders } from "@/services/payment-order.service";
import { useQuery } from "@tanstack/react-query";

export default function useOrdersQuery() {
    return useQuery({
        queryKey: ['orders'],
        queryFn: () => getOrders()
    })
}
