import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { CityListComponent } from './components/city-list.component';
import { WeatherResultComponent } from './components/weather-result.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { WeatherService } from './services/weather.service';
import { HttpClientModule } from '@angular/common/http';

const appRoutes : Routes = [
  {path: '', component: CityListComponent},
  {path: 'cities', component: CityListComponent},
  {path: 'weather/:city', component: WeatherResultComponent},
  {path: '**', redirectTo: '', pathMatch:'full'}
]

@NgModule({
  declarations: [
    AppComponent,
    CityListComponent,
    WeatherResultComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [WeatherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
