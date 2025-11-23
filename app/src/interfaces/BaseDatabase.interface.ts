export abstract class BaseDatabase {

    abstract connect() : Promise<void>;
    
    abstract disconnect() : Promise<void>;

}