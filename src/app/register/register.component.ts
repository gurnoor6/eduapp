import { Component, OnInit } from '@angular/core';
import {PostService} from '../services/post.service';
import {UserdataService} from '../services/userdata.service';
import {Router,ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';

var sha1 = require('sha1');

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


	//Variables for form fields
	name="";
	email="";
	password="";
	confirmpassword="";
	error=false;
	fileToUpload :File=null;
	submitted = false;

	//Validation variables 
	emailValidation=true;
	passwordValidation=true;
	nameValidation = true;
	duplicate = false;
	passwordMatch=true;


	//handle image file
	handleFileInput(files:FileList){
		this.fileToUpload = files.item(0);
	}

	constructor(private service:PostService
				,private router:Router
				,private route:ActivatedRoute
				,private ud:UserdataService) { }

	ngOnInit(): void {
		
	}

	//validate the data entered for registeration
	validate(){
		var email = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
		this.emailValidation = email.test(this.email);
		var password = /^\S{8}.*$/;
		this.passwordValidation = password.test(this.password);
		if(this.name.length==0)
			this.nameValidation=false;

		if(this.password!=this.confirmpassword)
			this.passwordMatch=false;

		if(this.emailValidation && this.passwordValidation && this.nameValidation && this.passwordMatch)
			return true;
		return false;
	}


	//Observable does not work. The other expression is executed before the result is given
	checkDuplicate():Promise<any>{
		const userEmail = new FormData();
		userEmail.append('email',this.email);
		return this.service.create(this.service.getHost()+"/checkuser/",userEmail).toPromise();
	}

	//create a user after performing validations
	sendData(){
		const formData = new FormData();
		formData.append('email',this.email);
		formData.append('password',sha1(this.password));
		formData.append('name',this.name);
		try{
			formData.append('profilepicture',this.fileToUpload,this.fileToUpload.name);
		}catch(e){}
			
		this.service.create(this.service.getHost()+'/users/',formData)
			.subscribe(response=>{
						this.submitted = true;
						// this.router.navigate(['/']);
					},
					error=>{
						console.log(error);
						this.error=true;
					}
		);
		
	}

	//submit form data 
	async onSubmit(){
		if(!this.validate())
			return;

		let result:any =  await this.checkDuplicate()
		.then(
			(response)=>{
				if(response['response']=='fail'){
					this.duplicate = true;
				}
		});

		if(!this.duplicate)
			this.sendData();
	}


}
