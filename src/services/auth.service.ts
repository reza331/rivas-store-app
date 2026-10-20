import { LoginInfo } from "@/types/auth.type"

const baseUrl = process.env.NEXT_PUBLIC_API_URL

export const loginUser = async (loginInfo: LoginInfo) => {

    const res = await fetch(`${baseUrl}/auth/login`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginInfo)
    })

    const data = await res.json()

    console.log(data);

    return { data, res }

}

export const logoutUser = async () => {

    const res = await fetch(`${baseUrl}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
    })

    const data = await res.json()

    return { data, res }

}

export const getMe = async () => {

    const token = localStorage.getItem('accessToken')

    const res = await fetch(`${baseUrl}/auth/me`, {
        credentials: 'include',
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    const data = await res.json()
    return { data, res }

}