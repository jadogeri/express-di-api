// src/controller/UserController.ts
import { Singleton } from 'typescript-ioc';
import { Autowired, Controller } from '../decorators';
import { Request, Response, Router } from 'express';
import { IUserController } from '../interfaces/IUserController.interface';
import { IUserService } from '../interfaces/IUserService.interface';
import { CreateUserDto } from '../dto/request/CreateUserDto.dto';
import { ErrorResponse } from '../entities/ErrorResponse.entity';
import mongoose, { Types } from 'mongoose';
import { UpdateUserDto } from '../dto/request/UpdateUserDto.dto';

@Controller('/users')
@Singleton
export class UserController  implements IUserController{
    @Autowired
    private userService!: IUserService;        
    
    public getUsers= async (_: Request, res: Response) => {

        res.status(200).send(await this.userService.getAllUsers());
    }

    public getUser = async (req: Request, res: Response) => {
        console.log("params id: ", req.params.id)
        if(!mongoose.isValidObjectId(req.params.id)){
   
            res.status(400).send(new ErrorResponse(400,"id must be valid"));
        }
        const userObjectId = new Types.ObjectId(req.params.id)
        const user = await this.userService.getUserById(userObjectId);
        if (user) {
            res.status(200).send(user);
        } else {
            res.status(404).send('User not found');
        }
    }

    public updateUser = async (req: Request, res: Response) => {
        if(!mongoose.isValidObjectId(req.params.id)){
   
            res.status(400).send(new ErrorResponse(400,"id must be valid"));
        }
        const userObjectId = new Types.ObjectId(req.params.id)
        const reqBody: UpdateUserDto = req.body;
        if(!reqBody.username && !reqBody.email !){
            res.status(400).send(new ErrorResponse(400,"username or email is required"));
        }
                console.log("before update ",reqBody)

        const user = await this.userService.updateUser(userObjectId, reqBody);
        console.log("after update ",user)
        if (user) {
            res.status(200).send(user);
        } else {
            res.status(404).send('User not found');
        }
    }

    public deleteUser = async (req: Request, res: Response) => {
        console.log("params id: ", req.params.id)
        if(!mongoose.isValidObjectId(req.params.id)){
   
            res.status(400).send(new ErrorResponse(400,"id must be valid"));
        }
        const userObjectId = new Types.ObjectId(req.params.id)
        const user = await this.userService.deleteUserById(userObjectId);
        if (user) {
            res.status(200).send(user);
        } else {
            res.status(404).send('User not found');
        }
    }
    public createUser = async  (req: Request, res: Response) => {
            const createUserDto : CreateUserDto = req.body;
            if(!createUserDto.email || !createUserDto.username)
            res.status(400).send("All fields are required");

            console.log("user in body", createUserDto)
            const newUser = await this.userService.createUser(createUserDto);
            res.status(201).json(newUser);
        }

    getRouter(): Router {
        const router = Router();

        router.get('/', this.getUsers);

        router.get('/:id', this.getUser);

        router.delete('/:id', this.deleteUser);

        router.put('/:id', this.updateUser);

        router.post('/', this.createUser);

        return router;
    }
}

export default new UserController().getRouter()