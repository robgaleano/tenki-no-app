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
    { title: 'Inbox', url: '/folder/Inbox', icon: 'mail' },
    { title: 'Outbox', url: '/folder/Outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ];
  constructor(private httpService: HttpService) { }

  ngOnInit() {
    const queryParams = 'q=madrid'.concat(`&appid=${env.weatherApiKey}`).concat(`&units=${env.wheaterUnits}`);
    this.httpService.get(env.weatherApiUrl, queryParams).subscribe(resp => {
      console.log(resp);
    });
  }
}
