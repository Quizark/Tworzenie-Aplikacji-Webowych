import Controller from '../interfaces/controller.interface';
import { Request, Response, NextFunction, Router } from 'express';

let testArr = [4, 5, 6, 3, 5, 3, 7, 5, 13, 5, 6, 4, 3, 6, 3, 6];

class DataController {
    public path = '/api/data';
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/all`, this.getAll);
        this.router.post(`${this.path}/add`, this.addData);
    }

    private getAll = async (request: Request, response: Response, next: NextFunction) => {
        try {
            response.status(200).json(testArr);
        } catch (error) {
            next(error);
        }
    };

    private addData = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const { elem } = request.body;
            testArr.push(elem);
            response.status(200).json(testArr);
        } catch (error) {
            next(error);
        }
    };
}

export default DataController;
