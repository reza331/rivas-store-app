'use client'
import { useAuthStoreActions, useAuthStoreUser } from "@/stores/auth-store";
import Profile from "./profile";
import ThemeControl from "./theme-control";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useMeQuery from "@/hooks/api/useMeQuery";
import { useEffect } from "react";


export default function Navbar() {

    const pathname = usePathname()
    const user = useAuthStoreUser()
    const { setUser } = useAuthStoreActions()
    const { data, isLoading } = useMeQuery()

    if (pathname === '/login') return null

    useEffect(() => {
        if (data?.data) {
            setUser(data.data)
        }
    }, [data])

    if (isLoading) return null

    return (
        <div className="w-dvw bg-[#1b1b1b] text-white fixed z-50 top-0 left-0 flex justify-center shadow-sm px-5 lg:px-10">
            <div className="container navbar">
                <div className="flex-1">
                    <a className="text-xl font-bold">Rivas Store</a>
                </div>
                <div className="flex items-center">
                    {/* theme control */}
                    <ThemeControl />
                    {/* cart */}
                    <div className="dropdown pt-1 dropdown-end mx-5">
                        <div tabIndex={0} role="button" className="btn btn-circle bg-transparent border-0 ring-0">
                            {/* indicator */}
                            <div className="indicator">
                                <svg xmlns="http://www.w3.org/2000/svg" className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /> </svg>
                                <span className="badge badge-sm text-white bg-rose-700 indicator-item">8</span>
                            </div>
                        </div>
                        {/* <div
                        tabIndex={0}
                        className="card card-sm dropdown-content bg-base-100 z-1 mt-3 w-52 shadow">
                        <div className="card-body">
                            <span className="text-lg font-bold">8 Items</span>
                            <span className="text-info">Subtotal: $999</span>
                            <div className="card-actions">
                                <button className="btn btn-primary btn-block">View cart</button>
                            </div>
                        </div>
                    </div> */}
                    </div>
                    {/* profile */}
                    {user ? (
                        <Profile user={user} />
                    ) : (
                        <Link href={'/login'} className="btn btn-ghost">Login</Link>
                    )}
                </div>
            </div>
        </div>

    )

}
