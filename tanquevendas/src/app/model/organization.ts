export class Organization {
  private _id: String;
  private _corporateName: String;
  private _linkForecast: String;
  private _linkRegister: String;
  private _linkSales: String;
  private _active: Boolean;
  private _firstActionName: String;
  private _firstActionLink: String;
  private _secondActionName: String;
  private _secondActionLink: String;

  constructor(
    id?: String,
    corporateName?: String,
    linkForecast?: String,
    linkRegister?: String,
    linkSales?: String,
    active?: Boolean,
    firstActionName?: String,
    firstActionLink?: String,
    secondActionName?: String,
    secondActionLink?: String
  ) {
    this._id = id;
    this._corporateName = corporateName;
    this._linkForecast = linkForecast;
    this._linkRegister = linkRegister;
    this._linkSales = linkSales;
    this._active = active;
    this._firstActionName = firstActionName;
    this._firstActionLink = firstActionLink;
    this._secondActionName = secondActionName;
    this._secondActionLink = secondActionLink;
  }

  get id(): String {
    return this._id;
  }

  set id(value: String) {
    this._id = value;
  }

  get corporateName(): String {
    return this._corporateName;
  }

  set corporateName(value: String) {
    this._corporateName = value;
  }

  get linkForecast(): String {
    return this._linkForecast;
  }

  set linkForecast(value: String) {
    this._linkForecast = value;
  }

  get linkRegister(): String {
    return this._linkRegister;
  }

  set linkRegister(value: String) {
    this._linkRegister = value;
  }

  get linkSales(): String {
    return this._linkSales;
  }

  set linkSales(value: String) {
    this._linkSales = value;
  }

  get active(): Boolean {
    return this._active;
  }

  set active(value: Boolean) {
    this._active = value;
  }

  get firstActionName(): String {
    return this._firstActionName;
  }

  set firstActionName(value: String) {
    this._firstActionName = value;
  }

  get firstActionLink(): String {
    return this._firstActionLink;
  }

  set firstActionLink(value: String) {
    this._firstActionLink = value;
  }

  get secondActionName(): String {
    return this._secondActionName;
  }

  set secondActionName(value: String) {
    this._secondActionName = value;
  }

  get secondActionLink(): String {
    return this._secondActionLink;
  }

  set secondActionLink(value: String) {
    this._secondActionLink = value;
  }
}
