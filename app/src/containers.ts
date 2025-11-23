// inversify.config.ts
import { Container } from 'inversify';
import 'reflect-metadata'; // Essential for decorators

// Import your interfaces and concrete implementations
import { IUserService } from './interfaces/IUserService.interface';
import { UserService } from './services/UserService.service';
import { IUserRepository } from './interfaces/IUserRepository.interface';
import { UserRepository } from './repositories/UserRepository.repository';


const container = new Container();
container.bind(IUserService).to(UserService);

export { container };