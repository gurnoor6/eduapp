import { Component,AfterViewInit,ViewChild,OnInit,ElementRef } from '@angular/core';
import {UserdataService} from './services/userdata.service';
import{User} from './services/user-interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


user:User;
signedIn;

constructor(private ud:UserdataService){}

ngOnInit(){
	//the user may logout/login at any time. so we need to keep track of it continuously
	setInterval(()=>this.getUser());
}


  title = 'eduapp';

  getUser(){
  	this.user = this.ud.getUser();
  	this.signedIn = this.ud.signedIn();
  }

  logOut(){
  	this.ud.logOut();
  }

}
