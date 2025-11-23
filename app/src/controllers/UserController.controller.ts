// src/controller/UserController.ts
import { Inject, Singleton } from 'typescript-ioc';
import { Controller } from '../decorators';
import { Request, Response, Router } from 'express';
import { IUserController } from '../interfaces/IUserController.interface';
import { IUserService } from '../interfaces/IUserService.interface';
import { UserCreateType } from '../dto/UserCreateType.type';
import { UserService } from '../services/UserService.service';
    import { Route, Get, Controller as BaseController, Path, Query } from 'tsoa';
import { inject } from 'inversify';

@Controller('/user')
@Route("users")
@Singleton
export class UserController  extends BaseController implements IUserController{
    @Inject
    private userService!: IUserService;        
    
    @Get("/")
    public  async getUsers ( req: Request, res: Response) : Promise<void> {

           res.status(200).send(await this.userService.getAllUsers());
        }

    public getUser= async (req: Request, res: Response) => {
        console.log("params id: ", req.params.id)
 
            const user = await this.userService.getUserById(req.params.id);
            if (user) {
                res.status(200).send(user);
            } else {
                res.status(404).send('User not found');
            }
        }
    public createUser = async  (req: Request, res: Response) => {
            const user : UserCreateType = req.body;
            console.log("user in body", user)
            const newUser = await this.userService.createUser(user);
            res.status(201).json(newUser);
        }

          @Get("{userId}")
  public async get(
    @Path() userId: number,
    @Query() name?: string
  ): Promise<UserCreateType> {
    return new UserService().getAllUsers();
  } 

    getRouter(): Router {
        const router = Router();

        router.get('/', this.getUsers);

        router.get('/:id', this.getUser);

        router.post('/', this.createUser);

        return router;
    }
}

export default new UserController().getRouter()