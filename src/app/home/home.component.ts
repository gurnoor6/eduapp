import { Component, OnInit } from '@angular/core';
import {UserdataService} from '../services/userdata.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private ud:UserdataService) { }
  user;
  ngOnInit(): void {
  	//user may login/logout at any time. so we need to continuously track it. 
  	setInterval(()=>this.getUser())
  }

  getUser(){
  	this.user = this.ud.getUser();  
  }

}
