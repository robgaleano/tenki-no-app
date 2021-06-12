import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-weather-search',
  templateUrl: './weather-search.page.html',
  styleUrls: ['./weather-search.page.scss'],
})
export class WeatherSearchPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }


  public setCurrentWeather(): void {
    // IN HERE WE ARE GOING TO LOAD TO THE WIEW EACH ITEM FROM STORAGE IF INTERNET CONNECTION FAILS
  }
}
