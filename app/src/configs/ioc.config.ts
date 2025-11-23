// ioc.config.ts
import { Container } from 'typescript-ioc';
import { IUserService } from '../interfaces/IUserService.interface';
import { UserService } from '../services/UserService.service';
import { IUserRepository } from '../interfaces/IUserRepository.interface';
import { UserRepository } from '../repositories/UserRepository.repository';
import { BaseDatabase } from '../interfaces/BaseDatabase.interface';
import { MongoDatabaseService } from '../services/MongoDatabase.service';

export function configureIoC() {
  Container.bind(IUserService).to(UserService);
  Container.bind(IUserRepository).to(UserRepository)
  Container.bind(BaseDatabase).to(MongoDatabaseService)
}

