# Ionic Tenki No App

* A simple `progressive web application` made with Ionic / Angular.
* This application gets the data through multiple open API's such as `Google Places, Maps & OpenWeather` but also leverages some work to web storage.
* It is developed using `Angular >=12.0.1` and `Ionic >=5.5.2` with PWA schematics so it can be deployed to mobile and web.
* It's main execution on local runs on  `Ionic CLI`.


## Installation

* First you'll need to install the NodeJS platform `https://nodejs.org/`, and then both Angular and Ionic CLI.
* Run `npm install -g @angular/cli` and `npm install -g @ionic/cli`.
* Then inside project root `npm i` or `npm i --legacy-peer-deps` to preserve dependencies from being updated.

## Code scaffolding

Run `ionic g component desired-path/component-name` then to generate a new component. You can also use `ionic g directive|pipe|service|class|guard|interface|enum|module` for any other type of file.


## Build

Run `ionic build` to build the project. The build artifacts will be stored in the `dist/` or `www` directory.


## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

Or for more help on the Ionic CLI use `ionic help` or go check out the [Ionic CLI README](https://github.com/ionic-team/ionic-cli/blob/develop/README.md).

## Running the example in local env inside your project

* `ionic serve` to execute a local dev server to run app. Navigate to `http://localhost:8100/`. The app will automatically reload if you change any of the source files.
* This app uses `json-server` module for enabling the url and filter funtionality.
