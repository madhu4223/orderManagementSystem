import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataService {

  apiurl: string = environment.apiurl;

  adv_credits_balance :Number ;

  constructor(public http: HttpClient) {
    console.log('data service conntected');
  }

  get(url) {
    return this.http.get(this.apiurl + url)
  }
  post(url, body) {
    return this.http.post(this.apiurl + url, body)
  }

}
