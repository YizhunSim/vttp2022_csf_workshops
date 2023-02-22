import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateListingComponent } from './components/create-listing.component';
import { PostConfirmationComponent } from './components/post-confirmation.component';
import { PostListingComponent } from './components/post-listing.component';

const routes: Routes = [
  {path: '', component: CreateListingComponent},
  {path: 'post-listing', component: PostListingComponent},
  {path: 'post-confirmation/:postingId', component: PostConfirmationComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
