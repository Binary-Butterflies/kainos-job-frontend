import { UserRole } from "./UserRole"

export type JwtToken = {
    Email: string,
    Role: UserRole
}