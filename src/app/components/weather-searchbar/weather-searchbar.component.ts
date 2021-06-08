import { Component, NgZone, OnInit } from '@angular/core';
import { HttpService } from '@services/http.service';
import { environment as env } from '@env/environment';
declare let google;

@Component({
  selector: 'app-weather-searchbar',
  templateUrl: './weather-searchbar.component.html',
  styleUrls: ['./weather-searchbar.component.scss'],
})
export class WeatherSearchbarComponent implements OnInit {

  public autocomplete: { input: string };
  public autocompleteItems: any[];
  public googleAutocomplete: any;

  constructor(private zone: NgZone, private httpService: HttpService) {
  }

  ngOnInit() {
    this.googleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = { input: '' };
    this.autocompleteItems = [];
  }

  //AUTOCOMPLETE, SIMPLY LOAD THE PLACE USING GOOGLE PREDICTIONS AND RETURNING THE ARRAY.
  public updateSearchResults(): void {
    if (this.autocomplete.input === '') {
      this.autocompleteItems = [];
      return;
    }
    this.googleAutocomplete.getPlacePredictions({ input: this.autocomplete.input },
      (predictions, status) => {
        this.autocompleteItems = [];
        this.zone.run(() => {
          predictions.forEach((prediction) => {
            this.autocompleteItems.push(prediction);
          });
        });
      });
  }

  //wE CALL THIS FROM EACH ITEM.
  selectSearchResult(item) {
    ///WE CAN CONFIGURE MORE COMPLEX FUNCTIONS SUCH AS UPLOAD DATA TO FIRESTORE OR LINK IT TO SOMETHING
    this.clearAutocomplete();
    console.log(item);
    const serviceParams = `place_id=${item.place_id}&key=${env.placesApiKey}`;
    this.httpService.get(env.placesApiUrl, serviceParams).subscribe((resp: any) => {
      console.log(resp);
      const latLon = `lat=${resp.result.geometry.location.lat}&lon=${resp.result.geometry.location.lng}`;
      const weaterParams = latLon.concat(`&appid=${env.weatherApiKey}`).concat(`&units=${env.wheaterUnits}`);
      this.httpService.get(env.weatherApiUrl, weaterParams).subscribe(weather => {
        console.log(weather);
      });
    });
  }

  //lET'S BE CLEAN! THIS WILL JUST CLEAN THE LIST WHEN WE CLOSE THE SEARCH BAR.
  clearAutocomplete(): void {
    this.autocompleteItems = [];
    this.autocomplete.input = '';
  }

}
