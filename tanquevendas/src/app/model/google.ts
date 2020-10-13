export class GoogleUser {
  private _vendedor: String;
  private _nome: String;
  private _email: String;
  private _url: String;

  constructor(vendedor?: String, nome?: String, email?: String, url?: String) {
    this._vendedor = vendedor;
    this._nome = nome;
    this._email = email;
    this._url = url;
  }

  get vendedor(): String {
    return this._vendedor;
  }

  set vendedor(value: String) {
    this._vendedor = value;
  }

  get nome(): String {
    return this._nome;
  }

  set nome(value: String) {
    this._nome = value;
  }

  get email(): String {
    return this._email;
  }

  set email(value: String) {
    this._email = value;
  }

  get url(): String {
    return this._url;
  }

  set url(value: String) {
    this._url = value;
  }
}
