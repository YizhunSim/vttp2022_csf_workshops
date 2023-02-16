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
export class CityListComponent implements OnInit, OnDestroy {
  cities: string[] = [];
  form!: FormGroup;
  citiesSub$!: Subscription;

  citiesLocalStorage : City[] = []
  citiesLocalStorageSub$ !: Subscription;

  constructor(private fb: FormBuilder, private citySvc: CitiesService) {}

  ngOnInit(): void {
    this.form = this.createForm();

    // initialize cities by getting it from service
      //this.cities = this.citySvc.getCities();

    // subscribe to any changes in cities (only get cities when new cities is added)
      // this.citiesSub$ = this.citySvc.onCitiesChanged.subscribe((results) => {
      //   this.cities = results;
      // });

    this.citiesLocalStorageSub$ = this.citySvc.onCitiesChangedLS.subscribe((results) => {
      this.citiesLocalStorage = results;
    })

    // IndexedDb - Initialize cities by getting it from local storage
    this.citySvc
      .getCitiesLocalStorage()
      .then((result) => {
        result.forEach((c) => {
          this.citiesLocalStorage.push(c);
        });
      })
      .catch((error) => {
        console.error('>>> error: ', error);
      });
  }

  ngOnDestroy(): void {
    // this.citiesSub$.unsubscribe();

    this.citiesLocalStorageSub$.unsubscribe()
  }

  createForm(): FormGroup {
    return this.fb.group({
      city: this.fb.control('', [Validators.required]),
    });
  }

  addCity(): void {
    const newCity = this.form.get('city')?.value;
    console.info('>>> addCity: ', newCity);
    this.citySvc.addCity(newCity);
    this.form = this.createForm();
  }

  isFormInvalid(): boolean {
    // Check new city already exist in city list
    const newCity = this.form.get('city')?.value;
    return this.form.invalid || this.cities.includes(newCity);
  }

  addCityToLocalStorage(): void {
    const newCity: City = this.form.value as City;
    console.info('>>> newCity: ', newCity);
    this.citySvc
      .addCityLocalStorage(newCity)
      .then((result) => {
        console.info('>>> Added city to local storage: ', newCity);
      })
      .catch((error) => {
        console.error('>>> error ', error);
      });

    this.form = this.createForm()
  }
}
