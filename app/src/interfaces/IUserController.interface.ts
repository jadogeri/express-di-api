import { Request, Response, Router } from "express";
export abstract class IUserController {

    abstract createUser(req: Request, res: Response) : Promise<void>;
    
    abstract getUser(req: Request, res: Response) : Promise<void>;

    abstract getUsers(req: Request, res: Response) : Promise<void>;

    abstract getRouter(): Router


}