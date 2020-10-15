export class Sheet {
  private _nameSheet: String;
  private _description: String;
  private _id: String;
  private _colorSheet: String;
  private _refSheet: String;

  constructor(
    nameSheet?: String,
    description?: String,
    id?: String,
    colorSheet?: String,
    refSheet?: String
  ) {
    this._nameSheet = nameSheet;
    this._description = description;
    this._id = id;
    this._colorSheet = colorSheet;
    this._refSheet = refSheet;
  }

  get nameSheet(): String {
    return this._nameSheet;
  }

  set nameSheet(value: String) {
    this._nameSheet = value;
  }

  get description(): String {
    return this._description;
  }

  set description(value: String) {
    this._description = value;
  }

  get id(): String {
    return this._id;
  }

  set id(value: String) {
    this._id = value;
  }

  get colorSheet(): String {
    return this._colorSheet;
  }

  set colorSheet(value: String) {
    this._colorSheet = value;
  }

  get refSheet(): String {
    return this._refSheet;
  }

  set refSheet(value: String) {
    this._refSheet = value;
  }
}
