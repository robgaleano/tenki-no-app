import { Component, OnInit } from '@angular/core';
import { WeatherService } from '@services/weather.service';
import { LocationService } from '@services/location.service';
import { WeatherModel } from '@models/weather.model';
import * as moment from 'moment';
import { ForecastModel } from '@models/forecast.model';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.page.html',
  styleUrls: ['./weather.page.scss'],
})
export class WeatherPage implements OnInit {
  public futureDaysForecast: ForecastModel.Day[];
  public todaysWeather: WeatherModel.RootObject;

  constructor(
    private locationService: LocationService,
    private weatherService: WeatherService
  ) {}

  ngOnInit() {
    this.locationService.getPosition().then((position) => {
      // Change this into a forkJoin or into an observable merge
      this.getAllWetherInfo(position);
      // this.weatherService.getWeather(position.lat, position.lng).subscribe(
      //   (weather: WeatherModel.RootObject) => {
      //     console.log(weather);
      //     this.todaysWeather = weather;
      //     this.todaysWeather.main.temp = Math.round(weather.main.temp);
      //     this.todaysWeather.main.temp_max = Math.round(weather.main.temp_max);
      //     this.todaysWeather.main.temp_min = Math.round(weather.main.temp_min);
      //   },
      //   (err) => {
      //     throw new Error(err);
      //   }
      // );

      // this.weatherService
      //   .getAllWeatherInfo(position.lat, position.lng)
      //   .subscribe(
      //     (forecast: ForecastModel.RootObject) => {
      //       forecast.daily.map((day: ForecastModel.Day) => {
      //         day.date = moment.unix(day.dt).format('ddd, MMM D');
      //         day.temp.max = Math.round(day.temp.max);
      //         day.temp.min = Math.round(day.temp.min);
      //       });
      //       this.futureDaysForecast = forecast.daily;
      //     },
      //     (err) => {
      //       throw new Error(err);
      //     }
      //   );
    });
  }

  public getAllWetherInfo(position): void {
    forkJoin({
      currentWeather: this.weatherService.getWeather(
        position.lat,
        position.lng
      ),
      weatherForecast: this.weatherService.getAllWeatherInfo(
        position.lat,
        position.lng
      ),
    }).subscribe(
      (weatherObservers) => {
        console.log(weatherObservers);
        const weather = weatherObservers.currentWeather;
        const forecast = weatherObservers.weatherForecast;

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
      },
      (err) => {
        throw new Error(err);
      }
    );
  }
}
