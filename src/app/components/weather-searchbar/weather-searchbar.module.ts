import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { WeatherSearchbarComponent } from './weather-searchbar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  declarations: [WeatherSearchbarComponent],
  exports: [WeatherSearchbarComponent]
})
export class WeatherSearchbarModule { }
