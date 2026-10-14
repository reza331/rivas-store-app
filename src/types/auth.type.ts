export type AuthUser = {
    sub: number
    username: string
    email: string
    avatar: string | null
    role: string
}

export type LoginInfo = {
    email: string
    password: string
}

export type RegisterInfo = {
    username: string
    email: string
    password: string
    firstName?: string
    lastName?: string
    phoneNumber?: string
}