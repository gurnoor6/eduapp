import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import {UserdataService} from '../services/userdata.service';
import {PostService} from '../services/post.service';
import{Router,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  myemail="";
  mypassword="";
  auth2: any;
  error=false;
  host = this.post.getHost();

  constructor(private ud :UserdataService
  			 ,private router:Router
  			 ,private route:ActivatedRoute
  			 ,private post:PostService) { }

  @ViewChild('loginRef', {static: true }) loginElement: ElementRef;
    ngOnInit(){
   		this.googleSDK();
	}

  onSubmit(){
  	const formData = new FormData();
  	formData.append('email',this.myemail);
  	formData.append('password',this.mypassword);
  	this.post.create(this.host+'/login/',formData)
  			 .subscribe(
  			 	(response)=>{
  			 		console.log(response)
  					if(response['response']=='fail'){
  						this.error=true;
  						return;
  					}
  			 		this.ud.setUser(response[0]['name'],response[0]['email'],response[0]['profilepicture']);
  			 		this.router.navigate(['/']);
  			 	},
  			 	(err)=>{
  			 		this.error=true
  			 	}
  			 )

  }


  //Google Login Stuff
  prepareLoginButton() {
 
  this.auth2.attachClickHandler(this.loginElement.nativeElement, {},
	    (googleUser) => {
	 
	      let profile = googleUser.getBasicProfile();
	      console.log('Token || ' + googleUser.getAuthResponse().id_token);
	      console.log('ID: ' + profile.getId());
	      console.log('Name: ' + profile.getName());
	      console.log('Image URL: ' + profile.getImageUrl());
	      console.log('Email: ' + profile.getEmail());
	      //YOUR CODE HERE
	 		this.ud.setUser(profile.getName(),profile.getEmail(),profile.getImageUrl());
	 		this.router.navigate(['/']);
	 
	    }, (error) => {
	      alert(JSON.stringify(error, undefined, 2));
	    });
 
	}


  googleSDK() {
 
  window['googleSDKLoaded'] = () => {
    window['gapi'].load('auth2', () => {
      this.auth2 = window['gapi'].auth2.init({
        client_id: '742045772622-qbmc1dt386a3cfmm0t7kf438ies4hgsg.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.prepareLoginButton();
    });
  }
 
  (function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "https://apis.google.com/js/platform.js?onload=googleSDKLoaded";
    fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'google-jssdk'));
	 
	}
}
