import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";

const BASE_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class LibrariesService {
  model = 'library'
  constructor(private http: HttpClient) {}

  all() {
    return this.http.get(`${this.getUrl()}/all`);
  }

  find(id: string) {
    return this.http.post(this.getUrl(), {'id': id}).pipe(
      map(response => (<any>response).data)
    );
  }

  getUrl() {
    return `${BASE_URL}/${this.model}`;
  }

  getUrlWithID(id: string) {
    return `${this.getUrl()}/${id}`;
  }
}
