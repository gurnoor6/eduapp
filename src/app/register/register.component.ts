import { Component, OnInit } from '@angular/core';
import {PostService} from '../services/post.service';
import {UserdataService} from '../services/userdata.service';
import {Router,ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';

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
	fileToUpload :File=null;

	//Validation variables 
	emailValidation=true;
	passwordValidation=true;
	nameValidation = true;
	duplicate = false;


	handleFileInput(files:FileList){
		this.fileToUpload = files.item(0);
	}

	constructor(private service:PostService
				,private router:Router
				,private route:ActivatedRoute
				,private ud:UserdataService) { }

	ngOnInit(): void {
		
	}

	validate(){
		var email = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
		this.emailValidation = email.test(this.email);
		var password = /^\S{8}.*$/;
		this.passwordValidation = password.test(this.password);
		if(this.name.length==0)
			this.nameValidation=false;

		if(this.emailValidation && this.passwordValidation && this.nameValidation)
			return true;
		return false;
	}

	//Observable does not work. The other expression is executed before the result is given
	checkDuplicate():Promise<any>{
		const userEmail = new FormData();
		userEmail.append('email',this.email);
		return this.service.create(this.service.getHost()+"/checkuser/",userEmail).toPromise();
	}

	// async onSubmit(){
	// 	if(!this.validate())
	// 		return;

	// 	//Check if there is an existing user with same email. 
	// 	let result = await this.checkDuplicate();	
	// 	console.log(result)
	// 	console.log(result)
	// 	if(result){
	
	// }

	sendData(){
		const formData = new FormData();
		formData.append('email',this.email);
		formData.append('password',this.password);
		formData.append('name',this.name);
		try{
			formData.append('profilepicture',this.fileToUpload,this.fileToUpload.name);
		}catch(e){}
			
		this.service.create(this.service.getHost()+'/users/',formData)
			.subscribe(response=>{
						this.router.navigate(['/']);
					},
					error=>{
						console.log(error);
						this.error=true;
					}
		);
		
	}

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
