// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  weatherApiUrl: 'https://api.openweathermap.org/data/2.5/weather?',
  weatherAllApiUrl: 'http://api.openweathermap.org/data/2.5/onecall?',
  weatherApiKey: '04e058dad67e4ba5f8e8574742372274',
  weatherUnits: 'metric',
  placesApiUrl: 'https://maps.googleapis.com/maps/api/place/details/json?',
  placesApiKey: 'AIzaSyBkggCRhP7oys82ezMwakBIW0AHthsvDZQ',
  sourcePageInfo: 'https://openweathermap.org/city/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
