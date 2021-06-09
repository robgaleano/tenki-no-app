/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { environment as env } from '@env/environment';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  constructor(private httpService: HttpService) { }

  public getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resp => {
        resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude });
      },
        err => {
          reject(err);
        });
    });
  }

  public getPlaceInfo(item): Observable<any> {
    const serviceParams = `place_id=${item.place_id}&key=${env.placesApiKey}`;
    return this.httpService.get(env.placesApiUrl, serviceParams);
  }

}
