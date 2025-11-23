import mongoose, { Types } from "mongoose";

// import { IUser } from "./IUser.interface";

export abstract class IUserRepository {


    abstract findAll(): Promise<any | null>

    abstract findById(id: string): Promise<any | null>

    abstract create(user: any): Promise<any | null>;

    // abstract deleteAll(): Promise<any | null>;

    // abstract deleteById(): Promise<any | null>;

    // abstract update() : Promise<any | null>;

    // abstract remove(): Promise<any | null>;
    

}