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
    namespace NodeJS {
      interface ProcessEnv {
        EXPRESS_APP_PORT: number;
        EXPRESS_APP_HOST:string;
        EXPRESS_APP_PROTOCOL:string;
        EXPRESS_APP_URL:string
      }
    }
  }

  export {}

