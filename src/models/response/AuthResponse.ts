import { IUser } from "../IUser"

interface AuthUser extends IUser {
    todos: []
}

export interface AuthResponse {
    accessToken: string
    refreshToken: string
    user: AuthUser
}