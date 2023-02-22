import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';

const MaterialModules = [
  MatToolbarModule,
  MatFormFieldModule,
  MatInputModule,
  MatInputModule,
  MatIconModule,
  MatDatepickerModule,
  MatButtonModule,
  MatSelectModule,
  MatCardModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatDividerModule,
  NgxMatFileInputModule
];

@NgModule({
  declarations: [],
  imports: [CommonModule, MaterialModules],
  exports: MaterialModules
})
export class MaterialModule {}
