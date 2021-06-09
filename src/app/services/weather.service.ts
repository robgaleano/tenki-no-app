
/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { environment as env } from '@env/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  constructor(private httpService: HttpService) { }

  getWeather(lat: string, lng: string): Observable<any> {
    const latLon = `lat=${lat}&lon=${lng}`;
    const weaterParams = latLon.concat(`&appid=${env.weatherApiKey}`).concat(`&units=${env.wheaterUnits}`);

    return this.httpService.get(env.weatherApiUrl, weaterParams);
  }
}

