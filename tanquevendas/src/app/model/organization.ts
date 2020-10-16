export class Organization {
    private _id: String;
    private _corporateName: String;
    private _linkForecast: String;
    private _linkRegister: String;
    private _linkSales: String;

    constructor(id?: String, corporateName?: String, linkForecast?: String, linkRegister?: String, linkSales?: String) {
        this._id = id;
        this._corporateName = corporateName;
        this._linkForecast = linkForecast;
        this._linkRegister = linkRegister;
        this._linkSales = linkSales;
    }

    get id(): String {
        return this._id;
    }

    set id(value: String) {
        this._id = value
    }

    get corporateName(): String {
        return this._corporateName;
    }

    set corporateName(value: String) {
        this._corporateName = value
    }

    get linkForecast(): String {
        return this._linkForecast;
    }

    set linkForecast(value: String) {
        this._linkForecast = value
    }

    get linkRegister(): String {
        return this._linkRegister;
    }

    set linkRegister(value: String) {
        this._linkRegister = value
    }

    get linkSales(): String {
        return this._linkSales;
    }

    set linkSales(value: String) {
        this._linkSales = value
    }
}