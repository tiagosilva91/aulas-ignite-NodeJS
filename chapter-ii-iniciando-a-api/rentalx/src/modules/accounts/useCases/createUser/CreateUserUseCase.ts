import { IUsersRepository } from "../../repositories/IUsersRepository";
import{inject, injectable} from "tsyringe";
import { ICreateUsersDTO } from "../../dtos/ICreateUsersDTO";
import { hash } from "bcryptjs";
import { AppError } from "../../../../errors/AppError";

@injectable()
class CreateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {}
    
    async execute({name, password, email, driver_license}: ICreateUsersDTO): Promise<void>{

        const userAlreadyExists = await this.usersRepository.findByEmail(email);

        if(userAlreadyExists){
            throw new AppError("User already exists")
        }

        const passwordHash = await hash(password, 8);

        await this.usersRepository.create({
            name, 
            password: passwordHash, 
            email,  
            driver_license
        })
    } 

}

export {CreateUserUseCase}