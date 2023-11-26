import { User, UserProps } from "src/Inlar/Types/User";

export abstract class UserRepository {
    abstract createUser(user: User | UserProps): Promise<void>
    abstract getUserById(id: string): Promise<User | undefined>
    abstract getUserByEmail(email: string): Promise<User | undefined>
}