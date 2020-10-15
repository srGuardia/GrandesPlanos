import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class GoogleProvider {
  data: any = null;

  constructor(public http: HttpClient) {}

  load(idSheet: string) {
    const url =
      "https://spreadsheets.google.com/feeds/list/" +
      idSheet +
      "/od6/public/values?alt=json";

    return this.http.get(url).toPromise();
  }
}
