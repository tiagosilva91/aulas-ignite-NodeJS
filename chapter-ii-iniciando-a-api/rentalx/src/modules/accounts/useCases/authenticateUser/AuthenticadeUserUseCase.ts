import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository"
import { compare } from "bcryptjs"
import { sign } from 'jsonwebtoken'
import { AppError } from "../../../../errors/AppError";

interface IRequest{
    email: string;
    password: string;
}

interface IResponse {
    user:{
        name: string;
        email: string;
    }
    token: string;
}

@injectable()
class AuthenticadeUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {}

    async execute({email, password}: IRequest): Promise<IResponse>{
        // Usuer Exists
        const user = await this.usersRepository.findByEmail(email);

        if(!user){
            throw new AppError("Email or Password incorrect");
        }
        // Password is correct
        const passworMatch = await compare(password, user.password);

        if(!passworMatch){
            throw new AppError("Email or Password incorrect");
        }
        // Create jwt 
        const token = sign({}, "411771c7cfe1d88205a25d82dd0004bb", { 
            subject: user.id,
            expiresIn: "1d"
        })

        const tokenReturn: IResponse = {
            token,
            user: {
                name: user.name,
                email: user.email
            }
        }

        return tokenReturn;

    }
}

export { AuthenticadeUserUseCase }