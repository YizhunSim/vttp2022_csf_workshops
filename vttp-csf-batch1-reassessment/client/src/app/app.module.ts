import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CreateListingComponent } from './components/create-listing.component';
import { PostListingComponent } from './components/post-listing.component';
import { PostConfirmationComponent } from './components/post-confirmation.component';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [
    AppComponent,
    CreateListingComponent,
    PostListingComponent,
    PostConfirmationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
