// src/service/UserService.ts
import { Autowired, Service } from '../decorators';
import { UserRepository } from '../repositories/UserRepository.repository';
import { IUserService } from '../interfaces/IUserService.interface';
import { IUser, UserModel } from '../models/UserModel.model';
import { CreateUserDto } from '../dto/request/CreateUserDto.dto';
import { Singleton } from 'typescript-ioc';
import { ErrorResponse } from '../entities/ErrorResponse.entity';
import { CreateUserRequestDao } from '../dao/request/CreateUserRequestDao.dao';
import mongoose from 'mongoose';
import { UpdateUserDto } from '../dto/request/UpdateUserDto.dto';


@Service
@Singleton
export class UserService implements IUserService{

    @Autowired 
    private userRepository!: UserRepository;

    async getAllUsers(): Promise<IUser[]> {

        return await this.userRepository.findAll();
    }

    async getUserById(id: mongoose.Types.ObjectId) {
        return await this.userRepository.findById(id);
    }

    async updateUser(id: mongoose.Types.ObjectId, user: UpdateUserDto): Promise<IUser | ErrorResponse> {
        const savedUser = await this.userRepository.findById(id);
        console.log("saved user, :", savedUser)
        if(!savedUser){
            return new ErrorResponse(400, "user with id " + id.toString() + " not found")
        }
        const users = await UserModel.find();
        console.log("users in database: ", users)
        let response : ErrorResponse | IUser | any= null;

        for(let i=0;i< users.length; i++){
            const registeredUser = users[i];
            if(registeredUser.username == user.username ||registeredUser.email == user.email ){
                const errorResponse =  new ErrorResponse(400,"username or email already taken");
                errorResponse.setUsername(registeredUser.username);
                errorResponse.setEmail(registeredUser.email)
                response =  errorResponse;
                break;
            }

        }
        user.email = !user.email? savedUser.email: user.email
        user.username = !user.username? savedUser.username: user.username;

        console.log("user to update ", user)
        response = await this.userRepository.update(id, user);
        return response;
    }

    async deleteUserById(id: mongoose.Types.ObjectId) {
        return await this.userRepository.deleteById(id);
    }

    async createUser(user: CreateUserDto): Promise<IUser | ErrorResponse> {
        console.log("user in body in service: ", user);
        const users = await UserModel.find();
        console.log("users in database mongo , ", users)
        let response : ErrorResponse | IUser | any= null;
        for(let i=0;i< users.length; i++){
            const registeredUser = users[i];
            if(registeredUser.username == user.username ||registeredUser.email == user.email ){
                const errorResponse =  new ErrorResponse(400,"username or email already taken");
                errorResponse.setUsername(registeredUser.username);
                errorResponse.setEmail(registeredUser.email)
                response =  errorResponse;
                break;
            }

        }
        if(!response){
            let createUserDao : CreateUserRequestDao = {...user}
            const createdUser =  await this.userRepository.create(createUserDao);
            console.log("created User", createdUser);
            return createdUser;

        }

        return response;

    }
}