import {Request, Response } from 'express'
import CreateCourseService from './CreateCourseService'

export function createCouser (request: Request, response: Response) {
    CreateCourseService.execute({
        name: "nodejs",
        educator: "Dani",
        duration: 10
    })

    CreateCourseService.execute({
        name: "ReactJs",
        educator: "Diego"
    })

    return response.send();
}