"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCouser = void 0;
const CreateCourseService_1 = __importDefault(require("./CreateCourseService"));
function createCouser(request, response) {
    CreateCourseService_1.default.execute({
        name: "nodejs",
        educator: "Dani",
        duration: 10
    });
    return response.send();
}
exports.createCouser = createCouser;
