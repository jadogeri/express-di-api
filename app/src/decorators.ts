// src/decorators.ts
import { Container } from 'typescript-ioc';

export function Service(target: any) {
    Container.bind(target).to(target);
}

export function Repository(target: any) {
    Container.bind(target).to(target);
}

export function Controller(prefix: string = '/') {
    return function(target: any) {
        Container.bind(target).to(target);
        Reflect.defineMetadata('controller:prefix', prefix, target);
    };
}