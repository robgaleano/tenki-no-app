import { Component, OnInit } from '@angular/core';
import { HttpService } from '@services/http.service';
import { environment as env } from '@env/environment';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public appPages = [
    { title: 'Weather', url: '/weather', icon: 'partly-sunny' },
    { title: 'Search', url: '/weather-search', icon: 'search' },
    // { title: 'Settings', url: '/settings', icon: 'settings-outline' }
  ];
  constructor(private httpService: HttpService) { }

  ngOnInit() {
    const queryParams = 'q=madrid'.concat(`&appid=${env.weatherApiKey}`).concat(`&units=${env.wheaterUnits}`);
    this.httpService.get(env.weatherApiUrl, queryParams).subscribe(resp => {
      console.log(resp);
    });
  }
}
