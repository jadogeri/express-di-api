
// app.ts
import 'reflect-metadata'; // Required for typescript-ioc
import express from 'express';
import bodyParser from "body-parser";
import { Container } from 'typescript-ioc';
import { UserController } from './controllers/UserController.controller';
import { configureIoC } from './configs/ioc.config';
import "../src/controllers/UserController.controller"

import dotenv from "dotenv";
import cors from "cors"

dotenv.config();


export const app = express();

app.use(express.json())
app.use(cors({ origin: "*", credentials: true }));
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static('public'));
app.use(bodyParser.json());



// Configure IoC container
configureIoC();

// Create an instance of the UserController using the IoC container

export const userController = Container.get(UserController); // Assuming UserController is bound
const prefix = Reflect.getMetadata('controller:prefix', userController.constructor);
if (prefix) {
    app.use(prefix, userController.getRouter());
}

