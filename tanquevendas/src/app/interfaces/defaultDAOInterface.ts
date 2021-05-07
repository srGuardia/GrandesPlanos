import { Observable } from 'rxjs';

export interface Query {
    attribute: string;
    operator: '<' | '<=' | '==' | '>=' | '>' | 'array-contains';
    value: any;
}

export abstract class DefaultDAOInterface {

    abstract findByReference(target: string, reference: any): Observable<any>;
    abstract removeByReference(target: string, reference: any): Promise<void>;
    abstract addNew(target: string, object: any): Promise<void>;
    abstract updateByReference(target: string, reference: any, object: any): Promise<void>;
    abstract listAll(target: string, limit?: number): Promise<any>;
    abstract listAllByAttribute(target: string, query: Query, limit?: number): Promise<any>;
    abstract listAllByAttributes(target: string, query: Query[], limit?: number): Promise<any>;
}
