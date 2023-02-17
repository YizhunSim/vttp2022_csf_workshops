import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { Subject } from 'rxjs';
import { City } from '../models';

@Injectable({
  providedIn: 'root'
})

// Responsible for maintaining the state of cities added
export class CitiesService extends Dexie{
  cities : string[] = []

  // references the IndexDB table
  // type of object we are storing, type of the primary key
  citiesLocalStorage !: Dexie.Table<City, number>

  constructor() {
    // Name of the database
    super('citiesDB')
    this.version(1).stores({
      // cities table, with city as the PK
        cities: "++cityId"
    })

    this.citiesLocalStorage = this.table('cities')
  }

  addCity(city: City) : Promise<number> {
    return this.citiesLocalStorage.add(city)
  }

  getCities () : Promise<City[]>{
    return this.citiesLocalStorage.toArray();
  }



}
