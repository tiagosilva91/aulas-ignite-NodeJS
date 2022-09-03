import { AppError } from "../../../../errors/AppError";
import { CategoriesRepositoryInMemory } from "../../repositories/in-memory/CategoriesRepositoryInMemory"
import { CreateCategoryUseCase } from "./CreateCategoryUseCase"

let createCategory: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe('Create Category', () => {

    beforeEach(()=>{
        categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
        createCategory = new CreateCategoryUseCase(categoriesRepositoryInMemory);
    })
    it("should be able to create a new category", async () => {
        const category = {
            name:"Category Teste",
            description:"Teste Description",
        }
        await createCategory.execute(category);

        const categoryCreated = await categoriesRepositoryInMemory.findByName(category.name)
        expect(categoryCreated).toHaveProperty("id");
        expect(categoryCreated.name).toEqual(category.name);
        expect(categoryCreated.description).toEqual(category.description);
        expect(categoriesRepositoryInMemory.categories).toContain(categoryCreated);
    });

    it("should not be able to create a new category with name exists", async () => {
        expect(async() =>{
            const category = {
                name:"Category Teste",
                description:"Teste Description",
            }
            await createCategory.execute(category);
            await createCategory.execute(category);
        }).rejects.toBeInstanceOf(AppError);

    
    })
})