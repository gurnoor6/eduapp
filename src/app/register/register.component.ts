import { Component, OnInit } from '@angular/core';
import {PostService} from '../services/post.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  name="";
  email="";
  password="";
  error=false;
  host = 'http://localhost:8000';
  constructor(private service:PostService) { }

  ngOnInit(): void {
  }

  onSubmit(){
 	const formData = new FormData();
 	formData.append('email',this.email);
 	formData.append('password',this.password);
 	formData.append('name',this.name);
	this.service.create(this.host+'/users/',formData)
		.subscribe(response=>{
					console.log(response)
				},
				error=>{
					console.log(error);
					this.error=true;
				}
		);
 }


}
