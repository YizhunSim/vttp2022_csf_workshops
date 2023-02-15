import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button'
import {MatCardModule} from '@angular/material/card';

const materialModules : any[] = [
  MatFormFieldModule,MatButtonModule, MatInputModule, MatCardModule
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule, materialModules
  ],
  exports: materialModules
})
export class MaterialModule { }
