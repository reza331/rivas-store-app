import { logoutUser } from '@/services/auth.service'
import { useAuthStoreActions } from '@/stores/auth-store'
import { AuthUser } from '@/types/auth.type'
import { useQueryClient } from '@tanstack/react-query'

export default function Profile({ user }: { user: AuthUser }) {

    const queryClient = useQueryClient()
    const { setUser } = useAuthStoreActions()

    return (
        <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn ring-0 border-0 btn-circle avatar">
                <div className="w-10 rounded-full">
                    <img
                        alt="Tailwind CSS Navbar component"
                        src={user.avatar ?? '/user-avatar.png'} />
                </div>
            </div>

            <ul
                tabIndex={-1}
                className="menu menu-sm bg-B text-text-A dropdown-content rounded-box z-1 w-47 p-2 shadow">
                <div className='font-semibold ps-2 text-[1rem] mb-3'>{user.username}</div>
                <li><a>Settings</a></li>
                <li onClick={
                    async () => {
                        await logoutUser()
                        queryClient.invalidateQueries({ queryKey: ['me'] })
                        setUser(null)
                    }
                }><a>Logout</a></li>
            </ul>
        </div>
    )
}
