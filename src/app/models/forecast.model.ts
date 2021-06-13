/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-namespace */
export declare namespace ForecastModel {

  export interface Weather {
    id: number;
    main: string;
    description: string;
    icon: string;
  }

  export interface Current {
    dt: number;
    sunrise: number;
    sunset: number;
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    dew_point: number;
    uvi: number;
    clouds: number;
    visibility: number;
    wind_speed: number;
    wind_deg: number;
    weather: Weather[];
  }

  export interface Minutely {
    dt: number;
    precipitation: number;
  }

  export interface Weather2 {
    id: number;
    main: string;
    description: string;
    icon: string;
  }

  export interface Rain {
    '1h': number;
  }

  export interface Hourly {
    dt: number;
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    dew_point: number;
    uvi: number;
    clouds: number;
    visibility: number;
    wind_speed: number;
    wind_deg: number;
    wind_gust: number;
    weather: Weather2[];
    pop: number;
    rain: Rain;
  }

  export interface Temp {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
  }

  export interface FeelsLike {
    day: number;
    night: number;
    eve: number;
    morn: number;
  }

  export interface Weather3 {
    id: number;
    main: string;
    description: string;
    icon: string;
  }

  export interface Day {
    date?: string;
    dt: number;
    sunrise: number;
    sunset: number;
    moonrise: number;
    moonset: number;
    moon_phase: number;
    temp: Temp;
    feels_like: FeelsLike;
    pressure: number;
    humidity: number;
    dew_point: number;
    wind_speed: number;
    wind_deg: number;
    wind_gust: number;
    weather: Weather3[];
    clouds: number;
    pop: number;
    uvi: number;
    rain?: number;
  }

  export interface RootObject {
    lat: number;
    lon: number;
    timezone: string;
    timezone_offset: number;
    current: Current;
    minutely: Minutely[];
    hourly: Hourly[];
    daily: Day[];
  }

}
