import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MainComponent } from './components/main.component';
import { OrderComponent } from './components/order.component';
import { PizzaService } from './pizza.service';

const appRoutes : Routes = [
  {path: '', component: MainComponent},
  {path: 'orders/:email', component: OrderComponent},
  {path: '**', redirectTo: '', pathMatch:'full'}
]

@NgModule({
  declarations: [
    AppComponent, MainComponent, OrderComponent
  ],
  imports: [
    BrowserModule, RouterModule.forRoot(appRoutes), ReactiveFormsModule, HttpClientModule
  ],

  providers: [PizzaService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
