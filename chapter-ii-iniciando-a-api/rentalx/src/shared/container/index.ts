import { container } from "tsyringe";

import { IUsersRepository } from "../../modules/accounts/repositories/IUsersRepository";
import {UsersRepository} from "../../modules/accounts/repositories/implementations/UsersRepository"

import { ICategoriesRepository } from '../../modules/cars/repositories/IcategoriesRepository'
import { CategoriesRepository } from '../../modules/cars/repositories/implementations/CategoriesRepository'

import { SpecificationsRepository } from "../../modules/cars/repositories/implementations/SpecificationsRepository";
import { ISpecificationsRepository } from "../../modules/cars/repositories/ISpecificationsRepository";

// ICategoryRepository
container.registerSingleton<ICategoriesRepository>(
    "CategoriesRepository", CategoriesRepository
);

//ISpecificationsRepository
container.registerSingleton<ISpecificationsRepository>(
    "SpecificationsRepository", SpecificationsRepository
)

container.registerSingleton<IUsersRepository>(
    "UsersRepository", UsersRepository
)