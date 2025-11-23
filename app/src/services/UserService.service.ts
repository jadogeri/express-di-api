// src/service/UserService.ts
import { Inject,  } from 'typescript-ioc';
import { Service } from '../decorators';
import { UserRepository } from '../repositories/UserRepository.repository';
import { IUserService } from '../interfaces/IUserService.interface';


@Service
export class UserService implements IUserService{
    @Inject private userRepository!: UserRepository;

    async getAllUsers(): Promise<any> {

        return await this.userRepository.findAll();
    }

    async getUserById(id: string) {
        return await this.userRepository.findById(id);
    }

    async createUser(user: any) {
        return await this.userRepository.create(user);
    }
}