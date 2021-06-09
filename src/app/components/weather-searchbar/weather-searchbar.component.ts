import { Component, NgZone, OnInit } from '@angular/core';
import { LocationService } from '@services/location.service';
import { WeatherService } from '@services/weather.service';
import { PlaceInfoModel, PlaceModel } from '@models/place.model';
import { WeatherModel } from '@models/weather.model';
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

  constructor(private zone: NgZone,
    private weatherService: WeatherService,
    private locationService: LocationService) {
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
  selectSearchResult(place: PlaceModel.RootObject) {
    ///WE CAN CONFIGURE MORE COMPLEX FUNCTIONS SUCH AS UPLOAD DATA TO FIRESTORE OR LINK IT TO SOMETHING
    this.clearAutocomplete();

    this.locationService.getPlaceInfo(place).subscribe((placeInfo: PlaceInfoModel.RootObject) => {
      const lat = String(placeInfo.result.geometry.location.lat);
      const lng = String(placeInfo.result.geometry.location.lng);
      this.weatherService.getWeather(lat, lng).subscribe((weather: WeatherModel.RootObject) => {
        console.log(weather);
      }, err => {
        throw new Error(err);
      });
    });
  }

  //lET'S BE CLEAN! THIS WILL JUST CLEAN THE LIST WHEN WE CLOSE THE SEARCH BAR.
  clearAutocomplete(): void {
    this.autocompleteItems = [];
    this.autocomplete.input = '';
  }

}
