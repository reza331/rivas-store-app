export type AuthUser = {
    id: string;
    name: string;
    email: string;
    role: string;
    tenantIds: string[];
    grants: string[];
    denies: string[];
    scope: Record<string, unknown>;
    permissions: string[];
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