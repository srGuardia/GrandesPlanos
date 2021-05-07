import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
import { DefaultDAOInterface, Query } from '../app/interfaces/defaultDAOInterface';

@Injectable()
export class DefaultDAO extends DefaultDAOInterface {

    constructor(private firestore: AngularFirestore) {
        super();
    }

    createNewId(): string {
        return this.firestore.createId();
    }

    addNew(target: string, object: any): Promise<void> {
        if (!object._id) {
            object._id = this.createNewId();
        }
        return this.firestore.doc<any>(target + '/' + object._id).set(Object.assign({}, object));
    }

    findByReference(target: string, reference: string): Observable<firebase.firestore.DocumentSnapshot> {
        return this.firestore.doc<any>(target + '/' + reference).get();
    }

    removeByReference(target: string, reference: any): Promise<void> {
        return this.firestore.doc<any>(target + '/' + reference).delete();
    }

    updateByReference(target: string, reference: any, object: any): Promise<void> {
        if (reference == null) {
            return this.addNew(target, object);
        }
        return this.firestore.doc<any>(target + '/' + reference).ref.update(Object.assign({}, object));
    }

    setByReference(target: string, reference: any, object: any): Promise<void> {
        if (reference == null) {
            return this.addNew(target, object);
        }
        return this.firestore.doc<any>(target + '/' + reference).ref.set(Object.assign({}, object));
    }

    listAll(target: string, limit?: Number): Promise<firebase.firestore.QuerySnapshot> {
        return this.firestore.collection(target).ref.get();
    }

    listAllByAttribute(target: string, query: Query, limit?: number): Promise<firebase.firestore.QuerySnapshot> {
        let value = query.value;
        if (toString.call(value) === '[object String]') {
            value = value.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        }
        if (limit != undefined && limit >= 1) {
            return this.firestore.collection(target).ref.where(query.attribute, query.operator, value).limit(limit).get();
        } else {
            return this.firestore.collection(target).ref.where(query.attribute, query.operator, value).get();
        }
    }

    listAllByAttributes(target: string, queries: Query[]): Promise<firebase.firestore.QuerySnapshot> {
        let collection = this.firestore.collection(target).ref.where(queries[0].attribute, queries[0].operator, queries[0].value.normalize('NFD').replace(/[\u0300-\u036f]/g, ''));
        for (let query of queries) {
            collection = collection.where(query.attribute, query.operator, query.value.normalize('NFD').replace(/[\u0300-\u036f]/g, ''));
        }
        return collection.get();
    }
}
