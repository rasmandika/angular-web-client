import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

export class UserModel {
  username: string;
  password: string;
}

const API_URL: string = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  getHTTPHeaders(): HttpHeaders {
    const result = new HttpHeaders();

    result.set('Content-Type', 'application/json;charset=UTF-8')
    .set('Accept', 'application/json;charset=UTF-8')
    // .set('Access-Control-Allow-Methods', 'GET, POST')
    .set('Access-Control-Allow-Origin', '*')
    .set('Access-Control-Allow-Credentials', 'false')
    // .set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Accept-Encoding, Authorization, X-Requested-With');
		return result;
  }

  login(data: UserModel) {
    const httpHeaders = this.getHTTPHeaders();
    // const url = API_URL + '/login?username=' + data.username + '&password=' + data.password + '&output=json';
		return this.http.get(API_URL + '/login?username=' + data.username + '&password=' + data.password, {
      headers: httpHeaders,
      withCredentials: false
    });
		// return this.http.jsonp(url, 'callback');
  }

  operator() {
    const httpHeaders = this.getHTTPHeaders();
		return this.http.get(API_URL + '/operator', { headers: httpHeaders, withCredentials: false });
  }

  voucher(data: any) {
    const httpHeaders = this.getHTTPHeaders();
		return this.http.get(API_URL + '/voucher?operator=' + data, { headers: httpHeaders, withCredentials: false });
  }

  transaction(data: any) {
    const httpHeaders = this.getHTTPHeaders();
    return this.http.get(API_URL + '/transaction?userid=' +data.userid+ '&voucher=' + data.harga, { headers: httpHeaders, withCredentials: false });
  }
}
