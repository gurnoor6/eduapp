import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class PostService {
	constructor(private httpClient:HttpClient) {}

	//defined like this because when we host, we'll need to change this
	host = 'http://localhost:8000';

	//create a post request to any url
	create(url,post){
	  return this.httpClient.post<any>(url,post);
	}

	getHost(){
		return this.host;
	}

}