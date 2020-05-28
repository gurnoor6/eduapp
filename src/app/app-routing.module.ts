import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninComponent} from './signin/signin.component';
import { RegisterComponent} from './register/register.component';
import {HomeComponent} from './home/home.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: 'signin', component: SigninComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: HomeComponent }

];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
