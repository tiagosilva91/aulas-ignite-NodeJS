import { Category } from "../../entities/Category";
import { ICreateCategoryDTO, ICategoriesRepository } from "../IcategoriesRepository";
import { getRepository, Repository } from 'typeorm'



class CategoriesRepository implements ICategoriesRepository {

    private repository: Repository<Category>;

    constructor() {
        this.repository = getRepository(Category);
    }

    // public static getInstance(): CategoriesRepository {

    //     if(!CategoriesRepository.INSTANCE){
    //         CategoriesRepository.INSTANCE = new CategoriesRepository();
    //     }
    //     return CategoriesRepository.INSTANCE;
    // }

    async create({ name, description }: ICreateCategoryDTO): Promise<void> {

        const category = this.repository.create({
            name, description
        })
        //const category = new Category()

        // Object.assign(category, {
        //     name,
        //     description,
        //     created_at: new Date(),
        // })

      await this.repository.save(category);
    }

   async list(): Promise<Category[]> {
        const categories = await this.repository.find();
        // return this.categories;
        return categories;
    }

    async findByName(name: string): Promise<Category>{
        const category = await this.repository.findOne({name})
        return category;
    }
}

export { CategoriesRepository }