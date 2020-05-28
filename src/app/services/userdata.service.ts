import { Injectable } from '@angular/core';
import {User} from './user-interface';
import {PostService} from './post.service';

@Injectable({
  providedIn: 'root'
})
export class UserdataService {

  user:User;
  signedin=false;
  constructor(private ps:PostService) { }


  setUser(name:string,email:string,image:string){
  	let imagePath;
  	if(image!=null)
  		imagePath = this.ps.getHost()+image;
  	else
  		imagePath=null;

  	this.user = {name:name,email:email,image:imagePath};
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
