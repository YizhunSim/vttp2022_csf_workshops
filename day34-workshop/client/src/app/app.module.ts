import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { WeatherSearchComponent } from './components/weather-search.component';
import { WeatherDetailsComponent } from './components/weather-details.component';
import { WeatherService } from './weather.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [
    AppComponent,
    WeatherSearchComponent,
    WeatherDetailsComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, ReactiveFormsModule, BrowserAnimationsModule, MaterialModule
  ],
  providers: [WeatherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
