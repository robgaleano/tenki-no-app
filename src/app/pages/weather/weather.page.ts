import { Component, OnInit } from '@angular/core';
import { WeatherService } from '@services/weather.service';
import { LocationService } from '@services/location.service';
import { WeatherModel } from '@models/weather.model';
import * as moment from 'moment';
import { ForecastModel } from '@models/forecast.model';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.page.html',
  styleUrls: ['./weather.page.scss'],
})
export class WeatherPage implements OnInit {
  public dailyForecast: ForecastModel.Day[];
  public todaysWeather: ForecastModel.Day;

  constructor(
    private locationService: LocationService,
    private weatherService: WeatherService) {

  }

  ngOnInit() {
    this.locationService.getPosition().then(position => {
      this.weatherService.getAllWeatherInfo(position.lat, position.lng).subscribe((forecast: ForecastModel.RootObject) => {

        this.todaysWeather = forecast.daily[0];
        forecast.daily.shift();

        let currentDate: string = moment().format('DD-MM-YYYY');
        forecast.daily.map((day: ForecastModel.Day) => {
          day.date = moment(currentDate).format('ddd');
          currentDate = moment(currentDate, 'DD-MM-YYYY').add(1, 'days').format('DD-MM-YYYY');
        });
        this.dailyForecast = forecast.daily;
        console.log(this.dailyForecast);
        // const weekArray = [];
        // console.log(currentDate);
        // forecast..forEach((weather: Forecast.List) => {
        //   console.log(moment(weather.dt_txt).format('DD-MM-YYYY'));
        //   if (currentDate === moment(weather.dt_txt).format('DD-MM-YYYY')) {
        //     weekArray.push(weather);
        //     console.log(moment(currentDate, 'DD-MM-YYYY').add(1, 'days').format('DD-MM-YYYY'));
        //     currentDate = moment(currentDate, 'DD-MM-YYYY').add(1, 'days').format('DD-MM-YYYY');
        //   };
        // });
        // console.log(weekArray);
        // this.getWeatherAllInfo(weather);
      }, err => {
        throw new Error(err);
      });
    });
  }

  public getWeatherAllInfo(weather: WeatherModel.RootObject) {
    const weatherId = weather.id.toString();
    console.log(weatherId);
    // this.weatherService.getAllWeatherInfo(weatherId).subscribe((resp: any) => {
    //   console.log(resp);
    // });
  }

}
