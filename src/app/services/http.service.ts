/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  public get(apiUrl: string, serviceParams: string) {
    const url = apiUrl.concat(serviceParams);
    return this.http.get(url);
  }
}
