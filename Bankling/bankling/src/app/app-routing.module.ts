import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home/home.component'; 
import { PersonenComponent } from './personen/personen.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'personen', component: PersonenComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
