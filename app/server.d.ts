import {UserCreateType} from "./src/dto/UserCreateType.type"
declare global {
    namespace Express {
      interface Request {
            body: UserCreateType;
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

