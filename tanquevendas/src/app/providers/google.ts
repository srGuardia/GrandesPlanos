import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable()
export class GoogleProvider {
  data: any = null;

  constructor(public http: HttpClient) {}

  load() {
    const url =
      "https://spreadsheets.google.com/feeds/list/" +
      environment.googleSheets.sheetIDDemo +
      "/od6/public/values?alt=json";

    return this.http.get(url).toPromise();
  }
}
