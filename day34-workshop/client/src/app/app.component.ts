import { Component } from '@angular/core';
import { SearchCriteria, Weather } from './models';
import { WeatherService } from './weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  weather!: Weather

  constructor(private weatherSvc: WeatherService){

  }

  onSearch (searchCriteria: SearchCriteria){
    console.info('>>> searchCritera ', searchCriteria)
    this.weatherSvc.search(searchCriteria)
    .then(result => {
      console.info(">>> result: ", result)
      this.weather = result
    })
    .catch(error => {
      console.error(">>> error: ", error)
    })
    console.info('-------- after calling weatherSvc.search()')
  }

}
