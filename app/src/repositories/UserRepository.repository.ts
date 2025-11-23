import { Repository } from '../decorators';
import { IUserRepository } from '../interfaces/IUserRepository.interface';

@Repository
export class UserRepository implements IUserRepository{

    private users: any[] = [];

    // deleteAll(): Promise<any | null> {
    //     throw new Error('Method not implemented.');
    // }
    // deleteById(): Promise<any | null> {
    //     throw new Error('Method not implemented.');
    // }
    // update(): Promise<any | null> {
    //     throw new Error('Method not implemented.');
    // }
    // remove(): Promise<any | null> {
    //     throw new Error('Method not implemented.');
    // }

    async findAll() {
        return this.users;
    }

    findById(id: string) {
        return  this.users.find(user => user.id == id);
    }

    async  create(user: any) {
        this.users.push(user);
        console.log("all users in list ", this.users)
        return user;
    }
}