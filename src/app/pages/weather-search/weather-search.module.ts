import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { WeatherSearchPageRoutingModule } from './weather-search-routing.module';
import { WeatherSearchPage } from './weather-search.page';
import { WeatherSearchbarModule } from '@components/weather-searchbar/weather-searchbar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WeatherSearchbarModule,
    WeatherSearchPageRoutingModule
  ],
  declarations: [WeatherSearchPage]
})
export class WeatherSearchPageModule { }
