import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterDetailsComponent } from './components/character-details.component';
import { CharacterListComponent } from './components/character-list.component';
import { CommentFormComponent } from './components/comment-form.component';
import { SearchComponent } from './components/search.component';

const routes: Routes = [
  {path: '', component: SearchComponent},
  {path: 'search', component: SearchComponent},
  {path: 'characters', component: CharacterListComponent},
  {path: 'characters/:characterId', component:CharacterDetailsComponent},
  {path: 'characters/:characterId/comment', component:CommentFormComponent},
  {path: '**', redirectTo: '', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
