import { AppError } from "../../../../errors/AppError";
import { ICreateUsersDTO } from "../../dtos/ICreateUsersDTO";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticadeUserUseCase } from "./AuthenticadeUserUseCase"


let authenticateUserUseCase: AuthenticadeUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        authenticateUserUseCase = new AuthenticadeUserUseCase(usersRepositoryInMemory);
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    })
    it("should be able to authent an user", async () => {
        const user: ICreateUsersDTO = {
            name: "Test User",
            email: "test@example.com",
            driver_license: "1234",
            password: "password",
        }
        await createUserUseCase.execute(user);

        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password,

        });

        expect(result).toHaveProperty("token");


    });

    it("should be able to authent an nonexistent user", async () => {
        expect(async () => {
            await authenticateUserUseCase.execute({
                email: "false@email.com",
                password: "1234",
            })
        }).rejects.toBeInstanceOf(AppError)
    });

    it("should be able to authent an nonexistent password", async () => {
        expect(async () => {
            const user: ICreateUsersDTO = {
                name: "Test User",
                email: "test@example.com",
                driver_license: "1234",
                password: "password",
            }
            await createUserUseCase.execute(user);
    
            await authenticateUserUseCase.execute({
                email: user.email,
                password: "false",
    
            });
        }).rejects.toBeInstanceOf(AppError)
    });

})