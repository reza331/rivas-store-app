'use client'
import { loginUser } from "@/services/auth.service"
import { useAuthStoreActions } from "@/stores/auth-store"
import { LoginInfo } from "@/types/auth.type"
import { redirect } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"

export default function Page() {

    const [loading, setLoading] = useState(false)
    const { register, handleSubmit } = useForm<LoginInfo>()
    const { setUser } = useAuthStoreActions()


    const loginSubmit = async (data: LoginInfo) => {
        if (loading) return
        setLoading(true)
        const { data: apiData, res: apiResponse } = await loginUser(data)
        console.log(apiData);
        console.log(apiResponse);
        if (!apiResponse.ok) {
            setTimeout(() => { setLoading(false) }, 1000)
            // createToast({ message: apiData.message, type: 'error' })
            alert(apiData.message)
            return
        }
        // createToast({ message: apiData.message, type: 'normal' })
        alert(apiData.message)
        setTimeout(() => { setLoading(false) }, 1000)
        setUser(apiData.user)
        redirect('/')
    }

    return (
        <div className="w-dvw h-dvh flex justify-center items-center">
            <div className="bg-B p-5 rounded-2xl shadow-lg">
                <form onSubmit={handleSubmit(loginSubmit)} className="flex flex-col gap-3">
                    <input
                        {...register('email')}
                        className="block px-3 py-2 placeholder:text-xs rounded-lg outline-0 bg-A" placeholder="email..." type="text" />
                    <input
                        {...register('password')}
                        className="block px-3 py-2 placeholder:text-xs rounded-lg outline-0 bg-A" placeholder="password..." type="text" />
                    <button type="submit" className="btn btn-primary btn-sm">Login</button>
                </form>
            </div>
        </div>
    )
}
