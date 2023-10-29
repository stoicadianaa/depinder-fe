import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

const BASE_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class AnalysisService {
  model = 'analyse'
  constructor(private http: HttpClient) {}

  analyse(path: string) {
    return this.http.post(this.getUrl(), {
      "folders" : [path]
    }, { observe: 'response' });
  }

  getUrl() {
    return `${BASE_URL}/${this.model}`;
  }
}
