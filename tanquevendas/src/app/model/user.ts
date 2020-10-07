import { Organization } from './organization';

export class User {
    private _id: String;
    private _name: String;
    private _email: String;
    private _password: String;
    private _organization: Organization;

    constructor(id?: String, name?: String, email?: String, password?: String, organization?: Organization) {
        this._id = id;
        this._name = name;
        this._email = email;
        this._password = password;
        this._organization = organization;
    }

    get id(): String {
        return this._id;
    }

    set id(value: String) {
        this._id = value;
    }

    get name(): String {
        return this._name;
    }

    set name(value: String) {
        this._name = value;
    }

    get email(): String {
        return this._email;
    }

    set email(value: String) {
        this._email = value;
    }

    get password(): String {
        return this._password;
    }

    set password(value: String) {
        this._password = value;
    }

    get organization(): Organization {
        return this._organization;
    }

    set organization(value: Organization) {
        this._organization = value;
    }
}