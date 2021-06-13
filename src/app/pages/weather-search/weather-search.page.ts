import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import * as moment from 'moment';
import { WeatherService } from '@services/weather.service';
import { StorageService } from '@services/storage.service';
import { WeatherModel } from '@models/weather.model';
import { ForecastModel } from '@models/forecast.model';
import { AlertService } from '@services/alert.service';
import { KeysResult } from '@capacitor/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-weather-search',
  templateUrl: './weather-search.page.html',
  styleUrls: ['./weather-search.page.scss'],
})
export class WeatherSearchPage implements OnInit {
  public futureDaysForecast: ForecastModel.Day[];
  public todaysWeather: WeatherModel.RootObject;
  public citiesWithWeather = [];

  constructor(
    private weatherService: WeatherService,
    private storageService: StorageService,
    private alertService: AlertService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadPlacesWithWeather();
  }

  public loadPlacesWithWeather(): void {
    // IN HERE WE ARE GOING TO LOAD TO THE WIEW EACH ITEM FROM STORAGE IF INTERNET CONNECTION FAILS
    // COULD BE CHANGED INTO A RESOLVER FOR LESS ACCESS TO STORAGE
    this.storageService.getAllStorageKeys().then((storage: KeysResult) => {
      if (storage.keys.length === 0) {
        this.citiesWithWeather = [];
      } else {
        this.gethWeatherObserversByPlaceKey(storage.keys);
      }
    });
  }

  public setCurrentWeather(city): void {
    this.router.navigate(['/weather', { cityWeather: JSON.stringify(city) }]);
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
        const weather = weatherObservers.currentWeather;
        const forecast = weatherObservers.weatherForecast;

        //THIS IS WHAT WE ARE GOING TO MANAGE ON WEATHER-SEARCH PAGE WHEN WE SEND THE OUTPUT
        this.mapWeatherInfo(weather, forecast).then(() => {
          this.storageService.getItem(weather.name).then((item) => {
            if (!item) {
              // If item not exists already
              const weatherItem = [weatherObservers];
              this.storageService.setItem(weather.name, [...weatherItem]);
              this.loadPlacesWithWeather();
            } else {
              const alertObj = {
                header: 'Duplicated entry',
                message: 'This place has already been added please add another',
                button: [
                  {
                    text: 'Confirm',
                  },
                ],
              };
              this.presentAlert(alertObj);
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

  public gethWeatherObserversByPlaceKey(storageKeys: string[]): void {
    // Call weather api for every key
    // If not available because of internet failure or bad response
    // fill it with the storage data and show a message
    // CREATE FORK JOIN OBSERVABLES FOR EACH KEY
    const placesCoord = [];
    storageKeys.forEach((key) => {
      placesCoord.push(this.storageService.getItem(key));
    });

    const weatherObservers = [];
    Promise.all(placesCoord).then((weatherInfo) => {
      weatherInfo.forEach((weatherItem) => {
        weatherObservers.push(
          this.weatherService.getWeather(
            weatherItem[0].currentWeather.coord.lat,
            weatherItem[0].currentWeather.coord.lon
          )
        );
      });

      forkJoin(weatherObservers).subscribe(
        (citiesWeather) => {
          this.citiesWithWeather = citiesWeather;
          this.citiesWithWeather.map((cityItem: any) => {
            cityItem.main.temp = Math.round(cityItem.main.temp);
            cityItem.main.temp_max = Math.round(cityItem.main.temp_max);
            cityItem.main.temp_min = Math.round(cityItem.main.temp_min);
          });
        },
        (error) => {
          // Load Weather from storage
        }
      );
    });
  }

  public deleteCityWeather(cityIndex): void {
    this.storageService
      .removeItem(this.citiesWithWeather[cityIndex].name)
      .then(() => {
        this.citiesWithWeather.splice(cityIndex, 1);
        this.loadPlacesWithWeather();
      });
  }

  public presentAlert(alertObj): void {
    this.alertService.presentAlert(
      alertObj.header,
      alertObj.message,
      alertObj.button
    );
  }
}
