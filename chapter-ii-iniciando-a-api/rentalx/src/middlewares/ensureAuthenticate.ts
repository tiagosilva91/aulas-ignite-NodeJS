import {NextFunction, Request, Response} from 'express';
import { verify } from 'jsonwebtoken'
import { AppError } from '../errors/AppError';
import { UsersRepository } from '../modules/accounts/repositories/implementations/UsersRepository';

interface IPayload {
    sub: string;
}

export async function ensureAuthenticate(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    if(!authHeader) {
        throw new AppError("Token Missing", 401);
    }
    const [, token] = authHeader.split(" ");

    try{ 
        const {sub: user_id } = verify(token, "411771c7cfe1d88205a25d82dd0004bb") as IPayload;

        const usersRepository = new UsersRepository();
        const user = usersRepository.findById(user_id);

        if(!user){
            throw new AppError("User does not exist", 401);
        }

        request.user = {
            id: user_id
        }

        next();
    }catch{
        throw new AppError("Invalid Token", 401);
    }
    

}