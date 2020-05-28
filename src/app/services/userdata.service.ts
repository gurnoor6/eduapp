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


  //set user in browser storage so that on refresh the user does not log out
  setUser(name:string,email:string,image:string){
  	let imagePath;
  	if(image!=null && !image.includes("http"))
  		imagePath = this.ps.getHost()+image;
  	else if(image==null)
  		imagePath=null;
  	else
  		imagePath = image;

  	this.user = {name:name,email:email,image:imagePath};
  	localStorage.setItem('user',JSON.stringify(this.user));
  }

  //return user to the home componenet to show its details
  getUser():User{
  	this.user = (JSON.parse(localStorage.getItem('user')) as User);
  	return this.user;
  }

  //tell if user is signed in. Used to show a message on home screen 
  signedIn(){
  	if(this.user)
  		this.signedin = true;
  	return this.signedin;
  }


  //logout the user. 
  logOut(){
  	this.signedin=false;
  	localStorage.removeItem('user');
  }



}
