import mongoose from "mongoose";
import { CreateUserRequestDao } from "../dao/request/CreateUserRequestDao.dao";
import { UpdateUserRequestDao } from "../dao/request/UpdateUserRequestDao.dao";

export abstract class IUserRepository {

    abstract findAll(): Promise<any | null>

    abstract findById(id: mongoose.Types.ObjectId): Promise<any | null>

    abstract create(user: CreateUserRequestDao): Promise<any | null>;

    abstract deleteById(id: mongoose.Types.ObjectId): Promise<any | null>

    abstract update(id: mongoose.Types.ObjectId, user: UpdateUserRequestDao) : Promise<any | null>;  

}