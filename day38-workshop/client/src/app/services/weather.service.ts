import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom, map, take } from "rxjs";
import { Weather } from "../models";

@Injectable()
export class WeatherService{
  private endpoint : string = "https://api.openweathermap.org/data/2.5/weather"
  private OPEN_WEATHER_API_KEY : string = "b98ec5b91ad6b21c73137d01a1bce445"

  constructor(private http: HttpClient){

  }

  search(city: string) : Promise<Weather> {
    const params = new HttpParams()
    .set("q", city)
    .set("appid", this.OPEN_WEATHER_API_KEY);

    return firstValueFrom<Weather>(
      this.http.get<any>(this.endpoint,{params})
      .pipe(
        take(1),
        map(v => {
          return {
            country: v.sys.country,
            description:  v.weather[0].description,
            temp: v.main.temp,
            humidity: v.main.humidity,
            windSpeed: v.wind.speed,
            windDegree: v.wind.deg
          } as Weather
        })
      )
    )
  }

  // {
  //   "coord": {
  //   "lon": -0.1257,
  //   "lat": 51.5085
  //   },
  //   "weather": [
  //   {
  //   "id": 721,
  //   "main": "Haze",
  //   "description": "haze",
  //   "icon": "50d"
  //   }
  //   ],
  //   "base": "stations",
  //   "main": {
  //   "temp": 277.66,
  //   "feels_like": 277.66,
  //   "temp_min": 273.35,
  //   "temp_max": 280.1,
  //   "pressure": 1023,
  //   "humidity": 90
  //   },
  //   "visibility": 3100,
  //   "wind": {
  //   "speed": 0,
  //   "deg": 0
  //   },
  //   "clouds": {
  //   "all": 100
  //   },
  //   "dt": 1676446079,
  //   "sys": {
  //   "type": 2,
  //   "id": 2075535,
  //   "country": "GB",
  //   "sunrise": 1676445323,
  //   "sunset": 1676481250
  //   },
  //   "timezone": 0,
  //   "id": 2643743,
  //   "name": "London",
  //   "cod": 200
  //   }

}
