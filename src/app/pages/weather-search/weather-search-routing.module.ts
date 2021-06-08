import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WeatherSearchPage } from './weather-search.page';

const routes: Routes = [
  {
    path: '',
    component: WeatherSearchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WeatherSearchPageRoutingModule {}
