import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SigninComponent } from './signin/signin.component';
import { RegisterComponent } from './register/register.component';
import {HttpClientModule} from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { Md5 } from 'ts-md5/dist/md5';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    RegisterComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [Md5],
  bootstrap: [AppComponent]
})
export class AppModule { }
