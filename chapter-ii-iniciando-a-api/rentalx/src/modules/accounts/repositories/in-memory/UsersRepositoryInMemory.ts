import { ICreateUsersDTO } from "../../dtos/ICreateUsersDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";


class UsersRepositoryInMemory implements IUsersRepository {
    users: User[] = [];

    async create({ name, password, email, driver_license, }: ICreateUsersDTO): Promise<void> {
        const user = new User();
        Object.assign(user, { name, password, email, driver_license});
        this.users.push(user);

    }
    async findByEmail(email: string): Promise<User> {
        return this.users.find(user => user.email === email);
    }

    async findById(id: string): Promise<User> {
        return this.users.find(user => user.id === id);
    }

}

export { UsersRepositoryInMemory }