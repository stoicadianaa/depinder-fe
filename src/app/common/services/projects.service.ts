import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

const BASE_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  //TODO change model to project
  model = 'analyse'
  constructor(private http: HttpClient) {}

  all() {
    return this.http.get(`${this.getUrl()}/all`, { observe: 'response' });
  }

  find(id: string) {
    return this.http.get(this.getUrlWithID(id));
  }

  getUrl() {
    return `${BASE_URL}/${this.model}`;
  }

  getUrlWithID(id: string) {
    return `${this.getUrl()}/${id}`;
  }

  analyse(path: string) {
    return this.http.post(this.getUrl(), {
      "folders" : [path]
    }, { observe: 'response' });
  }
}
