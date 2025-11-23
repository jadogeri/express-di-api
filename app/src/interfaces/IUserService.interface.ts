

export  abstract class  IUserService {

      abstract createUser(user: any) : Promise<any>;
    
      abstract getUserById(id: string) : Promise<any>;

      abstract getAllUsers() : Promise<any>;
 

}

// Define and export a unique token for the service
//export const IUserServiceToken = "IUserServic";

