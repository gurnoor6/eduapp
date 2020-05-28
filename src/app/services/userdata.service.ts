import { Injectable } from '@angular/core';
import {User} from './user-interface';

@Injectable({
  providedIn: 'root'
})
export class UserdataService {

  user:User;
  signedin=false;
  constructor() { }


  setUser(name:string,email:string,image:string){
  	this.user = {name:name,email:email,image:image};
  	localStorage.setItem('user',JSON.stringify(this.user));
  }

  getUser():User{
  	this.user = (JSON.parse(localStorage.getItem('user')) as User);
  	return this.user;
  }

  signedIn(){
  	if(this.user)
  		this.signedin = true;
  	return this.signedin;
  }

  logOut(){
  	this.signedin=false;
  	localStorage.removeItem('user');
  }



}
