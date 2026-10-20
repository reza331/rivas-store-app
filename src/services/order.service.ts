import { OrderStatus } from "@/types/wallet.type"

const baseUrl = process.env.NEXT_PUBLIC_API_URL

export const changeOrderStatus = async (orderId: string, version: number, status: string) => {

    const token = localStorage.getItem('accessToken')

    const res = await fetch(`${baseUrl}/orders/${orderId}/status`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
            'Idempotency-Key': crypto.randomUUID(),
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(
            {
                status: status,
                expectedVersion: version 
            }
        )
    })

    const data = await res.json()

    console.log(data);
    

    return { data, res }

}

