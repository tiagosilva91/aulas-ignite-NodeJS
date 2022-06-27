import {Response, Request} from 'express';
import { ListCategoiresUseCase } from './ListCategoiresUseCase';
import { container } from "tsyringe";




class ListCategoiresController {
    

    async handle(request: Request, response: Response): Promise<Response> {
        const listCategoryUseCase = container.resolve(ListCategoiresUseCase);
        const all = await listCategoryUseCase.execute();
        return response.json(all)
    }
}

export {ListCategoiresController}