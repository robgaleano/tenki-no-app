import { Component, EventEmitter, NgZone, OnInit, Output } from '@angular/core';
import { LocationService } from '@services/location.service';
import { PlaceInfoModel, PlaceModel } from '@models/place.model';
declare let google;

@Component({
  selector: 'app-weather-searchbar',
  templateUrl: './weather-searchbar.component.html',
  styleUrls: ['./weather-searchbar.component.scss'],
})
export class WeatherSearchbarComponent implements OnInit {
  @Output() locationSelected: EventEmitter<any> = new EventEmitter<any>();

  public autocomplete: { input: string };
  public autocompleteItems: any[];
  public googleAutocomplete: any;

  constructor(private zone: NgZone, private locationService: LocationService) {}

  ngOnInit() {
    this.googleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = { input: '' };
    this.autocompleteItems = [];
  }

  public updateSearchResults(): void {
    if (this.autocomplete.input === '') {
      this.autocompleteItems = [];
      return;
    }
    this.googleAutocomplete.getPlacePredictions(
      { input: this.autocomplete.input },
      (predictions) => {
        this.autocompleteItems = [];
        this.zone.run(() => {
          predictions.forEach((prediction) => {
            this.autocompleteItems.push(prediction);
          });
        });
      }
    );
  }

  public selectSearchResult(place: PlaceModel.RootObject): void {
    this.clearAutocomplete();

    this.locationService
      .getPlaceInfo(place)
      .subscribe((placeInfo: PlaceInfoModel.RootObject) => {
        const position = {
          lat: String(placeInfo.result.geometry.location.lat),
          lng: String(placeInfo.result.geometry.location.lng),
        };
        this.locationSelected.emit(position);
      });
  }

  public clearAutocomplete(): void {
    this.autocompleteItems = [];
    this.autocomplete.input = '';
  }
}
