import { getWallet } from "@/services/wallet.service";
import { useQuery } from "@tanstack/react-query";

export default function useWalletQuery() {
    return useQuery({
        queryKey: ['wallet'],
        queryFn: () => getWallet()
    })
}
