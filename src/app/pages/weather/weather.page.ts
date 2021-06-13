import { Component, OnInit } from '@angular/core';
import { WeatherService } from '@services/weather.service';
import { LocationService } from '@services/location.service';
import { WeatherModel } from '@models/weather.model';
import * as moment from 'moment';
import { ForecastModel } from '@models/forecast.model';
import { forkJoin } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { environment as env } from '@env/environment';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.page.html',
  styleUrls: ['./weather.page.scss'],
})
export class WeatherPage implements OnInit {
  public futureDaysForecast: ForecastModel.Day[];
  public todaysWeather: WeatherModel.RootObject;
  public selectedCity;

  constructor(
    private router: Router,
    private dataRoute: ActivatedRoute,
    private locationService: LocationService,
    private weatherService: WeatherService
  ) {}

  ngOnInit() {
    this.chooseWeatherSource();
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

  public chooseWeatherSource(): void {
    const routeParams = this.dataRoute.snapshot.params;
    console.log(routeParams);
    if (routeParams.hasOwnProperty('cityWeather')) {
      this.selectedCity = JSON.parse(routeParams.cityWeather);
    } else {
      this.selectedCity = undefined;
    }

    if (this.selectedCity) {
      const position = {
        lat: this.selectedCity.coord.lat,
        lng: this.selectedCity.coord.lon,
      };
      this.getAllWetherInfo(position);
    } else {
      this.locationService.getPosition().then((position) => {
        this.getAllWetherInfo(position);
      });
    }
  }

  public toggleLocation(): void {
    // Clear route params to load current location weather
    this.router.navigate(['.']);
  }

  // Navigate to source page for more info
  public goToSourcePage(): void {
    window.open(env.sourcePageInfo + this.todaysWeather.id, '_blank');
  }
}
