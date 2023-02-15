import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { SearchCriteria } from '../models';

@Component({
  selector: 'app-weather-search',
  templateUrl: './weather-search.component.html',
  styleUrls: ['./weather-search.component.css']
})
export class WeatherSearchComponent implements OnInit {
  weatherForm!: FormGroup

  @Output()
  onSearch = new Subject<SearchCriteria>();

  constructor(private fb: FormBuilder){

  }

  ngOnInit(): void {
      this.weatherForm = this.createForm();
  }

  getWeather() : void{
    const searchCriteria: SearchCriteria = this.weatherForm.value as SearchCriteria
    this.onSearch.next(searchCriteria)
    this.weatherForm = this.createForm();
  }

  private createForm(): FormGroup {
    return this.fb.group({
      city: this.fb.control<string>('', [Validators.required])
    })
  }
}
