
// app.ts
import 'reflect-metadata'; // Required for typescript-ioc
import express from 'express';
import * as bodyParser from "body-parser";
import { Container } from 'typescript-ioc';
import { UserController } from './controllers/UserController.controller';
import { configureIoC } from './configs/ioc.config';
import dotenv from "dotenv";
import cors from "cors"
import { MongoDatabaseService } from './services/MongoDatabase.service';
import { errorHandler } from './middlewares/errorHandler.middleware';


const dbService = Container.get(MongoDatabaseService);
dbService.connect(); 

dotenv.config();

export const app = express();

app.use(express.json())

// Configure IoC container
configureIoC();

export const userController = Container.get(UserController); // Assuming UserController is bound
const prefix = Reflect.getMetadata('controller:prefix', userController.constructor);
if (prefix) {
    app.use(prefix, userController.getRouter());
}
app.use(cors({ origin: "*", credentials: true }));
app.use(bodyParser.json());
app.use(errorHandler)

