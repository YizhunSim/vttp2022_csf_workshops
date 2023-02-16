import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Weather } from '../models';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-weather-result',
  templateUrl: './weather-result.component.html',
  styleUrls: ['./weather-result.component.css']
})
export class WeatherResultComponent implements OnInit, OnDestroy{
  weatherResult!: Weather
  weatherForm!: FormGroup
  city !: string
  routeSub$!: Subscription

  constructor(private fb: FormBuilder, private weatherSvc: WeatherService, private activatedRoute: ActivatedRoute){

  }

  ngOnInit(): void {
      // this.weatherForm = this.createForm();
      this.routeSub$ = this.activatedRoute.params.subscribe(params => {
        this.city = params['city'];
      })
      this.getWeather()
  }

  ngOnDestroy(): void {
      this.routeSub$.unsubscribe()
  }

  getWeather() : void{
    this.weatherSvc.search(this.city)
    .then(result => {
      this.weatherResult = result
      console.info('>>> result: ', result)
    })
    .catch(error => {
      console.error('>>> error: ', error)
    })

    this.weatherForm = this.createForm();
  }


  private createForm() : FormGroup{
    return this.fb.group({
      city: this.fb.control('', [Validators.required])
    })
  }
}
