import { getMe } from "@/services/auth.service";
import { useQuery } from "@tanstack/react-query";

export default function useMeQuery() {
    return useQuery({
        queryKey: ['me'],
        queryFn: () => getMe()
    })
}
