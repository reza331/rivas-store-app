'use client'
import { useAuthStoreActions, useAuthStoreUser } from "@/stores/auth-store";
import Profile from "./profile";
import ThemeControl from "./theme-control";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import useMeQuery from "@/hooks/api/useMeQuery";
import { useEffect } from "react";
import useCartQuery from "@/hooks/api/useCartQuery";


export default function Navbar() {

    const pathname = usePathname()
    const user = useAuthStoreUser()
    const { setUser } = useAuthStoreActions()
    const { data, isLoading } = useMeQuery()
    const { data: cartData } = useCartQuery()

    useEffect(() => {
        if (data?.data && data.res.ok) {
            console.log('log =>', data.data);
            setUser(data.data)
        }
    }, [data])


    if (pathname === '/login') return null
    if (isLoading) return null

    return (
        <div className="w-dvw bg-[#1b1b1b] text-white fixed z-50 top-0 left-0 flex justify-center shadow-sm px-5 lg:px-10">
            <div className="container navbar">
                <div className="flex-1">
                    <button onClick={() => { redirect('/') }} className="text-xl font-bold">Rivas Store</button>
                </div>
                <div className="flex items-center">
                    {/* theme control */}
                    <ThemeControl />
                    {/* cart */}
                    {
                        (user && cartData?.res.ok) &&
                        <div className="dropdown pt-1 dropdown-end mx-5">
                            <div tabIndex={0} role="button" className="btn btn-circle bg-transparent border-0 ring-0">
                                {/* indicator */}
                                <div className="indicator">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /> </svg>
                                    <span className="badge badge-sm text-white bg-rose-700 indicator-item">{cartData.data.items.length}</span>
                                </div>
                            </div>
                            <div
                                tabIndex={0}
                                className="card card-sm bg-B dropdown-content z-1 mt-1 w-60 sm:w-72 shadow">
                                <div className="card-body">
                                    {
                                        cartData.data.items.slice(0, 3).map(item => {
                                            return (
                                                <div key={item.id} className="flex items-center gap-3 bg-A rounded-xl p-3">
                                                    <div className="size-8">
                                                        <img className="size-full object-contain" src={item.product.mainImage} alt="" />
                                                    </div>
                                                    <div>
                                                        <div className="flex items-center gap-2"><span className="line-clamp-1">{item.product.name}</span><div className="badge badge-xs badge-primary">{item.quantity}</div> </div>
                                                        <div className="mt-1 text-text-A/70"> ${item.product.price} </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                    {
                                        cartData.data.items.length === 0 && <div className="flex justify-center text-text-A/50">Your cart is empty</div>
                                    }
                                    <div className="flex justify-center">...</div>
                                    <div className="card-actions mt-2">
                                        <button onClick={() => redirect('/cart')} className="btn btn-primary btn-block btn-sm">View cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
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
