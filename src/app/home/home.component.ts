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
  	setInterval(()=>this.getUser())
  }

  getUser(){
  	this.user = this.ud.getUser();  
  }

}
