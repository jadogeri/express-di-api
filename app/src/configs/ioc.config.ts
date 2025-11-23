// ioc.config.ts
import { Container } from 'typescript-ioc';
import { IUserService } from '../interfaces/IUserService.interface';
import { UserService } from '../services/UserService.service';

export function configureIoC() {
  Container.bind(IUserService).to(UserService);
}