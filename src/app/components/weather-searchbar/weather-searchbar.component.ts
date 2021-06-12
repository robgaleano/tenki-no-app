import { Component, NgZone, OnInit } from '@angular/core';
import { LocationService } from '@services/location.service';
import { WeatherService } from '@services/weather.service';
import { PlaceInfoModel, PlaceModel } from '@models/place.model';
import { WeatherModel } from '@models/weather.model';
import { forkJoin } from 'rxjs';
import { ForecastModel } from '@app/models/forecast.model';
import * as moment from 'moment';
import { StorageService } from '@app/services/storage.service';
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

  public futureDaysForecast: ForecastModel.Day[];
  public todaysWeather: WeatherModel.RootObject;

  constructor(
    private zone: NgZone,
    private weatherService: WeatherService,
    private locationService: LocationService,
    private storageService: StorageService
  ) {}

  ngOnInit() {
    this.googleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = { input: '' };
    this.autocompleteItems = [];

    //MAKE AN OUTPUT EVENT TO CATCH IT ON WEATHER SEARCH AND SET A NEW WEATHER ITEM ON THE LIST
  }

  //AUTOCOMPLETE, SIMPLY LOAD THE PLACE USING GOOGLE PREDICTIONS AND RETURNING THE ARRAY.
  public updateSearchResults(): void {
    if (this.autocomplete.input === '') {
      this.autocompleteItems = [];
      return;
    }
    this.googleAutocomplete.getPlacePredictions(
      { input: this.autocomplete.input },
      (predictions, status) => {
        this.autocompleteItems = [];
        this.zone.run(() => {
          predictions.forEach((prediction) => {
            this.autocompleteItems.push(prediction);
          });
        });
      }
    );
  }

  //wE CALL THIS FROM EACH ITEM.
  public selectSearchResult(place: PlaceModel.RootObject): void {
    ///WE CAN CONFIGURE MORE COMPLEX FUNCTIONS SUCH AS UPLOAD DATA TO FIRESTORE OR LINK IT TO SOMETHING
    this.clearAutocomplete();

    this.locationService
      .getPlaceInfo(place)
      .subscribe((placeInfo: PlaceInfoModel.RootObject) => {
        const position = {
          lat: String(placeInfo.result.geometry.location.lat),
          lng: String(placeInfo.result.geometry.location.lng),
        };
        this.getAllWeatherInfo(position);
      });
  }

  //lET'S BE CLEAN! THIS WILL JUST CLEAN THE LIST WHEN WE CLOSE THE SEARCH BAR.
  public clearAutocomplete(): void {
    this.autocompleteItems = [];
    this.autocomplete.input = '';
  }

  public getAllWeatherInfo(position): void {
    const weatherInfo = forkJoin({
      currentWeather: this.weatherService.getWeather(
        position.lat,
        position.lng
      ),
      weatherForecast: this.weatherService.getAllWeatherInfo(
        position.lat,
        position.lng
      ),
    });

    weatherInfo.subscribe(
      (weatherObservers) => {
        console.log(weatherObservers);
        const weather = weatherObservers.currentWeather;
        const forecast = weatherObservers.weatherForecast;

        //THIS IS WHAT WE ARE GOING TO MANAGE ON WEATHER-SEARCH PAGE WHEN WE SEND THE OUTPUT
        this.mapWeatherInfo(weather, forecast).then(() => {
          this.storageService.getItem(weather.name).then((item) => {
            if (!item) {
              // If item not exists already
              const weatherItem = [weatherObservers];
              this.storageService.setItem(weather.name, [...weatherItem]);
            }
          });
        });
      },
      (err) => {
        throw new Error(err);
      }
    );
  }

  public mapWeatherInfo(
    weather: WeatherModel.RootObject,
    forecast: ForecastModel.RootObject
  ): Promise<void> {
    return new Promise((resolve) => {
      this.todaysWeather = weather;
      this.todaysWeather.main.temp = Math.round(weather.main.temp);
      this.todaysWeather.main.temp_max = Math.round(weather.main.temp_max);
      this.todaysWeather.main.temp_min = Math.round(weather.main.temp_min);

      forecast.daily.map((day: ForecastModel.Day) => {
        day.date = moment.unix(day.dt).format('ddd, MMM D');
        day.temp.max = Math.round(day.temp.max);
        day.temp.min = Math.round(day.temp.min);
      });
      this.futureDaysForecast = forecast.daily;

      resolve();
    });
  }
}
