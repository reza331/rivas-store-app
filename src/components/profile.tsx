import useWalletQuery from '@/hooks/api/useWalletQuery'
import { useAuthStoreActions } from '@/stores/auth-store'
import { AuthUser } from '@/types/auth.type'
import { useQueryClient } from '@tanstack/react-query'
import { redirect } from 'next/navigation'

export default function Profile({ user }: { user: AuthUser }) {

    const queryClient = useQueryClient()
    const { setUser } = useAuthStoreActions()
    const { data: walletData } = useWalletQuery()

    if (!walletData?.data) return null

    return (
        <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn ring-0 border-0 btn-circle avatar">
                <div className="w-10 rounded-full">
                    <img
                        alt="Tailwind CSS Navbar component"
                        src={'/user-avatar.png'} />
                </div>
            </div>

            <ul
                tabIndex={-1}
                className="menu menu-sm bg-B text-text-A dropdown-content rounded-box z-1 w-47 p-2 shadow">
                <div className='font-semibold ps-2 text-[1rem]'>{user.email}</div>
                <div className='flex items-center gap-2 ps-2'>
                    <div>Balance:</div>
                    <div className='font-semibold ps-2 mb-3 badge badge-sm badge-primary mt-3'>$ {walletData.data.data.balance}</div>
                </div>
                <li onClick={() => redirect('/orders')}><a>Orders</a></li>
                <li onClick={() => redirect('/wishlist')}><a>Wishlist</a></li>
                <li><a>Settings</a></li>
                <li onClick={
                    async () => {
                        localStorage.removeItem('accessToken')
                        queryClient.invalidateQueries({ queryKey: ['me'] })
                        setUser(null)
                    }
                }><a>Logout</a></li>
            </ul>
        </div>
    )
}
