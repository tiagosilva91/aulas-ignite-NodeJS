import { Router } from "express";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";
import { CreateSpecificationController } from "../modules/cars/useCases/createSpecification/CreateSpecificationController";


const specificationsRoutes = Router();
const creteSpecificationController = new CreateSpecificationController()

specificationsRoutes.use(ensureAuthenticate);
specificationsRoutes.post("/", creteSpecificationController.handle)

export {specificationsRoutes}