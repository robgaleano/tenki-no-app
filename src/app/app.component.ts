import { Component, OnInit } from '@angular/core';
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
  constructor() { }

  ngOnInit() { }
}
