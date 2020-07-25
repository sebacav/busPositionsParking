import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppModule } from '../app.module';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from '../material.module';



@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class HomeModule { }
