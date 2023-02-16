import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { Subject } from 'rxjs';
import { City } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CitiesService extends Dexie{
  cities : string[] = []

  // observable that other componenents can subscribe to
  onCitiesChanged : Subject<string[]> = new Subject()

  citiesLocalStorage !: Dexie.Table<City, string>
   // observable that other componenents can subscribe to
  onCitiesChangedLS : Subject<City[]> = new Subject()

  citiesOfCity !: City[]

  constructor() {
    // Name of the database
    super('citiesDB')
    this.version(1).stores({
      // citiesLocalStorage table, with city as the PK
        cities: "city"
    })

    this.citiesLocalStorage = this.table('cities')
  }

  addCity(city: string) : void {
    this.cities = [...this.cities, city]
    console.info('>>> cities in service: ', this.cities)

    // fire event containing updated cities list
    this.onCitiesChanged.next(this.cities)
  }


  getCities () : string[]{
    // returns a copy of the cities
    return this.cities.slice()
  }

  async addCityLocalStorage(city: City) : Promise<void> {
    console.info('>>> cities service: addCityLocalStorage ', city)
    try {
      const cities = await this.getCitiesLocalStorage()
      this.citiesOfCity = [...cities, city]
      console.info(">>>> cities in local storage: ", this.citiesOfCity)
    } catch(err){
      console.error('>>> addCityLocalStorage error: ', err)
    }

    // fire event containing updated cities list
    this.citiesLocalStorage.add(city)
    this.onCitiesChangedLS.next(this.citiesOfCity)

  }

  getCitiesLocalStorage(): Promise<City[]> {
    return this.citiesLocalStorage.orderBy('city').toArray()
}

}
