import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class GoogleProvider {
  data: any = null;

  constructor(public http: HttpClient) {}

  getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();

    headers.append("Access-Control-Allow-Origin", "*");
    headers.append("Access-Control-Allow-Headers", "Content-Type");

    return headers;
  }

  load(idSheet: string) {
    const url =
      "https://spreadsheets.google.com/feeds/list/" +
      idSheet +
      "/od6/public/values?alt=json";

    return this.http.get(url, { headers: this.getHeaders() }).toPromise();
  }
}
