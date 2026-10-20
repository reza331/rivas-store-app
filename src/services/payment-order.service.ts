import { CheckoutResponse, OrdersResponse } from "@/types/wallet.type"

const baseUrl = process.env.NEXT_PUBLIC_API_URL

export const checkoutQ = async () => {

    const token = localStorage.getItem('accessToken')

    const res = await fetch(`${baseUrl}/checkout/quote`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({})
    })


    const data: CheckoutResponse = await res.json()

    console.log(data);
    

    return { data, res }

}

export const createOrder = async () => {

    const token = localStorage.getItem('accessToken')

    const res = await fetch(`${baseUrl}/orders`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Idempotency-Key': crypto.randomUUID(),
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({})
    })


    const data = await res.json()
    return { data, res }

}

export const payOrder = async (orderId: string) => {

    const token = localStorage.getItem('accessToken')

    const res = await fetch(`${baseUrl}/payments/checkout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Idempotency-Key': crypto.randomUUID(),
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(
            {
                orderId,
                method: "gateway",
                simulateOutcome: "paid"
            }
        )
    })


    const data = await res.json()
    return { data, res }

}

export const getOrders = async () => {

    const token = localStorage.getItem('accessToken')

    const res = await fetch(`${baseUrl}/orders`, {
        credentials: 'include',
        headers: {
            "Authorization": `Bearer ${token}`
        },
    })


    const data:OrdersResponse = await res.json()

    return { data, res }

}


