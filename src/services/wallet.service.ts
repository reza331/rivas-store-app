import { WalletResponse } from "@/types/wallet.type"

const baseUrl = process.env.NEXT_PUBLIC_API_URL

export const getWallet = async () => {

    const token = localStorage.getItem('accessToken')

    const res = await fetch(`${baseUrl}/wallet`, {
        credentials: 'include',
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })


    const data: WalletResponse = await res.json()

    return { data, res }

}