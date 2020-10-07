import { Injectable } from '@angular/core';

@Injectable()
export class ObjectFactory {
    constructor() { }

    public serialize(object: any): any {
        return Object.assign({}, object);
    }

    public deserialize(object: any, type: Object): any {
        return Object.assign(type, object);
    }
}