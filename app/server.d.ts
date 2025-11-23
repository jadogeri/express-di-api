import {CreateUserDto} from "./src/dto/request/CreateUserDto.dto";
import {UpdateUserDto} from "./src/dto/request/UpdateUserDto.dto"
;

declare global {
    namespace Express {
      interface Request {
            body: CreateUserDto | UpdateUserDto
        params: {
            id: string
        }
      }

    }
  }

  export {}

