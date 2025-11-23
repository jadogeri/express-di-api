import mongoose from "mongoose";
import { CreateUserDto } from "../dto/request/CreateUserDto.dto";
import { IUser } from "../models/UserModel.model";
import { UpdateUserDto } from "../dto/request/UpdateUserDto.dto";


export  abstract class  IUserService {

      abstract createUser(user: CreateUserDto) : Promise<any>;
    
      abstract getUserById(id: mongoose.Types.ObjectId) : Promise<any>;

      abstract getAllUsers() : Promise<IUser[]>;

      abstract deleteUserById(id: mongoose.Types.ObjectId) : Promise<any>; 

      abstract updateUser(id: mongoose.Types.ObjectId, updateUser: UpdateUserDto) : Promise<any>; 


}
