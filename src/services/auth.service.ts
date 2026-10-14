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

    const res = await fetch(`${baseUrl}/auth/getme`, {
        credentials: 'include',
    })

    const data = await res.json()
    return { data, res }

}