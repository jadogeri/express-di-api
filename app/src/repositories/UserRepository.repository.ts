import mongoose from 'mongoose';
import { CreateUserRequestDao } from '../dao/request/CreateUserRequestDao.dao';
import { Repository } from '../decorators';
import { IUserRepository } from '../interfaces/IUserRepository.interface';
import { UserModel, IUser } from '../models/UserModel.model';
import { UpdateUserRequestDao } from '../dao/request/UpdateUserRequestDao.dao';

@Repository
export class UserRepository implements IUserRepository{

    deleteAll(): Promise<any | null> {
        throw new Error('Method not implemented.');
    }
    async deleteById(id: mongoose.Types.ObjectId) {
        const response =  await UserModel.findByIdAndDelete(id);
        return response;
    }
    async update(id: mongoose.Types.ObjectId, user: UpdateUserRequestDao): Promise<any> {
        console.log("data passed to update: ", user, id)
        await UserModel.updateOne({ _id: id },{$set: user}, {upsert: true});

        return await UserModel.findOne({_id: id});
    }
    remove(): Promise<any | null> {
        throw new Error('Method not implemented.');
    }

    async findAll() {

        return await UserModel.find();
    }

    async findById(id: mongoose.Types.ObjectId) {
        return  await UserModel.findById(id);
    }

    async  create(user: CreateUserRequestDao)  {
        const unCreatedUser : IUser = {...user}
        const createdUdser = await UserModel.create(unCreatedUser);
        console.log("all users in list ", createdUdser)
        return createdUdser;
    }
}