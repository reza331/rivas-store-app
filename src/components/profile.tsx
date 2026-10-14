import { AuthUser } from '@/types/auth.type'
import React from 'react'

export default function Profile({ user }: { user: AuthUser }) {
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
                className="menu menu-sm bg-B text-text-A dropdown-content rounded-box z-1 w-52 p-2 shadow">
                <li><a>Settings</a></li>
                <li><a>Logout</a></li>
            </ul>
        </div>
    )
}
