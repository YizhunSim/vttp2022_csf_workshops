import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { City } from '../models';
import { CitiesService } from '../services/cities.service';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.css'],
})
export class CityListComponent implements OnInit{
  cities: City[] = [];
  form!: FormGroup;

  constructor(private fb: FormBuilder, private citySvc: CitiesService) {}

  ngOnInit(): void {
    this.form = this.createForm();

    // initialize cities by getting it from IndexedDB
    this.citySvc.getCities()
    .then(res => {
      this.cities = res;
    })
    .catch(err => {
      console.error(`Cannot retrieve cities from IndexedDB: ${err}`)
    })
  }

  createForm(): FormGroup {
    return this.fb.group({
      city: this.fb.control('', [Validators.required]),
    });
  }

  submitForm(): void {
    const newCity = {
      name: this.form.get('city')?.value,
    } as City // Cast Object as City

    console.info('>>> addCity: ', newCity)
    this.citySvc.addCity(newCity);

    // Retrieve new list of cities
    this.ngOnInit()
  }

  isFormInvalid(): boolean {
    // Check new city already exist in city list
    const cityName = this.form.get('city')?.value;

    // return City object if City object matches new name, otherwise return undefined
    // !! City -> true
    // !1 Undefined -> false
    const isCityInList : boolean = !!this.cities.find(c => c.name === cityName)

    // return true if no input or if city already exist
    return this.form.invalid || isCityInList;
  }

}
